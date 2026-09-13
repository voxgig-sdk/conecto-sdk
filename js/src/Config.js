
const { BaseFeature } = require('./feature/base/BaseFeature')
const { TestFeature } = require('./feature/test/TestFeature')



const FEATURE_CLASS = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named requires above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
//
// Read by SecretsFeature through a DEFERRED require of this module: the
// requires above make the pair circular, and this file replaces
// module.exports at the end of its body, so anything reading the map at
// module load would get undefined. See tm/js/src/feature/secrets.
const FEATURE_PLUGINS = {
  
}


class Config {

  makeFeature(fn) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(fn) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Conecto',
        slug: "conecto",
    version: "0.1.1",
    target: "js",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://conecto.chat/api/v1",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      action: {
      },

      contact: {
      },

      conversation: {
      },

      credential: {
      },

      integration: {
      },

      media: {
      },

      message: {
      },

      schema: {
      },

      visitor: {
      },

      webhook: {
      },

    }
  }


  entity = {
    "action": {
      "fields": [
        {
          "name": "arguments",
          "type": "`$OBJECT`"
        },
        {
          "name": "blocks",
          "type": "`$ARRAY`"
        },
        {
          "name": "conversation_id",
          "type": "`$INTEGER`"
        },
        {
          "name": "error",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "not_found",
          "short": "A normal no-match, not an error.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "ok",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "result",
          "type": "`$OBJECT`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "slug",
                    "orig": "slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/{slug}/actions/{action}/run/",
              "rename": {
                "param": {
                  "action": "id"
                }
              },
              "segments": [
                {
                  "lit": "integrations"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "actions"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "run"
                }
              ],
              "select": {
                "$action": "run",
                "exist": [
                  "id",
                  "slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "integrations",
                "{slug}",
                "actions",
                "{id}",
                "run"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "integration"
          ]
        ]
      }
    },
    "contact": {
      "fields": [
        {
          "format": "date-time",
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "custom_fields",
          "short": "Workspace-defined fields.",
          "type": "`$OBJECT`"
        },
        {
          "format": "email",
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Contact id.",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/contacts/",
              "segments": [
                {
                  "lit": "contacts"
                }
              ],
              "select": {
                "exist": [
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.custom_fields`"
              },
              "parts": [
                "contacts"
              ]
            }
          ]
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 25,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/contacts/",
              "segments": [
                {
                  "lit": "contacts"
                }
              ],
              "select": {
                "exist": [
                  "before_id",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.contacts`"
              },
              "parts": [
                "contacts"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "conversation": {
      "fields": [
        {
          "name": "body",
          "short": "Opening message.",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Conversation id.",
          "type": "`$INTEGER`"
        },
        {
          "name": "messages",
          "short": "Visitor-facing messages, oldest first.",
          "type": "`$ARRAY`"
        },
        {
          "name": "session",
          "short": "Visitor browser session key.",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "short": "Lifecycle state.",
          "type": "`$STRING`"
        },
        {
          "name": "user_id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "widget_id",
          "short": "Widget the conversation belongs to.",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/conversations/{id}/assign/",
              "segments": [
                {
                  "lit": "conversations"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "assign"
                }
              ],
              "select": {
                "$action": "assign",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations",
                "{id}",
                "assign"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/conversations/{id}/handoff/",
              "segments": [
                {
                  "lit": "conversations"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "handoff"
                }
              ],
              "select": {
                "$action": "handoff",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations",
                "{id}",
                "handoff"
              ]
            },
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "idempotency_key",
                    "orig": "idempotency_key",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/conversations/",
              "segments": [
                {
                  "lit": "conversations"
                }
              ],
              "select": {
                "exist": [
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations"
              ]
            }
          ]
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 25,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "session",
                    "orig": "session",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "status",
                    "orig": "status",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "widget_id",
                    "orig": "widget_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/conversations/",
              "segments": [
                {
                  "lit": "conversations"
                }
              ],
              "select": {
                "exist": [
                  "before_id",
                  "limit",
                  "session",
                  "status",
                  "widget_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.conversations`"
              },
              "parts": [
                "conversations"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "since_id",
                    "orig": "since_id",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/conversations/{id}/",
              "segments": [
                {
                  "lit": "conversations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id",
                  "since_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations",
                "{id}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "PATCH",
              "orig": "/conversations/{id}/messages/",
              "segments": [
                {
                  "lit": "conversations"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "messages"
                }
              ],
              "select": {
                "$action": "message",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations",
                "{id}",
                "messages"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "credential": {
      "fields": [
        {
          "name": "widget_id",
          "short": "Set when the credential is widget-scoped rather than workspace-wide.",
          "type": "`$INTEGER`"
        },
        {
          "name": "workspace_id",
          "type": "`$INTEGER`"
        }
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
              "segments": [
                {
                  "lit": "me"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "me"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "integration": {
      "fields": [
        {
          "name": "actions",
          "short": "Actions this integration exposes.",
          "type": "`$ARRAY`"
        },
        {
          "name": "auth_type",
          "short": "How Conecto authenticates to base_url.",
          "type": "`$STRING`"
        },
        {
          "format": "uri",
          "name": "base_url",
          "req": true,
          "short": "Root URL Conecto POSTs actions to.",
          "type": "`$STRING`"
        },
        {
          "name": "credential",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "short": "Human-readable name.",
          "type": "`$STRING`"
        },
        {
          "name": "signing_secret",
          "short": "Secret used to sign action calls.",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "req": true,
          "short": "Stable identifier, used in the path.",
          "type": "`$STRING`"
        },
        {
          "name": "widget_ids",
          "type": "`$ARRAY`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/{slug}/install/",
              "segments": [
                {
                  "lit": "integrations"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "install"
                }
              ],
              "select": {
                "$action": "install",
                "exist": [
                  "slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "integrations",
                "{slug}",
                "install"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "slug",
                    "orig": "slug",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/{slug}/rotate_signing_secret/",
              "segments": [
                {
                  "lit": "integrations"
                },
                {
                  "var": "slug"
                },
                {
                  "lit": "rotate_signing_secret"
                }
              ],
              "select": {
                "$action": "rotate_signing_secret",
                "exist": [
                  "slug"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "integrations",
                "{slug}",
                "rotate_signing_secret"
              ]
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/",
              "segments": [
                {
                  "lit": "integrations"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "integrations"
              ]
            }
          ]
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
              "segments": [
                {
                  "lit": "integrations"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.integrations`"
              },
              "parts": [
                "integrations"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/integrations/{slug}/",
              "rename": {
                "param": {
                  "slug": "id"
                }
              },
              "segments": [
                {
                  "lit": "integrations"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "integrations",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "integration"
          ]
        ]
      }
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
              "segments": [
                {
                  "lit": "media"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "media"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "message": {
      "fields": [
        {
          "name": "ask_email",
          "short": "Prompt the visitor for an email address.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "blocks",
          "short": "At most 10.",
          "type": "`$ARRAY`"
        },
        {
          "name": "body",
          "type": "`$STRING`"
        },
        {
          "name": "buttons",
          "type": "`$ARRAY`"
        },
        {
          "name": "internal",
          "short": "Internal note, not shown to the visitor.",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "products",
          "type": "`$ARRAY`"
        },
        {
          "name": "ticket_form",
          "short": "Show the ticket form.",
          "type": "`$BOOLEAN`"
        }
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
                    "type": "`$STRING`"
                  }
                ],
                "params": [
                  {
                    "kind": "param",
                    "name": "session",
                    "orig": "session",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "widget_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/widgets/{id}/visitors/{session}/message/",
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
              "segments": [
                {
                  "lit": "widgets"
                },
                {
                  "var": "widget_id"
                },
                {
                  "lit": "visitors"
                },
                {
                  "var": "session"
                },
                {
                  "lit": "message"
                }
              ],
              "select": {
                "exist": [
                  "idempotency_key",
                  "session",
                  "widget_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "message"
              ]
            },
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "idempotency_key",
                    "orig": "idempotency_key",
                    "type": "`$STRING`"
                  }
                ],
                "params": [
                  {
                    "kind": "param",
                    "name": "conversation_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/conversations/{id}/messages/",
              "rename": {
                "param": {
                  "id": "conversation_id"
                }
              },
              "segments": [
                {
                  "lit": "conversations"
                },
                {
                  "var": "conversation_id"
                },
                {
                  "lit": "messages"
                }
              ],
              "select": {
                "exist": [
                  "conversation_id",
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "conversations",
                "{conversation_id}",
                "messages"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "conversation"
          ],
          [
            "widget",
            "visitor"
          ]
        ]
      }
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
              "segments": [
                {
                  "lit": "schema"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "schema"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "visitor": {
      "fields": [
        {
          "format": "email",
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "widget_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/widgets/{id}/visitors/{session}/identify/",
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
              "segments": [
                {
                  "lit": "widgets"
                },
                {
                  "var": "widget_id"
                },
                {
                  "lit": "visitors"
                },
                {
                  "var": "session"
                },
                {
                  "lit": "identify"
                }
              ],
              "select": {
                "$action": "identify",
                "exist": [
                  "session",
                  "widget_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "identify"
              ]
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "session",
                    "orig": "session",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "param",
                    "name": "widget_id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/widgets/{id}/visitors/{session}/unverify/",
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
              "segments": [
                {
                  "lit": "widgets"
                },
                {
                  "var": "widget_id"
                },
                {
                  "lit": "visitors"
                },
                {
                  "var": "session"
                },
                {
                  "lit": "unverify"
                }
              ],
              "select": {
                "$action": "unverify",
                "exist": [
                  "session",
                  "widget_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "unverify"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "widget",
            "visitor"
          ]
        ]
      }
    },
    "webhook": {
      "fields": [
        {
          "format": "date-time",
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "events",
          "req": true,
          "short": "Event names subscribed to.",
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "req": true,
          "short": "Webhook id.",
          "type": "`$INTEGER`"
        },
        {
          "format": "uri",
          "name": "url",
          "req": true,
          "short": "HTTPS endpoint that receives the event POST.",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
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
              "segments": [
                {
                  "lit": "webhooks"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "webhooks"
              ]
            }
          ]
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
              "segments": [
                {
                  "lit": "webhooks"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.webhooks`"
              },
              "parts": [
                "webhooks"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/webhooks/{id}/",
              "segments": [
                {
                  "lit": "webhooks"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "webhooks",
                "{id}"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/webhooks/{id}/",
              "segments": [
                {
                  "lit": "webhooks"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "webhooks",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

module.exports = {
  config,
  FEATURE_PLUGINS,
}

