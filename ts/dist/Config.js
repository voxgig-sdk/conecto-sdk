"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Conecto',
        slug: "conecto",
        version: "0.1.1",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
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
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://conecto.chat/api/v1",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            action: {},
            contact: {},
            conversation: {},
            credential: {},
            integration: {},
            media: {},
            message: {},
            schema: {},
            visitor: {},
            webhook: {},
        }
    };
    entity = {
        "action": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/integrations/{slug}/actions/{action}/run/",
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "action",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "run",
                                "exist": [
                                    "id",
                                    "slug"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.integration"
                    ]
                ]
            }
        },
        "contact": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "custom_fields",
                    "title": "Custom Fields",
                    "type": "`$OBJECT`",
                    "short": "Workspace-defined fields."
                },
                {
                    "name": "email",
                    "title": "Email",
                    "type": "`$STRING`",
                    "format": "email"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Contact id."
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/contacts/",
                            "segments": [
                                {
                                    "lit": "contacts"
                                }
                            ],
                            "parts": [
                                "contacts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.custom_fields`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "contacts"
                                }
                            ],
                            "parts": [
                                "contacts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.contacts`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before_id",
                                        "orig": "before_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 25
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before_id",
                                    "limit"
                                ]
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
                    "title": "Body",
                    "type": "`$STRING`",
                    "short": "Opening message."
                },
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Conversation id."
                },
                {
                    "name": "messages",
                    "title": "Messages",
                    "type": "`$ARRAY`",
                    "short": "Visitor-facing messages, oldest first."
                },
                {
                    "name": "session",
                    "title": "Session",
                    "type": "`$STRING`",
                    "short": "Visitor browser session key."
                },
                {
                    "name": "status",
                    "title": "Status",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Lifecycle state."
                },
                {
                    "name": "widget_id",
                    "title": "Widget Id",
                    "type": "`$INTEGER`",
                    "short": "Widget the conversation belongs to."
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
                            "parts": [
                                "conversations",
                                "{id}",
                                "assign"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "assign",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
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
                            "parts": [
                                "conversations",
                                "{id}",
                                "handoff"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "handoff",
                                "exist": [
                                    "id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/conversations/",
                            "segments": [
                                {
                                    "lit": "conversations"
                                }
                            ],
                            "parts": [
                                "conversations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "conversations"
                                }
                            ],
                            "parts": [
                                "conversations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.conversations`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "before_id",
                                        "orig": "before_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 25
                                    },
                                    {
                                        "name": "session",
                                        "orig": "session",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "status",
                                        "orig": "status",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "widget_id",
                                        "orig": "widget_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "before_id",
                                    "limit",
                                    "session",
                                    "status",
                                    "widget_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "conversations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "conversations",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "since_id",
                                        "orig": "since_id",
                                        "type": "`$INTEGER`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id",
                                    "since_id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "conversations"
                                },
                                {
                                    "var": "id"
                                },
                                {
                                    "lit": "messages"
                                }
                            ],
                            "parts": [
                                "conversations",
                                "{id}",
                                "messages"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "message",
                                "exist": [
                                    "id"
                                ]
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
                    "title": "Widget Id",
                    "type": "`$INTEGER`",
                    "short": "Set when the credential is widget-scoped rather than workspace-wide."
                },
                {
                    "name": "workspace_id",
                    "title": "Workspace Id",
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/me/",
                            "segments": [
                                {
                                    "lit": "me"
                                }
                            ],
                            "parts": [
                                "me"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "Actions",
                    "type": "`$ARRAY`",
                    "short": "Actions this integration exposes."
                },
                {
                    "name": "auth_type",
                    "title": "Auth Type",
                    "type": "`$STRING`",
                    "short": "How Conecto authenticates to base_url."
                },
                {
                    "name": "base_url",
                    "title": "Base Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Root URL Conecto POSTs actions to.",
                    "format": "uri"
                },
                {
                    "name": "credential",
                    "title": "Credential",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Human-readable name."
                },
                {
                    "name": "signing_secret",
                    "title": "Signing Secret",
                    "type": "`$STRING`",
                    "short": "Secret used to sign action calls."
                },
                {
                    "name": "slug",
                    "title": "Slug",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Stable identifier, used in the path."
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
                            "parts": [
                                "integrations",
                                "{slug}",
                                "install"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "install",
                                "exist": [
                                    "slug"
                                ]
                            }
                        },
                        {
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
                            "parts": [
                                "integrations",
                                "{slug}",
                                "rotate_signing_secret"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "slug",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "rotate_signing_secret",
                                "exist": [
                                    "slug"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/integrations/",
                            "segments": [
                                {
                                    "lit": "integrations"
                                }
                            ],
                            "parts": [
                                "integrations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "integrations"
                                }
                            ],
                            "parts": [
                                "integrations"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.integrations`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "integrations"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "integrations",
                                "{id}"
                            ],
                            "rename": {
                                "param": {
                                    "slug": "id"
                                }
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "slug",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/media/",
                            "segments": [
                                {
                                    "lit": "media"
                                }
                            ],
                            "parts": [
                                "media"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
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
                    "title": "Ask Email",
                    "type": "`$BOOLEAN`",
                    "short": "Prompt the visitor for an email address."
                },
                {
                    "name": "blocks",
                    "title": "Blocks",
                    "type": "`$ARRAY`",
                    "short": "At most 10."
                },
                {
                    "name": "body",
                    "title": "Body",
                    "type": "`$STRING`"
                },
                {
                    "name": "buttons",
                    "title": "Buttons",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "internal",
                    "title": "Internal",
                    "type": "`$BOOLEAN`",
                    "short": "Internal note, not shown to the visitor."
                },
                {
                    "name": "products",
                    "title": "Products",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "ticket_form",
                    "title": "Ticket Form",
                    "type": "`$BOOLEAN`",
                    "short": "Show the ticket form."
                }
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "session",
                                        "orig": "session",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "widget_id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "idempotency_key",
                                    "session",
                                    "widget_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/conversations/{id}/messages/",
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "idempotency_key",
                                        "orig": "idempotency_key",
                                        "type": "`$STRING`",
                                        "kind": "header"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "conversation_id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "conversation_id",
                                    "idempotency_key"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "$.main.kit.entity.conversation"
                    ],
                    [
                        "$.main.kit.entity.visitor"
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
                            "kind": "http",
                            "method": "GET",
                            "orig": "/schema/",
                            "segments": [
                                {
                                    "lit": "schema"
                                }
                            ],
                            "parts": [
                                "schema"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "session",
                                        "orig": "session",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "widget_id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "identify",
                                "exist": [
                                    "session",
                                    "widget_id"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/widgets/{id}/visitors/{session}/unverify/",
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
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "session",
                                        "orig": "session",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true
                                    },
                                    {
                                        "name": "widget_id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "$action": "unverify",
                                "exist": [
                                    "session",
                                    "widget_id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "webhook": {
            "fields": [
                {
                    "name": "created_at",
                    "title": "Created At",
                    "type": "`$STRING`",
                    "format": "date-time"
                },
                {
                    "name": "events",
                    "title": "Events",
                    "type": "`$ARRAY`",
                    "req": true,
                    "short": "Event names subscribed to."
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$INTEGER`",
                    "req": true,
                    "short": "Webhook id."
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "HTTPS endpoint that receives the event POST.",
                    "format": "uri"
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
                            "kind": "http",
                            "method": "POST",
                            "orig": "/webhooks/",
                            "segments": [
                                {
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "webhooks"
                                }
                            ],
                            "parts": [
                                "webhooks"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.webhooks`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
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
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
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
                                    "lit": "webhooks"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "parts": [
                                "webhooks",
                                "{id}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$INTEGER`",
                                        "kind": "param",
                                        "reqd": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map