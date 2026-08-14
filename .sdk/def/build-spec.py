#!/usr/bin/env python3
"""Author an OpenAPI 3.1 spec for the Conecto REST API.

Conecto publishes no OpenAPI description. Its API has a `GET /schema/` endpoint
that returns the full surface as JSON, but it requires credentials (401
unauthenticated), so this spec is AUTHORED FROM THE PUBLISHED PROSE
DOCUMENTATION at https://conecto.chat/developers, cross-checked against the
vendor's own MIT-licensed Python SDK (github.com/Nancy-Consulting/conecto-sdk)
for paths, verbs and field names.

Anything not stated by those two sources is left out rather than guessed. Where
the docs give a field but not its type, the type here is the narrowest one the
documented example supports.

Run:  python3 build-spec.py > conecto-openapi.json
"""

import json
import sys

BASE = "https://conecto.chat/api/v1"

# ---------------------------------------------------------------- components

def ref(name):
    return {"$ref": "#/components/schemas/" + name}


SCHEMAS = {
    # -- core objects -------------------------------------------------------
    "Message": {
        "type": "object",
        "description": "A single message in a conversation.",
        "properties": {
            "id": {"type": "integer", "description": "Message id."},
            "sender": {
                "type": "string",
                "description": "Who sent it.",
                "examples": ["visitor", "agent", "bot"],
            },
            "body": {"type": "string", "description": "Plain-text body."},
            "blocks": {
                "type": "array",
                "description": "Rich content blocks. At most 10 per message.",
                "items": ref("Block"),
            },
            "internal": {
                "type": "boolean",
                "description": "Internal note, not shown to the visitor.",
            },
            "created_at": {
                "type": "string",
                "format": "date-time",
                "description": "When the message was created.",
            },
        },
        "required": ["id", "sender", "body", "created_at"],
    },

    "Conversation": {
        "type": "object",
        "description": "A conversation between a visitor and the workspace.",
        "properties": {
            "id": {"type": "integer", "description": "Conversation id."},
            "status": {
                "type": "string",
                "description": "Lifecycle state.",
                "enum": ["open", "pending", "closed"],
            },
            "widget_id": {
                "type": "integer",
                "description": "Widget the conversation belongs to.",
            },
            "session": {
                "type": "string",
                "description": "Visitor browser session key.",
            },
            "created_at": {"type": "string", "format": "date-time"},
            "messages": {
                "type": "array",
                "description": "Visitor-facing messages, oldest first.",
                "items": ref("Message"),
            },
        },
        "required": ["id", "status"],
    },

    "Webhook": {
        "type": "object",
        "description": "An HTTP endpoint subscribed to workspace events.",
        "properties": {
            "id": {"type": "integer", "description": "Webhook id."},
            "url": {
                "type": "string",
                "format": "uri",
                "description": "HTTPS endpoint that receives the event POST.",
            },
            "events": {
                "type": "array",
                "description": "Event names subscribed to.",
                "items": {"type": "string"},
            },
            "created_at": {"type": "string", "format": "date-time"},
        },
        "required": ["id", "url", "events"],
    },

    "Integration": {
        "type": "object",
        "description": "A custom integration the AI agent can call.",
        "properties": {
            "slug": {
                "type": "string",
                "description": "Stable identifier, used in the path.",
            },
            "name": {"type": "string", "description": "Human-readable name."},
            "base_url": {
                "type": "string",
                "format": "uri",
                "description": "Root URL Conecto POSTs actions to.",
            },
            "auth_type": {
                "type": "string",
                "description": "How Conecto authenticates to base_url.",
            },
            "actions": {
                "type": "array",
                "description": "Actions this integration exposes.",
                "items": ref("IntegrationAction"),
            },
            "signing_secret": {
                "type": "string",
                "description":
                    "Secret used to sign action calls. Returned on create and on "
                    "read, and replaced by rotate_signing_secret.",
            },
        },
        "required": ["slug", "name", "base_url"],
    },

    "IntegrationAction": {
        "type": "object",
        "description": "One callable action on an integration.",
        "properties": {
            "name": {"type": "string", "description": "Action name, e.g. orders.get_status."},
            "path": {"type": "string", "description": "Path appended to base_url."},
            "risk": {
                "type": "string",
                "description":
                    "Identity requirement. public_read needs no identity; "
                    "verified_read requires a verified visitor email; write is a "
                    "mutation on a verified account and is never silently retried.",
                "enum": ["public_read", "verified_read", "public_write", "write"],
            },
        },
        "required": ["name"],
    },

    "Contact": {
        "type": "object",
        "description": "A person known to the workspace.",
        "properties": {
            "id": {"type": "integer", "description": "Contact id."},
            "email": {"type": "string", "format": "email"},
            "custom_fields": {
                "type": "object",
                "description": "Workspace-defined fields.",
                "additionalProperties": True,
            },
            "created_at": {"type": "string", "format": "date-time"},
        },
        "required": ["id"],
    },

    "Media": {
        "type": "object",
        "description": "An uploaded file, addressable by URL from a block.",
        "properties": {
            "url": {
                "type": "string",
                "format": "uri",
                "description": "HTTPS URL of the stored file.",
            },
            "filename": {"type": "string"},
            "size": {"type": "integer", "description": "Bytes. Maximum 10 MB on upload."},
        },
        "required": ["url"],
    },

    "Block": {
        "type": "object",
        "description":
            "One rich-content block in a message. `type` selects the shape; the "
            "documented types are image, video, embed, audio, file, cards, list, "
            "buttons, text and divider. Invalid blocks are rejected with 400 and a "
            "reason rather than dropped silently.",
        "properties": {
            "type": {
                "type": "string",
                "enum": ["image", "video", "embed", "audio", "file",
                         "cards", "list", "buttons", "text", "divider"],
            },
        },
        "required": ["type"],
        "additionalProperties": True,
    },

    "Credential": {
        "type": "object",
        "description": "The scope the calling credential has.",
        "properties": {
            "workspace_id": {"type": "integer"},
            "widget_id": {
                "type": "integer",
                "description": "Set when the credential is widget-scoped rather than workspace-wide.",
            },
        },
    },

    "Schema": {
        "type": "object",
        "description":
            "The complete API surface as data: endpoints, events, block types, "
            "actions, limits and error codes.",
        "additionalProperties": True,
    },

    "Error": {
        "type": "object",
        "description": "Every error response has this shape.",
        "properties": {
            "error": {
                "type": "object",
                "properties": {
                    "code": {"type": "string"},
                    "message": {"type": "string"},
                },
                "required": ["code", "message"],
            },
        },
        "required": ["error"],
    },
}


# ---------------------------------------------------------------- parameters

LIMIT = {
    "name": "limit", "in": "query", "required": False,
    "description": "Page size. Defaults to 25.",
    "schema": {"type": "integer", "default": 25},
}
BEFORE_ID = {
    "name": "before_id", "in": "query", "required": False,
    "description":
        "Return records older than this id. Take it from next_before_id in the "
        "previous response.",
    "schema": {"type": "integer"},
}
IDEMPOTENCY = {
    "name": "Idempotency-Key", "in": "header", "required": False,
    "description":
        "Any UUID. Retrying a write with the same key returns 200 with the "
        "original result instead of creating a duplicate.",
    "schema": {"type": "string"},
}


def path_param(name, typ, desc):
    return {"name": name, "in": "path", "required": True,
            "description": desc, "schema": {"type": typ}}


CONV_ID = path_param("id", "integer", "Conversation id.")
WEBHOOK_ID = path_param("id", "integer", "Webhook id.")
WIDGET_ID = path_param("id", "integer", "Widget id.")
SESSION = path_param("session", "string", "Visitor browser session key.")
SLUG = path_param("slug", "string", "Integration slug.")
ACTION = path_param("action", "string", "Action name.")


def json_body(schema, required=True, desc=None):
    b = {"required": required, "content": {"application/json": {"schema": schema}}}
    if desc:
        b["description"] = desc
    return b


def ok(schema, desc="Success."):
    return {"200": {"description": desc,
                    "content": {"application/json": {"schema": schema}}}}


def created(schema, desc="Created."):
    return {"201": {"description": desc,
                    "content": {"application/json": {"schema": schema}}}}


# ---------------------------------------------------------------- paths

PATHS = {
    "/conversations/": {
        "get": {
            "operationId": "listConversations",
            "summary": "List conversations, newest activity first.",
            "parameters": [
                {"name": "status", "in": "query", "required": False,
                 "description": "Filter by lifecycle state.",
                 "schema": {"type": "string", "enum": ["open", "pending", "closed"]}},
                {"name": "widget_id", "in": "query", "required": False,
                 "description": "Filter to one widget.",
                 "schema": {"type": "integer"}},
                {"name": "session", "in": "query", "required": False,
                 "description": "Narrow to one visitor browser session.",
                 "schema": {"type": "string"}},
                LIMIT, BEFORE_ID,
            ],
            "responses": ok({
                "type": "object",
                "properties": {
                    "conversations": {"type": "array", "items": ref("Conversation")},
                    "next_before_id": {
                        "type": "integer",
                        "description": "Pass as before_id to fetch the next page.",
                    },
                },
            }),
        },
        "post": {
            "operationId": "createConversation",
            "summary": "Start a conversation.",
            "parameters": [IDEMPOTENCY],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "widget_id": {"type": "integer"},
                    "session": {"type": "string"},
                    "body": {"type": "string", "description": "Opening message."},
                },
            }),
            "responses": created(ref("Conversation")),
        },
    },

    "/conversations/{id}/": {
        "get": {
            "operationId": "getConversation",
            "summary": "One conversation with its visitor-facing messages.",
            "parameters": [
                CONV_ID,
                {"name": "since_id", "in": "query", "required": False,
                 "description":
                     "Return only messages newer than this id — the cheap way to "
                     "poll a thread already being tracked.",
                 "schema": {"type": "integer"}},
            ],
            "responses": ok(ref("Conversation")),
        },
    },

    "/conversations/{id}/messages/": {
        "post": {
            "operationId": "createMessage",
            "summary": "Send a message to a conversation.",
            "parameters": [CONV_ID, IDEMPOTENCY],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "body": {"type": "string"},
                    "blocks": {"type": "array", "items": ref("Block"),
                               "description": "At most 10."},
                    "buttons": {"type": "array", "items": {"type": "object",
                                                           "additionalProperties": True}},
                    "ask_email": {"type": "boolean",
                                  "description": "Prompt the visitor for an email address."},
                    "ticket_form": {"type": "boolean",
                                    "description": "Show the ticket form."},
                    "products": {"type": "array", "items": {"type": "object",
                                                            "additionalProperties": True}},
                    "internal": {"type": "boolean",
                                 "description": "Internal note, not shown to the visitor."},
                },
            }),
            "responses": created(ref("Message")),
        },
        "patch": {
            "operationId": "closeConversation",
            "summary": "Close the conversation.",
            "parameters": [CONV_ID],
            "responses": ok(ref("Conversation")),
        },
    },

    "/conversations/{id}/assign/": {
        "post": {
            "operationId": "assignConversation",
            "summary": "Assign the conversation to a user.",
            "parameters": [CONV_ID],
            "requestBody": json_body({
                "type": "object",
                "properties": {"user_id": {"type": "integer"}},
                "required": ["user_id"],
            }),
            "responses": ok(ref("Conversation")),
        },
    },

    "/conversations/{id}/handoff/": {
        "post": {
            "operationId": "handoffConversation",
            "summary": "Hand the conversation off to a human.",
            "parameters": [CONV_ID],
            "responses": ok(ref("Conversation")),
        },
    },

    "/media/": {
        "post": {
            "operationId": "createMedia",
            "summary": "Upload a file and get a URL usable from a block.",
            "requestBody": {
                "required": True,
                "description": "Multipart upload, at most 10 MB.",
                "content": {"multipart/form-data": {"schema": {
                    "type": "object",
                    "properties": {"file": {"type": "string", "format": "binary"}},
                    "required": ["file"],
                }}},
            },
            "responses": created(ref("Media")),
        },
    },

    "/webhooks/": {
        "get": {
            "operationId": "listWebhooks",
            "summary": "List registered webhooks.",
            "responses": ok({
                "type": "object",
                "properties": {"webhooks": {"type": "array", "items": ref("Webhook")}},
            }),
        },
        "post": {
            "operationId": "createWebhook",
            "summary": "Subscribe an endpoint to events.",
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "url": {"type": "string", "format": "uri"},
                    "events": {"type": "array", "items": {"type": "string"},
                               "description": "e.g. message.created, conversation.created."},
                },
                "required": ["url", "events"],
            }),
            "responses": created(ref("Webhook")),
        },
    },

    "/webhooks/{id}/": {
        "get": {
            "operationId": "getWebhook",
            "summary": "One webhook.",
            "parameters": [WEBHOOK_ID],
            "responses": ok(ref("Webhook")),
        },
        "delete": {
            "operationId": "deleteWebhook",
            "summary": "Delete a webhook.",
            "parameters": [WEBHOOK_ID],
            "responses": {"204": {"description": "Deleted."}},
        },
    },

    "/integrations/": {
        "get": {
            "operationId": "listIntegrations",
            "summary": "List custom integrations.",
            "responses": ok({
                "type": "object",
                "properties": {"integrations": {"type": "array",
                                                "items": ref("Integration")}},
            }),
        },
        "post": {
            "operationId": "createIntegration",
            "summary": "Register a custom integration.",
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "slug": {"type": "string"},
                    "name": {"type": "string"},
                    "base_url": {"type": "string", "format": "uri"},
                    "auth_type": {"type": "string"},
                    "credential": {"type": "string"},
                    "actions": {"type": "array", "items": ref("IntegrationAction")},
                },
                "required": ["slug", "name", "base_url"],
            }),
            "responses": created(ref("Integration"),
                                 "Created. The response carries signing_secret."),
        },
    },

    "/integrations/{slug}/": {
        "get": {
            "operationId": "getIntegration",
            "summary": "One integration, including its signing secret.",
            "parameters": [SLUG],
            "responses": ok(ref("Integration")),
        },
    },

    "/integrations/{slug}/install/": {
        "post": {
            "operationId": "installIntegration",
            "summary": "Install the integration on one or more widgets.",
            "parameters": [SLUG],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "widget_ids": {"type": "array", "items": {"type": "integer"}},
                    "actions": {"type": "array", "items": {"type": "string"},
                                "description": "Allowlist of action names."},
                },
            }),
            "responses": ok(ref("Integration")),
        },
    },

    "/integrations/{slug}/actions/{action}/run/": {
        "post": {
            "operationId": "runIntegrationAction",
            "summary": "Run an action, as the AI agent would.",
            "parameters": [SLUG, ACTION],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "arguments": {"type": "object", "additionalProperties": True},
                    "conversation_id": {"type": "integer"},
                },
            }),
            # Inlined deliberately: naming this schema promoted it to a CRUD
            # entity called action_result, whose "create" was really "run this
            # action" — an RPC call, not a resource creation. Inline keeps the
            # documented response shape without inventing a resource.
            "responses": ok({
                "type": "object",
                "description": "Result of running an integration action.",
                "properties": {
                    "ok": {"type": "boolean"},
                    "result": {"type": "object", "additionalProperties": True},
                    "blocks": {"type": "array", "items": ref("Block")},
                    "not_found": {"type": "boolean",
                                  "description": "A normal no-match, not an error."},
                    "error": {"type": "string"},
                },
                "required": ["ok"],
            }),
        },
    },

    "/integrations/{slug}/rotate_signing_secret/": {
        "post": {
            "operationId": "rotateIntegrationSigningSecret",
            "summary": "Replace the integration signing secret.",
            "parameters": [SLUG],
            "responses": ok(ref("Integration")),
        },
    },

    "/contacts/": {
        "get": {
            "operationId": "listContacts",
            "summary": "List contacts.",
            "parameters": [LIMIT, BEFORE_ID],
            "responses": ok({
                "type": "object",
                "properties": {
                    "contacts": {"type": "array", "items": ref("Contact")},
                    "next_before_id": {"type": "integer"},
                },
            }),
        },
        "post": {
            "operationId": "createContact",
            "summary": "Create or update a contact.",
            "parameters": [IDEMPOTENCY],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "email": {"type": "string", "format": "email"},
                    "custom_fields": {"type": "object", "additionalProperties": True},
                },
            }),
            "responses": created(ref("Contact")),
        },
    },

    "/widgets/{id}/visitors/{session}/identify/": {
        "post": {
            "operationId": "identifyVisitor",
            "summary": "Vouch for a logged-in visitor.",
            "description":
                "Marks visitor.verified true in webhook payloads, which is what "
                "verified_read and write actions check.",
            "parameters": [WIDGET_ID, SESSION],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "email": {"type": "string", "format": "email"},
                    "name": {"type": "string"},
                },
            }, required=False),
            "responses": ok({"type": "object", "additionalProperties": True}),
        },
    },

    "/widgets/{id}/visitors/{session}/unverify/": {
        "post": {
            "operationId": "unverifyVisitor",
            "summary": "Revoke a visitor's verification on logout.",
            "parameters": [WIDGET_ID, SESSION],
            "responses": ok({"type": "object", "additionalProperties": True}),
        },
    },

    "/widgets/{id}/visitors/{session}/message/": {
        "post": {
            "operationId": "messageVisitor",
            "summary": "Push a proactive message to a visitor session.",
            "parameters": [WIDGET_ID, SESSION, IDEMPOTENCY],
            "requestBody": json_body({
                "type": "object",
                "properties": {
                    "body": {"type": "string"},
                    "buttons": {"type": "array", "items": {"type": "object",
                                                           "additionalProperties": True}},
                    "products": {"type": "array", "items": {"type": "object",
                                                            "additionalProperties": True}},
                },
            }),
            "responses": created(ref("Message")),
        },
    },

    "/schema/": {
        "get": {
            "operationId": "getSchema",
            "summary": "The complete API surface as JSON.",
            "responses": ok(ref("Schema")),
        },
    },

    "/me/": {
        "get": {
            "operationId": "getMe",
            "summary": "Verify credentials and report their scope.",
            "responses": ok(ref("Credential")),
        },
    },
}


DESCRIPTION = """Customer-messaging platform API: live chat, AI agents, tickets and knowledge base.

UNOFFICIAL SPEC. Conecto publishes no OpenAPI description. The API does expose
`GET /schema/`, which returns the whole surface as JSON, but that endpoint
requires credentials, so this spec was AUTHORED FROM THE PUBLISHED PROSE
DOCUMENTATION at https://conecto.chat/developers and cross-checked against the
vendor's own MIT-licensed Python SDK (github.com/Nancy-Consulting/conecto-sdk)
for paths, verbs and field names.

Known limits, stated plainly: response shapes come from documented examples
rather than a schema, so optional fields the docs do not show are absent here;
`blocks` is left open because the ten documented block types are an untagged
union with no discriminator; and nothing here has been verified against a live
workspace. Anyone holding credentials should prefer `GET /schema/`.

Conventions the API applies throughout: pagination is `limit` plus `before_id`,
with `next_before_id` in the response; writes accept an `Idempotency-Key`
header and return 200 rather than 201 on a retry; errors are
`{"error": {"code", "message"}}`; and the rate limit is 300 requests/min per
credential, which returns 429 with `Retry-After`."""


spec = {
    "openapi": "3.1.0",
    "info": {
        "title": "Conecto",
        "version": "1",
        "description": DESCRIPTION,
        "license": {"name": "MIT"},
    },
    "externalDocs": {
        "url": "https://conecto.chat/developers",
        "description": "Conecto developer documentation",
    },
    "servers": [{"url": BASE, "description": "Conecto API v1"}],
    "components": {
        "securitySchemes": {
            "basicAuth": {
                "type": "http", "scheme": "basic",
                "description": "Client id as username, secret as password.",
            },
            "bearerAuth": {
                "type": "http", "scheme": "bearer",
                "description": "Authorization: Bearer <client_id>:<secret>",
            },
        },
        "schemas": dict(sorted(SCHEMAS.items())),
    },
    "security": [{"bearerAuth": []}, {"basicAuth": []}],
    "paths": dict(sorted(PATHS.items())),
}

json.dump(spec, sys.stdout, indent=2, ensure_ascii=False)
sys.stdout.write("\n")
