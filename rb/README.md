# Conecto Ruby SDK



The Ruby SDK for the Conecto API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Action` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/conecto-sdk/releases](https://github.com/voxgig-sdk/conecto-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Conecto_sdk"

client = ConectoSDK.new({
  "apikey" => ENV["CONECTO_APIKEY"],
})
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Action record.
created = client.Action.create({ "id" => "example_id", "slug" => "example_slug", "ok" => true })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  contacts = client.Contact.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = ConectoSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
contact = client.Contact.list()
puts contact
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ConectoSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
CONECTO_TEST_LIVE=TRUE
CONECTO_APIKEY=<your-key>
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ConectoSDK

```ruby
require_relative "Conecto_sdk"
client = ConectoSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ConectoSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ConectoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Action` | `(data) -> ActionEntity` | Create an Action entity instance. |
| `Contact` | `(data) -> ContactEntity` | Create a Contact entity instance. |
| `Conversation` | `(data) -> ConversationEntity` | Create a Conversation entity instance. |
| `Credential` | `(data) -> CredentialEntity` | Create a Credential entity instance. |
| `Integration` | `(data) -> IntegrationEntity` | Create an Integration entity instance. |
| `Media` | `(data) -> MediaEntity` | Create a Media entity instance. |
| `Message` | `(data) -> MessageEntity` | Create a Message entity instance. |
| `Schema` | `(data) -> SchemaEntity` | Create a Schema entity instance. |
| `Visitor` | `(data) -> VisitorEntity` | Create a Visitor entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ConectoError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Action

| Field | Description |
| --- | --- |
| `arguments` |  |
| `blocks` |  |
| `conversation_id` |  |
| `error` |  |
| `not_found` |  |
| `ok` |  |
| `result` |  |

Operations: Create.

API path: `/integrations/{slug}/actions/{action}/run/`

#### Contact

| Field | Description |
| --- | --- |
| `created_at` |  |
| `custom_fields` |  |
| `email` |  |
| `id` |  |

Operations: Create, List.

API path: `/contacts/`

#### Conversation

| Field | Description |
| --- | --- |
| `body` |  |
| `created_at` |  |
| `id` |  |
| `messages` |  |
| `session` |  |
| `status` |  |
| `user_id` |  |
| `widget_id` |  |

Operations: Create, List, Load, Update.

API path: `/conversations/{id}/assign/`

#### Credential

| Field | Description |
| --- | --- |
| `widget_id` |  |
| `workspace_id` |  |

Operations: Load.

API path: `/me/`

#### Integration

| Field | Description |
| --- | --- |
| `actions` |  |
| `auth_type` |  |
| `base_url` |  |
| `credential` |  |
| `name` |  |
| `signing_secret` |  |
| `slug` |  |
| `widget_ids` |  |

Operations: Create, List, Load.

API path: `/integrations/{slug}/install/`

#### Media

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/media/`

#### Message

| Field | Description |
| --- | --- |
| `ask_email` |  |
| `blocks` |  |
| `body` |  |
| `buttons` |  |
| `internal` |  |
| `products` |  |
| `ticket_form` |  |

Operations: Create.

API path: `/widgets/{id}/visitors/{session}/message/`

#### Schema

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/schema/`

#### Visitor

| Field | Description |
| --- | --- |
| `email` |  |
| `name` |  |

Operations: Create.

API path: `/widgets/{id}/visitors/{session}/identify/`

#### Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `events` |  |
| `id` |  |
| `url` |  |

Operations: Create, List, Load, Remove.

API path: `/webhooks/`



## Entities


### Action

Create an instance: `action = client.Action`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Hash` |  |
| `blocks` | `Array` |  |
| `conversation_id` | `Integer` |  |
| `error` | `String` |  |
| `not_found` | `Boolean` |  |
| `ok` | `Boolean` |  |
| `result` | `Hash` |  |

#### Example: Create

```ruby
action = client.Action.create({
  "id" => "example_id", # String
  "slug" => "example_slug", # String
  "ok" => true, # Boolean
})
```


### Contact

Create an instance: `contact = client.Contact`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `custom_fields` | `Hash` |  |
| `email` | `String` |  |
| `id` | `Integer` |  |

#### Example: List

```ruby
# list returns an Array of Contact records (raises on error).
contacts = client.Contact.list
```

#### Example: Create

```ruby
contact = client.Contact.create({
  "id" => 1, # Integer
})
```


### Conversation

Create an instance: `conversation = client.Conversation`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `String` |  |
| `created_at` | `String` |  |
| `id` | `Integer` |  |
| `messages` | `Array` |  |
| `session` | `String` |  |
| `status` | `String` |  |
| `user_id` | `Integer` |  |
| `widget_id` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Conversation record (raises on error).
conversation = client.Conversation.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Conversation records (raises on error).
conversations = client.Conversation.list
```

#### Example: Create

```ruby
conversation = client.Conversation.create({
  "id" => 1, # Integer
  "status" => "example_status", # String
  "user_id" => 1, # Integer
})
```


### Credential

Create an instance: `credential = client.Credential`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `widget_id` | `Integer` |  |
| `workspace_id` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Credential record (raises on error).
credential = client.Credential.load()
```


### Integration

Create an instance: `integration = client.Integration`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `Array` |  |
| `auth_type` | `String` |  |
| `base_url` | `String` |  |
| `credential` | `String` |  |
| `name` | `String` |  |
| `signing_secret` | `String` |  |
| `slug` | `String` |  |
| `widget_ids` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Integration record (raises on error).
integration = client.Integration.load({ "id" => "integration_id" })
```

#### Example: List

```ruby
# list returns an Array of Integration records (raises on error).
integrations = client.Integration.list
```

#### Example: Create

```ruby
integration = client.Integration.create({
  "base_url" => "example_base_url", # String
  "name" => "example_name", # String
  "slug" => "example_slug", # String
})
```


### Media

Create an instance: `media = client.Media`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
media = client.Media.create({
})
```


### Message

Create an instance: `message = client.Message`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `Boolean` |  |
| `blocks` | `Array` |  |
| `body` | `String` |  |
| `buttons` | `Array` |  |
| `internal` | `Boolean` |  |
| `products` | `Array` |  |
| `ticket_form` | `Boolean` |  |

#### Example: Create

```ruby
message = client.Message.create({
})
```


### Schema

Create an instance: `schema = client.Schema`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Schema record (raises on error).
schema = client.Schema.load()
```


### Visitor

Create an instance: `visitor = client.Visitor`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `String` |  |
| `name` | `String` |  |

#### Example: Create

```ruby
visitor = client.Visitor.create({
  "session" => "example_session", # String
  "widget_id" => 1, # Integer
})
```


### Webhook

Create an instance: `webhook = client.Webhook`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `String` |  |
| `events` | `Array` |  |
| `id` | `Integer` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Webhook record (raises on error).
webhook = client.Webhook.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Webhook records (raises on error).
webhooks = client.Webhook.list
```

#### Example: Create

```ruby
webhook = client.Webhook.create({
  "events" => [], # Array
  "id" => 1, # Integer
  "url" => "example_url", # String
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Conecto_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Conecto_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
contact = client.Contact
contact.list()

# contact.data_get now returns the contact data from the last list
# contact.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
