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
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "custom_fields",
						"short": "Workspace-defined fields.",
						"type": "`$OBJECT`",
					},
					map[string]any{
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
								"parts": []any{
									"contacts",
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
								"parts": []any{
									"contacts",
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
								"parts": []any{
									"conversations",
									"{id}",
									"assign",
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
								"parts": []any{
									"conversations",
									"{id}",
									"handoff",
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
								"parts": []any{
									"conversations",
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
								"parts": []any{
									"conversations",
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
								"parts": []any{
									"conversations",
									"{id}",
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
								"parts": []any{
									"conversations",
									"{id}",
									"messages",
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
								"parts": []any{
									"me",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"integrations",
									"{slug}",
									"install",
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
								"parts": []any{
									"integrations",
									"{slug}",
									"rotate_signing_secret",
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
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/integrations/",
								"parts": []any{
									"integrations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"integrations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.integrations`",
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
								"parts": []any{
									"integrations",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
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
								"parts": []any{
									"media",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"schema",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
						"name": "url",
						"req": true,
						"short": "HTTPS endpoint that receives the event POST.",
						"type": "`$STRING`",
					},
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
								"parts": []any{
									"webhooks",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
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
								"parts": []any{
									"webhooks",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.webhooks`",
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
								"parts": []any{
									"webhooks",
									"{id}",
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
								"parts": []any{
									"webhooks",
									"{id}",
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
