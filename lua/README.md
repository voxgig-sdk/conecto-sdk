# Conecto Lua SDK



The Lua SDK for the Conecto API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Action()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/conecto-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("conecto_sdk")

local client = sdk.new({
  apikey = os.getenv("CONECTO_APIKEY"),
})
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Action():create({ id = "example_id", slug = "example_slug", ok = true })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local contacts, err = client:Contact():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Contact():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### ConectoSDK

```lua
local sdk = require("conecto_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ConectoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local conversation, err = client:Conversation():load({ id = "example_id" })
    if err then error(err) end
    -- conversation is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Action

| Field | Description |
| --- | --- |
| `arguments` |  |
| `blocks` |  |
| `conversation_id` |  |
| `error` |  |
| `not_found` | A normal no-match, not an error. |
| `ok` |  |
| `result` |  |

Operations: Create.

API path: `/integrations/{slug}/actions/{action}/run/`

#### Contact

| Field | Description |
| --- | --- |
| `created_at` |  |
| `custom_fields` | Workspace-defined fields. |
| `email` |  |
| `id` | Contact id. |

Operations: Create, List.

API path: `/contacts/`

#### Conversation

| Field | Description |
| --- | --- |
| `body` | Opening message. |
| `created_at` |  |
| `id` | Conversation id. |
| `messages` | Visitor-facing messages, oldest first. |
| `session` | Visitor browser session key. |
| `status` | Lifecycle state. |
| `user_id` |  |
| `widget_id` | Widget the conversation belongs to. |

Operations: Create, List, Load, Update.

API path: `/conversations/{id}/assign/`

#### Credential

| Field | Description |
| --- | --- |
| `widget_id` | Set when the credential is widget-scoped rather than workspace-wide. |
| `workspace_id` |  |

Operations: Load.

API path: `/me/`

#### Integration

| Field | Description |
| --- | --- |
| `actions` | Actions this integration exposes. |
| `auth_type` | How Conecto authenticates to base_url. |
| `base_url` | Root URL Conecto POSTs actions to. |
| `credential` |  |
| `name` | Human-readable name. |
| `signing_secret` | Secret used to sign action calls. |
| `slug` | Stable identifier, used in the path. |
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
| `ask_email` | Prompt the visitor for an email address. |
| `blocks` | At most 10. |
| `body` |  |
| `buttons` |  |
| `internal` | Internal note, not shown to the visitor. |
| `products` |  |
| `ticket_form` | Show the ticket form. |

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
| `events` | Event names subscribed to. |
| `id` | Webhook id. |
| `url` | HTTPS endpoint that receives the event POST. |

Operations: Create, List, Load, Remove.

API path: `/webhooks/`



## Entities


### Action

Create an instance: `local action = client:Action(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `table` |  |
| `blocks` | `table` |  |
| `conversation_id` | `number` |  |
| `error` | `string` |  |
| `not_found` | `boolean` | A normal no-match, not an error. |
| `ok` | `boolean` |  |
| `result` | `table` |  |

#### Example: Create

```lua
local action, err = client:Action():create({
  id = "example_id", -- string
  slug = "example_slug", -- string
  ok = true, -- boolean
})
```


### Contact

Create an instance: `local contact = client:Contact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `custom_fields` | `table` | Workspace-defined fields. |
| `email` | `string` |  |
| `id` | `number` | Contact id. |

#### Example: List

```lua
local contacts, err = client:Contact():list()
```

#### Example: Create

```lua
local contact, err = client:Contact():create({
  id = 1, -- number
})
```


### Conversation

Create an instance: `local conversation = client:Conversation(nil)`

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
| `body` | `string` | Opening message. |
| `created_at` | `string` |  |
| `id` | `number` | Conversation id. |
| `messages` | `table` | Visitor-facing messages, oldest first. |
| `session` | `string` | Visitor browser session key. |
| `status` | `string` | Lifecycle state. |
| `user_id` | `number` |  |
| `widget_id` | `number` | Widget the conversation belongs to. |

#### Example: Load

```lua
local conversation, err = client:Conversation():load({ id = 1 })
```

#### Example: List

```lua
local conversations, err = client:Conversation():list()
```

#### Example: Create

```lua
local conversation, err = client:Conversation():create({
  id = 1, -- number
  status = "example_status", -- string
  user_id = 1, -- number
})
```


### Credential

Create an instance: `local credential = client:Credential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `widget_id` | `number` | Set when the credential is widget-scoped rather than workspace-wide. |
| `workspace_id` | `number` |  |

#### Example: Load

```lua
local credential, err = client:Credential():load()
```


### Integration

Create an instance: `local integration = client:Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `table` | Actions this integration exposes. |
| `auth_type` | `string` | How Conecto authenticates to base_url. |
| `base_url` | `string` | Root URL Conecto POSTs actions to. |
| `credential` | `string` |  |
| `name` | `string` | Human-readable name. |
| `signing_secret` | `string` | Secret used to sign action calls. |
| `slug` | `string` | Stable identifier, used in the path. |
| `widget_ids` | `table` |  |

#### Example: Load

```lua
local integration, err = client:Integration():load({ id = "integration_id" })
```

#### Example: List

```lua
local integrations, err = client:Integration():list()
```

#### Example: Create

```lua
local integration, err = client:Integration():create({
  base_url = "example_base_url", -- string
  name = "example_name", -- string
  slug = "example_slug", -- string
})
```


### Media

Create an instance: `local media = client:Media(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local media, err = client:Media():create({
})
```


### Message

Create an instance: `local message = client:Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `boolean` | Prompt the visitor for an email address. |
| `blocks` | `table` | At most 10. |
| `body` | `string` |  |
| `buttons` | `table` |  |
| `internal` | `boolean` | Internal note, not shown to the visitor. |
| `products` | `table` |  |
| `ticket_form` | `boolean` | Show the ticket form. |

#### Example: Create

```lua
local message, err = client:Message():create({
  conversation_id = 1, -- number
})
```


### Schema

Create an instance: `local schema = client:Schema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local schema, err = client:Schema():load()
```


### Visitor

Create an instance: `local visitor = client:Visitor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `name` | `string` |  |

#### Example: Create

```lua
local visitor, err = client:Visitor():create({
  session = "example_session", -- string
  widget_id = 1, -- number
})
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

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
| `created_at` | `string` |  |
| `events` | `table` | Event names subscribed to. |
| `id` | `number` | Webhook id. |
| `url` | `string` | HTTPS endpoint that receives the event POST. |

#### Example: Load

```lua
local webhook, err = client:Webhook():load({ id = 1 })
```

#### Example: List

```lua
local webhooks, err = client:Webhook():list()
```

#### Example: Create

```lua
local webhook, err = client:Webhook():create({
  events = {}, -- table
  id = 1, -- number
  url = "example_url", -- string
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── conecto_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`conecto_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local contact = client:Contact()
contact:list()

-- contact:data_get() now returns the contact data from the last list
-- contact:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
