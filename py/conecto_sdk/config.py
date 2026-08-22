# Conecto SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Conecto",
            "slug": "conecto",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://conecto.chat/api/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "action": {},
                "contact": {},
                "conversation": {},
                "credential": {},
                "integration": {},
                "media": {},
                "message": {},
                "schema": {},
                "visitor": {},
                "webhook": {},
            },
        },
        "entity": {
      "action": {
        "fields": [
          {
            "name": "arguments",
            "type": "`$OBJECT`",
          },
          {
            "name": "blocks",
            "type": "`$ARRAY`",
          },
          {
            "name": "conversation_id",
            "type": "`$INTEGER`",
          },
          {
            "name": "error",
            "type": "`$STRING`",
          },
          {
            "name": "not_found",
            "short": "A normal no-match, not an error.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "ok",
            "req": True,
            "type": "`$BOOLEAN`",
          },
          {
            "name": "result",
            "type": "`$OBJECT`",
          },
        ],
        "name": "action",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "action",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/actions/{action}/run/",
                "parts": [
                  "integrations",
                  "{slug}",
                  "actions",
                  "{id}",
                  "run",
                ],
                "rename": {
                  "param": {
                    "action": "id",
                  },
                },
                "select": {
                  "$action": "run",
                  "exist": [
                    "id",
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "integration",
            ],
          ],
        },
      },
      "contact": {
        "fields": [
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "custom_fields",
            "short": "Workspace-defined fields.",
            "type": "`$OBJECT`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Contact id.",
            "type": "`$INTEGER`",
          },
        ],
        "name": "contact",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/contacts/",
                "parts": [
                  "contacts",
                ],
                "select": {
                  "exist": [
                    "idempotency_key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.custom_fields`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "before_id",
                      "orig": "before_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 25,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/contacts/",
                "parts": [
                  "contacts",
                ],
                "select": {
                  "exist": [
                    "before_id",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.contacts`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "conversation": {
        "fields": [
          {
            "name": "body",
            "short": "Opening message.",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Conversation id.",
            "type": "`$INTEGER`",
          },
          {
            "name": "messages",
            "short": "Visitor-facing messages, oldest first.",
            "type": "`$ARRAY`",
          },
          {
            "name": "session",
            "short": "Visitor browser session key.",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "req": True,
            "short": "Lifecycle state.",
            "type": "`$STRING`",
          },
          {
            "name": "user_id",
            "req": True,
            "type": "`$INTEGER`",
          },
          {
            "name": "widget_id",
            "short": "Widget the conversation belongs to.",
            "type": "`$INTEGER`",
          },
        ],
        "name": "conversation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/assign/",
                "parts": [
                  "conversations",
                  "{id}",
                  "assign",
                ],
                "select": {
                  "$action": "assign",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/handoff/",
                "parts": [
                  "conversations",
                  "{id}",
                  "handoff",
                ],
                "select": {
                  "$action": "handoff",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/",
                "parts": [
                  "conversations",
                ],
                "select": {
                  "exist": [
                    "idempotency_key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "before_id",
                      "orig": "before_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 25,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "session",
                      "orig": "session",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "widget_id",
                      "orig": "widget_id",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/conversations/",
                "parts": [
                  "conversations",
                ],
                "select": {
                  "exist": [
                    "before_id",
                    "limit",
                    "session",
                    "status",
                    "widget_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.conversations`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "since_id",
                      "orig": "since_id",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/conversations/{id}/",
                "parts": [
                  "conversations",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "since_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/conversations/{id}/messages/",
                "parts": [
                  "conversations",
                  "{id}",
                  "messages",
                ],
                "select": {
                  "$action": "message",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "credential": {
        "fields": [
          {
            "name": "widget_id",
            "short": "Set when the credential is widget-scoped rather than workspace-wide.",
            "type": "`$INTEGER`",
          },
          {
            "name": "workspace_id",
            "type": "`$INTEGER`",
          },
        ],
        "name": "credential",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/me/",
                "parts": [
                  "me",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "integration": {
        "fields": [
          {
            "name": "actions",
            "short": "Actions this integration exposes.",
            "type": "`$ARRAY`",
          },
          {
            "name": "auth_type",
            "short": "How Conecto authenticates to base_url.",
            "type": "`$STRING`",
          },
          {
            "name": "base_url",
            "req": True,
            "short": "Root URL Conecto POSTs actions to.",
            "type": "`$STRING`",
          },
          {
            "name": "credential",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "req": True,
            "short": "Human-readable name.",
            "type": "`$STRING`",
          },
          {
            "name": "signing_secret",
            "short": "Secret used to sign action calls.",
            "type": "`$STRING`",
          },
          {
            "name": "slug",
            "req": True,
            "short": "Stable identifier, used in the path.",
            "type": "`$STRING`",
          },
          {
            "name": "widget_ids",
            "type": "`$ARRAY`",
          },
        ],
        "name": "integration",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/install/",
                "parts": [
                  "integrations",
                  "{slug}",
                  "install",
                ],
                "select": {
                  "$action": "install",
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "slug",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/rotate_signing_secret/",
                "parts": [
                  "integrations",
                  "{slug}",
                  "rotate_signing_secret",
                ],
                "select": {
                  "$action": "rotate_signing_secret",
                  "exist": [
                    "slug",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/",
                "parts": [
                  "integrations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/integrations/",
                "parts": [
                  "integrations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.integrations`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "slug",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/integrations/{slug}/",
                "parts": [
                  "integrations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "integration",
            ],
          ],
        },
      },
      "media": {
        "fields": [],
        "name": "media",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/media/",
                "parts": [
                  "media",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "message": {
        "fields": [
          {
            "name": "ask_email",
            "short": "Prompt the visitor for an email address.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "blocks",
            "short": "At most 10.",
            "type": "`$ARRAY`",
          },
          {
            "name": "body",
            "type": "`$STRING`",
          },
          {
            "name": "buttons",
            "type": "`$ARRAY`",
          },
          {
            "name": "internal",
            "short": "Internal note, not shown to the visitor.",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "products",
            "type": "`$ARRAY`",
          },
          {
            "name": "ticket_form",
            "short": "Show the ticket form.",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "message",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "session",
                      "orig": "session",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "widget_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/message/",
                "parts": [
                  "widgets",
                  "{widget_id}",
                  "visitors",
                  "{session}",
                  "message",
                ],
                "rename": {
                  "param": {
                    "id": "widget_id",
                  },
                },
                "select": {
                  "exist": [
                    "idempotency_key",
                    "session",
                    "widget_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "header": [
                    {
                      "kind": "header",
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "kind": "param",
                      "name": "conversation_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/messages/",
                "parts": [
                  "conversations",
                  "{conversation_id}",
                  "messages",
                ],
                "rename": {
                  "param": {
                    "id": "conversation_id",
                  },
                },
                "select": {
                  "exist": [
                    "conversation_id",
                    "idempotency_key",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "conversation",
            ],
            [
              "widget",
              "visitor",
            ],
          ],
        },
      },
      "schema": {
        "fields": [],
        "name": "schema",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/schema/",
                "parts": [
                  "schema",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "visitor": {
        "fields": [
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
        ],
        "name": "visitor",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "session",
                      "orig": "session",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "widget_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/identify/",
                "parts": [
                  "widgets",
                  "{widget_id}",
                  "visitors",
                  "{session}",
                  "identify",
                ],
                "rename": {
                  "param": {
                    "id": "widget_id",
                  },
                },
                "select": {
                  "$action": "identify",
                  "exist": [
                    "session",
                    "widget_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "session",
                      "orig": "session",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "param",
                      "name": "widget_id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/unverify/",
                "parts": [
                  "widgets",
                  "{widget_id}",
                  "visitors",
                  "{session}",
                  "unverify",
                ],
                "rename": {
                  "param": {
                    "id": "widget_id",
                  },
                },
                "select": {
                  "$action": "unverify",
                  "exist": [
                    "session",
                    "widget_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "widget",
              "visitor",
            ],
          ],
        },
      },
      "webhook": {
        "fields": [
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "events",
            "req": True,
            "short": "Event names subscribed to.",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "req": True,
            "short": "Webhook id.",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "req": True,
            "short": "HTTPS endpoint that receives the event POST.",
            "type": "`$STRING`",
          },
        ],
        "name": "webhook",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/webhooks/",
                "parts": [
                  "webhooks",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/webhooks/",
                "parts": [
                  "webhooks",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.webhooks`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/webhooks/{id}/",
                "parts": [
                  "webhooks",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/webhooks/{id}/",
                "parts": [
                  "webhooks",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
