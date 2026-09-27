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
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
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
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/{slug}/actions/{action}/run/",
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
								"parts": []any{
									"integrations",
									"{slug}",
									"actions",
									"{id}",
									"run",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"action": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "action",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "run",
									"exist": []any{
										"id",
										"slug",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.integration",
						},
					},
				},
			},
			"contact": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "custom_fields",
						"title": "Custom Fields",
						"type": "`$OBJECT`",
						"short": "Workspace-defined fields.",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"format": "email",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Contact id.",
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
								"kind": "http",
								"method": "POST",
								"orig": "/contacts/",
								"segments": []any{
									map[string]any{
										"lit": "contacts",
									},
								},
								"parts": []any{
									"contacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.custom_fields`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/contacts/",
								"segments": []any{
									map[string]any{
										"lit": "contacts",
									},
								},
								"parts": []any{
									"contacts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.contacts`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before_id",
											"orig": "before_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"before_id",
										"limit",
									},
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
						"title": "Body",
						"type": "`$STRING`",
						"short": "Opening message.",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Conversation id.",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"short": "Visitor-facing messages, oldest first.",
					},
					map[string]any{
						"name": "session",
						"title": "Session",
						"type": "`$STRING`",
						"short": "Visitor browser session key.",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"req": true,
						"short": "Lifecycle state.",
					},
					map[string]any{
						"name": "widget_id",
						"title": "Widget Id",
						"type": "`$INTEGER`",
						"short": "Widget the conversation belongs to.",
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
								"parts": []any{
									"conversations",
									"{id}",
									"assign",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "assign",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"conversations",
									"{id}",
									"handoff",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "handoff",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
								},
								"parts": []any{
									"conversations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/conversations/",
								"segments": []any{
									map[string]any{
										"lit": "conversations",
									},
								},
								"parts": []any{
									"conversations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.conversations`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "before_id",
											"orig": "before_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 25,
										},
										map[string]any{
											"name": "session",
											"orig": "session",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "widget_id",
											"orig": "widget_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"conversations",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "since_id",
											"orig": "since_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"since_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"conversations",
									"{id}",
									"messages",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "message",
									"exist": []any{
										"id",
									},
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
						"title": "Widget Id",
						"type": "`$INTEGER`",
						"short": "Set when the credential is widget-scoped rather than workspace-wide.",
					},
					map[string]any{
						"name": "workspace_id",
						"title": "Workspace Id",
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
								"kind": "http",
								"method": "GET",
								"orig": "/me/",
								"segments": []any{
									map[string]any{
										"lit": "me",
									},
								},
								"parts": []any{
									"me",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Actions",
						"type": "`$ARRAY`",
						"short": "Actions this integration exposes.",
					},
					map[string]any{
						"name": "auth_type",
						"title": "Auth Type",
						"type": "`$STRING`",
						"short": "How Conecto authenticates to base_url.",
					},
					map[string]any{
						"name": "base_url",
						"title": "Base Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Root URL Conecto POSTs actions to.",
						"format": "uri",
					},
					map[string]any{
						"name": "credential",
						"title": "Credential",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Human-readable name.",
					},
					map[string]any{
						"name": "signing_secret",
						"title": "Signing Secret",
						"type": "`$STRING`",
						"short": "Secret used to sign action calls.",
					},
					map[string]any{
						"name": "slug",
						"title": "Slug",
						"type": "`$STRING`",
						"req": true,
						"short": "Stable identifier, used in the path.",
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
								"parts": []any{
									"integrations",
									"{slug}",
									"install",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "install",
									"exist": []any{
										"slug",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"integrations",
									"{slug}",
									"rotate_signing_secret",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "slug",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "rotate_signing_secret",
									"exist": []any{
										"slug",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
								},
								"parts": []any{
									"integrations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
								},
								"parts": []any{
									"integrations",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.integrations`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/integrations/{slug}/",
								"segments": []any{
									map[string]any{
										"lit": "integrations",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"integrations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "slug",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "POST",
								"orig": "/media/",
								"segments": []any{
									map[string]any{
										"lit": "media",
									},
								},
								"parts": []any{
									"media",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Ask Email",
						"type": "`$BOOLEAN`",
						"short": "Prompt the visitor for an email address.",
					},
					map[string]any{
						"name": "blocks",
						"title": "Blocks",
						"type": "`$ARRAY`",
						"short": "At most 10.",
					},
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "buttons",
						"title": "Buttons",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "internal",
						"title": "Internal",
						"type": "`$BOOLEAN`",
						"short": "Internal note, not shown to the visitor.",
					},
					map[string]any{
						"name": "products",
						"title": "Products",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "ticket_form",
						"title": "Ticket Form",
						"type": "`$BOOLEAN`",
						"short": "Show the ticket form.",
					},
				},
				"name": "message",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/message/",
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
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"message",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "session",
											"orig": "session",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "widget_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"idempotency_key",
										"session",
										"widget_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/conversations/{id}/messages/",
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
								"parts": []any{
									"conversations",
									"{conversation_id}",
									"messages",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "conversation_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "idempotency_key",
											"orig": "idempotency_key",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
									"params": []any{
										map[string]any{
											"name": "conversation_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"conversation_id",
										"idempotency_key",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.conversation",
						},
						[]any{
							"$.main.kit.entity.visitor",
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
								"kind": "http",
								"method": "GET",
								"orig": "/schema/",
								"segments": []any{
									map[string]any{
										"lit": "schema",
									},
								},
								"parts": []any{
									"schema",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"visitor": map[string]any{
				"fields": []any{},
				"name": "visitor",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/identify/",
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
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"identify",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "session",
											"orig": "session",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "widget_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "identify",
									"exist": []any{
										"session",
										"widget_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/widgets/{id}/visitors/{session}/unverify/",
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
								"parts": []any{
									"widgets",
									"{widget_id}",
									"visitors",
									"{session}",
									"unverify",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"id": "widget_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "session",
											"orig": "session",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "widget_id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "unverify",
									"exist": []any{
										"session",
										"widget_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"format": "date-time",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
						"short": "Event names subscribed to.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Webhook id.",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "HTTPS endpoint that receives the event POST.",
						"format": "uri",
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
								"kind": "http",
								"method": "POST",
								"orig": "/webhooks/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webhooks/",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.webhooks`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
