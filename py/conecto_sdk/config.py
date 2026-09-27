# Conecto SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "version": "0.1.1",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "action",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/actions/{action}/run/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "actions",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "run",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "action",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "run",
                  "exist": [
                    "id",
                    "slug",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.integration",
            ],
          ],
        },
      },
      "contact": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "custom_fields",
            "title": "Custom Fields",
            "type": "`$OBJECT`",
            "short": "Workspace-defined fields.",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
            "format": "email",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Contact id.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "contact",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/contacts/",
                "segments": [
                  {
                    "lit": "contacts",
                  },
                ],
                "parts": [
                  "contacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.custom_fields`",
                },
                "args": {
                  "header": [
                    {
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                      "kind": "header",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "idempotency_key",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/contacts/",
                "segments": [
                  {
                    "lit": "contacts",
                  },
                ],
                "parts": [
                  "contacts",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.contacts`",
                },
                "args": {
                  "query": [
                    {
                      "name": "before_id",
                      "orig": "before_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 25,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "before_id",
                    "limit",
                  ],
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
            "title": "Body",
            "type": "`$STRING`",
            "short": "Opening message.",
          },
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Conversation id.",
          },
          {
            "name": "messages",
            "title": "Messages",
            "type": "`$ARRAY`",
            "short": "Visitor-facing messages, oldest first.",
          },
          {
            "name": "session",
            "title": "Session",
            "type": "`$STRING`",
            "short": "Visitor browser session key.",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "req": True,
            "short": "Lifecycle state.",
          },
          {
            "name": "widget_id",
            "title": "Widget Id",
            "type": "`$INTEGER`",
            "short": "Widget the conversation belongs to.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "conversation",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/assign/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "assign",
                  },
                ],
                "parts": [
                  "conversations",
                  "{id}",
                  "assign",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "assign",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/handoff/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "handoff",
                  },
                ],
                "parts": [
                  "conversations",
                  "{id}",
                  "handoff",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "handoff",
                  "exist": [
                    "id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                ],
                "parts": [
                  "conversations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                      "kind": "header",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "idempotency_key",
                  ],
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/conversations/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                ],
                "parts": [
                  "conversations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.conversations`",
                },
                "args": {
                  "query": [
                    {
                      "name": "before_id",
                      "orig": "before_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                    {
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 25,
                    },
                    {
                      "name": "session",
                      "orig": "session",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                    {
                      "name": "widget_id",
                      "orig": "widget_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "before_id",
                    "limit",
                    "session",
                    "status",
                    "widget_id",
                  ],
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/conversations/{id}/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "conversations",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                  "query": [
                    {
                      "name": "since_id",
                      "orig": "since_id",
                      "type": "`$INTEGER`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                    "since_id",
                  ],
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "kind": "http",
                "method": "PATCH",
                "orig": "/conversations/{id}/messages/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "messages",
                  },
                ],
                "parts": [
                  "conversations",
                  "{id}",
                  "messages",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "message",
                  "exist": [
                    "id",
                  ],
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
            "title": "Widget Id",
            "type": "`$INTEGER`",
            "short": "Set when the credential is widget-scoped rather than workspace-wide.",
          },
          {
            "name": "workspace_id",
            "title": "Workspace Id",
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
                "kind": "http",
                "method": "GET",
                "orig": "/me/",
                "segments": [
                  {
                    "lit": "me",
                  },
                ],
                "parts": [
                  "me",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Actions",
            "type": "`$ARRAY`",
            "short": "Actions this integration exposes.",
          },
          {
            "name": "auth_type",
            "title": "Auth Type",
            "type": "`$STRING`",
            "short": "How Conecto authenticates to base_url.",
          },
          {
            "name": "base_url",
            "title": "Base Url",
            "type": "`$STRING`",
            "req": True,
            "short": "Root URL Conecto POSTs actions to.",
            "format": "uri",
          },
          {
            "name": "credential",
            "title": "Credential",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "req": True,
            "short": "Human-readable name.",
          },
          {
            "name": "signing_secret",
            "title": "Signing Secret",
            "type": "`$STRING`",
            "short": "Secret used to sign action calls.",
          },
          {
            "name": "slug",
            "title": "Slug",
            "type": "`$STRING`",
            "req": True,
            "short": "Stable identifier, used in the path.",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "integration",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/install/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "install",
                  },
                ],
                "parts": [
                  "integrations",
                  "{slug}",
                  "install",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "install",
                  "exist": [
                    "slug",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/{slug}/rotate_signing_secret/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                  {
                    "var": "slug",
                  },
                  {
                    "lit": "rotate_signing_secret",
                  },
                ],
                "parts": [
                  "integrations",
                  "{slug}",
                  "rotate_signing_secret",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "slug",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "rotate_signing_secret",
                  "exist": [
                    "slug",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/integrations/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                ],
                "parts": [
                  "integrations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/integrations/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                ],
                "parts": [
                  "integrations",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.integrations`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/integrations/{slug}/",
                "segments": [
                  {
                    "lit": "integrations",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "integrations",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "slug": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "slug",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
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
                "kind": "http",
                "method": "POST",
                "orig": "/media/",
                "segments": [
                  {
                    "lit": "media",
                  },
                ],
                "parts": [
                  "media",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Ask Email",
            "type": "`$BOOLEAN`",
            "short": "Prompt the visitor for an email address.",
          },
          {
            "name": "blocks",
            "title": "Blocks",
            "type": "`$ARRAY`",
            "short": "At most 10.",
          },
          {
            "name": "body",
            "title": "Body",
            "type": "`$STRING`",
          },
          {
            "name": "buttons",
            "title": "Buttons",
            "type": "`$ARRAY`",
          },
          {
            "name": "internal",
            "title": "Internal",
            "type": "`$BOOLEAN`",
            "short": "Internal note, not shown to the visitor.",
          },
          {
            "name": "products",
            "title": "Products",
            "type": "`$ARRAY`",
          },
          {
            "name": "ticket_form",
            "title": "Ticket Form",
            "type": "`$BOOLEAN`",
            "short": "Show the ticket form.",
          },
        ],
        "name": "message",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/message/",
                "segments": [
                  {
                    "lit": "widgets",
                  },
                  {
                    "var": "widget_id",
                  },
                  {
                    "lit": "visitors",
                  },
                  {
                    "var": "session",
                  },
                  {
                    "lit": "message",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "session",
                      "orig": "session",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "widget_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "idempotency_key",
                    "session",
                    "widget_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/conversations/{id}/messages/",
                "segments": [
                  {
                    "lit": "conversations",
                  },
                  {
                    "var": "conversation_id",
                  },
                  {
                    "lit": "messages",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "header": [
                    {
                      "name": "idempotency_key",
                      "orig": "idempotency_key",
                      "type": "`$STRING`",
                      "kind": "header",
                    },
                  ],
                  "params": [
                    {
                      "name": "conversation_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "conversation_id",
                    "idempotency_key",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "$.main.kit.entity.conversation",
            ],
            [
              "$.main.kit.entity.visitor",
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
                "kind": "http",
                "method": "GET",
                "orig": "/schema/",
                "segments": [
                  {
                    "lit": "schema",
                  },
                ],
                "parts": [
                  "schema",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "visitor": {
        "fields": [],
        "name": "visitor",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/identify/",
                "segments": [
                  {
                    "lit": "widgets",
                  },
                  {
                    "var": "widget_id",
                  },
                  {
                    "lit": "visitors",
                  },
                  {
                    "var": "session",
                  },
                  {
                    "lit": "identify",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "session",
                      "orig": "session",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "widget_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "identify",
                  "exist": [
                    "session",
                    "widget_id",
                  ],
                },
              },
              {
                "kind": "http",
                "method": "POST",
                "orig": "/widgets/{id}/visitors/{session}/unverify/",
                "segments": [
                  {
                    "lit": "widgets",
                  },
                  {
                    "var": "widget_id",
                  },
                  {
                    "lit": "visitors",
                  },
                  {
                    "var": "session",
                  },
                  {
                    "lit": "unverify",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "session",
                      "orig": "session",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                    },
                    {
                      "name": "widget_id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "$action": "unverify",
                  "exist": [
                    "session",
                    "widget_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "webhook": {
        "fields": [
          {
            "name": "created_at",
            "title": "Created At",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "events",
            "title": "Events",
            "type": "`$ARRAY`",
            "req": True,
            "short": "Event names subscribed to.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "req": True,
            "short": "Webhook id.",
          },
          {
            "name": "url",
            "title": "Url",
            "type": "`$STRING`",
            "req": True,
            "short": "HTTPS endpoint that receives the event POST.",
            "format": "uri",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "webhook",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/webhooks/",
                "segments": [
                  {
                    "lit": "webhooks",
                  },
                ],
                "parts": [
                  "webhooks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/webhooks/",
                "segments": [
                  {
                    "lit": "webhooks",
                  },
                ],
                "parts": [
                  "webhooks",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.webhooks`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/webhooks/{id}/",
                "segments": [
                  {
                    "lit": "webhooks",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "webhooks",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/webhooks/{id}/",
                "segments": [
                  {
                    "lit": "webhooks",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "webhooks",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
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
