package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Conecto",
			"slug": "conecto",
			"version": "0.1.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://conecto.chat/api/v1",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"action": map[string]any{},
				"contact": map[string]any{},
				"conversation": map[string]any{},
				"credential": map[string]any{},
				"integration": map[string]any{},
				"media": map[string]any{},
				"message": map[string]any{},
				"schema": map[string]any{},
				"visitor": map[string]any{},
				"webhook": map[string]any{},
			},
		},
		"entity": map[string]any{
			"action": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arguments",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "blocks",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "conversation_id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "error",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "not_found",
						"short": "A normal no-match, not an error.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "ok",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "result",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "action",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "action",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/{slug}/actions/{action}/run/",
								"rename": map[string]any{
									"param": map[string]any{
										"action": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "actions",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "run",
									},
								},
								"select": map[string]any{
									"$action": "run",
									"exist": []any{
										"id",
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"integrations",
									"{slug}",
									"actions",
									"{id}",
									"run",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"integration",
						},
					},
				},
			},
			"contact": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "custom_fields",
						"short": "Workspace-defined fields.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Contact id.",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "contact",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/contacts/",
								"segments": []any{
									map[string]any{
										"lit": "contacts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.custom_fields`",
								},
								"parts": []any{
									"contacts",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "before_id",
											"orig": "before_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/contacts/",
								"segments": []any{
									map[string]any{
										"lit": "contacts",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before_id",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contacts`",
								},
								"parts": []any{
									"contacts",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"conversation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "body",
						"short": "Opening message.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Conversation id.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "messages",
						"short": "Visitor-facing messages, oldest first.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "session",
						"short": "Visitor browser session key.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"short": "Lifecycle state.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "widget_id",
						"short": "Widget the conversation belongs to.",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "conversation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/{id}/assign/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "assign",
									},
								},
								"select": map[string]any{
									"$action": "assign",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
									"{id}",
									"assign",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/{id}/handoff/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "handoff",
									},
								},
								"select": map[string]any{
									"$action": "handoff",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
									"{id}",
									"handoff",
								},
							},
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "before_id",
											"orig": "before_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 25,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "session",
											"orig": "session",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "widget_id",
											"orig": "widget_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/conversations/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before_id",
										"limit",
										"session",
										"status",
										"widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conversations`",
								},
								"parts": []any{
									"conversations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "since_id",
											"orig": "since_id",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/conversations/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"since_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/conversations/{id}/messages/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{
									"$action": "message",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
									"{id}",
									"messages",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"credential": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "widget_id",
						"short": "Set when the credential is widget-scoped rather than workspace-wide.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "workspace_id",
						"type": "`$INTEGER`",
					},
				},
				"name": "credential",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/me/",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"me",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"integration": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "actions",
						"short": "Actions this integration exposes.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "auth_type",
						"short": "How Conecto authenticates to base_url.",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "base_url",
						"req": true,
						"short": "Root URL Conecto POSTs actions to.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credential",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Human-readable name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "signing_secret",
						"short": "Secret used to sign action calls.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"req": true,
						"short": "Stable identifier, used in the path.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "widget_ids",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "integration",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/{slug}/install/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "install",
									},
								},
								"select": map[string]any{
									"$action": "install",
									"exist": []any{
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"integrations",
									"{slug}",
									"install",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "slug",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/{slug}/rotate_signing_secret/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"var": "slug",
									},
									map[string]any{
										"lit": "rotate_signing_secret",
									},
								},
								"select": map[string]any{
									"$action": "rotate_signing_secret",
									"exist": []any{
										"slug",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"integrations",
									"{slug}",
									"rotate_signing_secret",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"integrations",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.integrations`",
								},
								"parts": []any{
									"integrations",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/{slug}/",
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"integrations",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"integration",
						},
					},
				},
			},
			"media": map[string]any{
				"fields": []any{},
				"name": "media",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/media/",
								"segments": []any{
									map[string]any{
										"lit": "media",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"media",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"message": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ask_email",
						"short": "Prompt the visitor for an email address.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "blocks",
						"short": "At most 10.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "buttons",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "internal",
						"short": "Internal note, not shown to the visitor.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "products",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ticket_form",
						"short": "Show the ticket form.",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
										},
									},
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "session",
											"orig": "session",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "widget_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/message/",
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "widgets",
									},
									map[string]any{
										"var": "widget_id",
									},
									map[string]any{
										"lit": "visitors",
									},
									map[string]any{
										"var": "session",
									},
									map[string]any{
										"lit": "message",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
										"session",
										"widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"message",
								},
							},
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
										},
									},
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "conversation_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/{id}/messages/",
								"rename": map[string]any{
									"param": map[string]any{
										"id": "conversation_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
									map[string]any{
										"var": "conversation_id",
									},
									map[string]any{
										"lit": "messages",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"conversation_id",
										"idempotency_key",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"conversations",
									"{conversation_id}",
									"messages",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"conversation",
						},
						[]any{
							"widget",
							"visitor",
						},
					},
				},
			},
			"schema": map[string]any{
				"fields": []any{},
				"name": "schema",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/schema/",
								"segments": []any{
									map[string]any{
										"lit": "schema",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"schema",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"visitor": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "email",
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
				},
				"name": "visitor",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "session",
											"orig": "session",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "widget_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/identify/",
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "widgets",
									},
									map[string]any{
										"var": "widget_id",
									},
									map[string]any{
										"lit": "visitors",
									},
									map[string]any{
										"var": "session",
									},
									map[string]any{
										"lit": "identify",
									},
								},
								"select": map[string]any{
									"$action": "identify",
									"exist": []any{
										"session",
										"widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"identify",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "session",
											"orig": "session",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "widget_id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/unverify/",
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "widgets",
									},
									map[string]any{
										"var": "widget_id",
									},
									map[string]any{
										"lit": "visitors",
									},
									map[string]any{
										"var": "session",
									},
									map[string]any{
										"lit": "unverify",
									},
								},
								"select": map[string]any{
									"$action": "unverify",
									"exist": []any{
										"session",
										"widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"unverify",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"widget",
							"visitor",
						},
					},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"format": "date-time",
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "events",
						"req": true,
						"short": "Event names subscribed to.",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"short": "Webhook id.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"format": "uri",
						"name": "url",
						"req": true,
						"short": "HTTPS endpoint that receives the event POST.",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/webhooks/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webhooks",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/webhooks/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.webhooks`",
								},
								"parts": []any{
									"webhooks",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/webhooks/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webhooks",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/webhooks/{id}/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"webhooks",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
