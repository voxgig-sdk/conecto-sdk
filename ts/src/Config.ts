
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Conecto',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "name": "not_found",
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
              "parts": [
                "integrations",
                "{slug}",
                "actions",
                "{id}",
                "run"
              ],
              "rename": {
                "param": {
                  "action": "id"
                }
              },
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
              }
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
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "custom_fields",
          "type": "`$OBJECT`"
        },
        {
          "name": "email",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        }
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
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/contacts/",
              "parts": [
                "contacts"
              ],
              "select": {
                "exist": [
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.custom_fields`"
              }
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
              "parts": [
                "contacts"
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
              }
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
          "type": "`$STRING`"
        },
        {
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "messages",
          "type": "`$ARRAY`"
        },
        {
          "name": "session",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "user_id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "widget_id",
          "type": "`$INTEGER`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/conversations/{id}/assign/",
              "parts": [
                "conversations",
                "{id}",
                "assign"
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
              }
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
              "parts": [
                "conversations",
                "{id}",
                "handoff"
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
              }
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
              "parts": [
                "conversations"
              ],
              "select": {
                "exist": [
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "conversations"
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
              }
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
              "parts": [
                "conversations",
                "{id}"
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
              }
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
              "parts": [
                "conversations",
                "{id}",
                "messages"
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
              }
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
              "parts": [
                "me"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "auth_type",
          "type": "`$STRING`"
        },
        {
          "name": "base_url",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "credential",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "signing_secret",
          "type": "`$STRING`"
        },
        {
          "name": "slug",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "widget_ids",
          "type": "`$ARRAY`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/{slug}/install/",
              "parts": [
                "integrations",
                "{slug}",
                "install"
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
              }
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
              "parts": [
                "integrations",
                "{slug}",
                "rotate_signing_secret"
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
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/integrations/",
              "parts": [
                "integrations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "integrations"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.integrations`"
              }
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
              "parts": [
                "integrations",
                "{id}"
              ],
              "rename": {
                "param": {
                  "slug": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "media"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "type": "`$BOOLEAN`"
        },
        {
          "name": "blocks",
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
          "type": "`$BOOLEAN`"
        },
        {
          "name": "products",
          "type": "`$ARRAY`"
        },
        {
          "name": "ticket_form",
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
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "message"
              ],
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
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
              }
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
              "parts": [
                "conversations",
                "{conversation_id}",
                "messages"
              ],
              "rename": {
                "param": {
                  "id": "conversation_id"
                }
              },
              "select": {
                "exist": [
                  "conversation_id",
                  "idempotency_key"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "schema"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "identify"
              ],
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
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
              }
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
              "parts": [
                "widgets",
                "{widget_id}",
                "visitors",
                "{session}",
                "unverify"
              ],
              "rename": {
                "param": {
                  "id": "widget_id"
                }
              },
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
              }
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
          "name": "created_at",
          "type": "`$STRING`"
        },
        {
          "name": "events",
          "req": true,
          "type": "`$ARRAY`"
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`"
        },
        {
          "name": "url",
          "req": true,
          "type": "`$STRING`"
        }
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
                "webhooks"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "webhooks"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.webhooks`"
              }
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
              "parts": [
                "webhooks",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "webhooks",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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

export {
  config
}

