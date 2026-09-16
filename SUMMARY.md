# Conecto

Customer-messaging platform API: live chat, AI agents, tickets and knowledge base. UNOFFICIAL SPEC. Conecto publishes no OpenAPI description. The API does expose `GET /schema/`, which returns the whole surface as JSON, but that endpoint requires credentials, so this spec was AUTHORED FROM THE PUBLISHED PROSE DOCUMENTATION at https://conecto.chat/developers and cross-checked against the vendor&#39;s own MIT-licensed Python SDK (github.com/Nancy-Consulting/conecto-sdk) for paths, verbs and field names. Known limits, stated plainly: response shapes come from documented examples rather than a schema, so optional fields the docs do not show are absent here; `blocks` is left open because the ten documented block types are an untagged union with no discriminator; and nothing here has been verified against a live workspace. Anyone holding credentials should prefer `GET /schema/`. Conventions the API applies throughout: pagination is `limit` plus `before_id`, with `next_before_id` in the response; writes accept an `Idempotency-Key` header and return 200 rather than 201 on a retry; errors are `&#123;&quot;error&quot;: &#123;&quot;code&quot;, &quot;message&quot;&#125;&#125;`; and the rate limit is 300 requests/min per credential, which returns 429 with `Retry-After`.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 25 HTTP routes. There are 7 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Action](docs/api/action.html)

Results: Success.

SDK operations: `create`.

Key fields to recognise:

- `not_found`: A normal no-match, not an error.

### [Contact](docs/api/contact.html)

Results: Created.; Success.

SDK operations: `create`, `list`.

Key fields to recognise:

- `custom_fields`: Workspace-defined fields.
- `id`: Contact id.

### [Conversation](docs/api/conversation.html)

Results: Success.; Created.

SDK operations: `create`, `list`, `load`, `update`.

Key fields to recognise:

- `body`: Plain-text body.
- `id`: Conversation id.
- `messages`: Visitor-facing messages, oldest first.
- `session`: Visitor browser session key.
- `status`: Lifecycle state.

### [Credential](docs/api/credential.html)

Results: Success.

SDK operations: `load`.

Key fields to recognise:

- `widget_id`: Set when the credential is widget-scoped rather than workspace-wide.

### [Integration](docs/api/integration.html)

Results: Success.; Created. The response carries signing_secret.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `actions`: Actions this integration exposes.
- `auth_type`: How Conecto authenticates to base_url.
- `base_url`: Root URL Conecto POSTs actions to.
- `name`: Human-readable name.
- `signing_secret`: Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.

### [Media](docs/api/media.html)

Results: Created.

SDK operations: `create`.

### [Message](docs/api/message.html)

Results: Created.

SDK operations: `create`.

Key fields to recognise:

- `ask_email`: Prompt the visitor for an email address.
- `blocks`: Rich content blocks. At most 10 per message.
- `internal`: Internal note, not shown to the visitor.
- `ticket_form`: Show the ticket form.

### [Schema](docs/api/schema.html)

Results: Success.

SDK operations: `load`.

### [Visitor](docs/api/visitor.html)

Results: Success.

SDK operations: `create`.

### [Webhook](docs/api/webhook.html)

Results: Created.; Success.; Deleted.

SDK operations: `create`, `list`, `load`, `remove`.

Key fields to recognise:

- `events`: Event names subscribed to.
- `id`: Webhook id.
- `url`: HTTPS endpoint that receives the event POST.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Action](docs/api/action.html) | `create` | `POST /integrations/{slug}/actions/{action}/run/` | Required |
| [Contact](docs/api/contact.html) | `create` | `POST /contacts/` | Required |
| [Contact](docs/api/contact.html) | `list` | `GET /contacts/` | Required |
| [Conversation](docs/api/conversation.html) | `create` | `POST /conversations/{id}/assign/` | Required |
| [Conversation](docs/api/conversation.html) | `create` | `POST /conversations/{id}/handoff/` | Required |
| [Conversation](docs/api/conversation.html) | `create` | `POST /conversations/` | Required |
| [Conversation](docs/api/conversation.html) | `list` | `GET /conversations/` | Required |
| [Conversation](docs/api/conversation.html) | `load` | `GET /conversations/{id}/` | Required |
| [Conversation](docs/api/conversation.html) | `update` | `PATCH /conversations/{id}/messages/` | Required |
| [Credential](docs/api/credential.html) | `load` | `GET /me/` | Required |
| [Integration](docs/api/integration.html) | `create` | `POST /integrations/{slug}/install/` | Required |
| [Integration](docs/api/integration.html) | `create` | `POST /integrations/{slug}/rotate_signing_secret/` | Required |
| [Integration](docs/api/integration.html) | `create` | `POST /integrations/` | Required |
| [Integration](docs/api/integration.html) | `list` | `GET /integrations/` | Required |
| [Integration](docs/api/integration.html) | `load` | `GET /integrations/{slug}/` | Required |
| [Media](docs/api/media.html) | `create` | `POST /media/` | Required |
| [Message](docs/api/message.html) | `create` | `POST /widgets/{id}/visitors/{session}/message/` | Required |
| [Message](docs/api/message.html) | `create` | `POST /conversations/{id}/messages/` | Required |
| [Schema](docs/api/schema.html) | `load` | `GET /schema/` | Required |
| [Visitor](docs/api/visitor.html) | `create` | `POST /widgets/{id}/visitors/{session}/identify/` | Required |
| [Visitor](docs/api/visitor.html) | `create` | `POST /widgets/{id}/visitors/{session}/unverify/` | Required |
| [Webhook](docs/api/webhook.html) | `create` | `POST /webhooks/` | Required |
| [Webhook](docs/api/webhook.html) | `list` | `GET /webhooks/` | Required |
| [Webhook](docs/api/webhook.html) | `load` | `GET /webhooks/{id}/` | Required |
| [Webhook](docs/api/webhook.html) | `remove` | `DELETE /webhooks/{id}/` | Required |

## Connect to the API

- Conecto API v1: `https://conecto.chat/api/v1`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Client id as username, secret as password.

Authorization: Bearer &lt;client_id&gt;:&lt;secret&gt;

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [Ruby](docs/sdks/rb.html) | `rb/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `conecto_list`: List records for an entity. Supported entities: `contact`, `conversation`, `integration`, `webhook`.
- `conecto_load`: Load one record for an entity. Supported entities: `conversation`, `credential`, `integration`, `schema`, `webhook`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

