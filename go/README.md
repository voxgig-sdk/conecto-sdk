# Conecto Golang SDK



The Golang SDK for the Conecto API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Action(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/conecto-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/conecto-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/conecto-sdk/go=../conecto-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/conecto-sdk/go"
)

func main() {
    client := sdk.NewConectoSDK(map[string]any{
        "apikey": os.Getenv("CONECTO_APIKEY"),
    })

    // Create a action.
    created, err := client.Action(nil).Create(map[string]any{"id": "example_id", "slug": "example_slug", "ok": true}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
contacts, err := client.Contact(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = contacts
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

contact, err := client.Contact(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(contact) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewConectoSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewConectoSDK

```go
func NewConectoSDK(options map[string]any) *ConectoSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ConectoSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ConectoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Action` | `(data map[string]any) ConectoEntity` | Create an Action entity instance. |
| `Contact` | `(data map[string]any) ConectoEntity` | Create a Contact entity instance. |
| `Conversation` | `(data map[string]any) ConectoEntity` | Create a Conversation entity instance. |
| `Credential` | `(data map[string]any) ConectoEntity` | Create a Credential entity instance. |
| `Integration` | `(data map[string]any) ConectoEntity` | Create an Integration entity instance. |
| `Media` | `(data map[string]any) ConectoEntity` | Create a Media entity instance. |
| `Message` | `(data map[string]any) ConectoEntity` | Create a Message entity instance. |
| `Schema` | `(data map[string]any) ConectoEntity` | Create a Schema entity instance. |
| `Visitor` | `(data map[string]any) ConectoEntity` | Create a Visitor entity instance. |
| `Webhook` | `(data map[string]any) ConectoEntity` | Create a Webhook entity instance. |

### Entity interface (ConectoEntity)

All entities implement the `ConectoEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    action, err := client.Action(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // action is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Action

| Field | Description |
| --- | --- |
| `"arguments"` |  |
| `"blocks"` |  |
| `"conversation_id"` |  |
| `"error"` |  |
| `"not_found"` | A normal no-match, not an error. |
| `"ok"` |  |
| `"result"` |  |

Operations: Create.

API path: `/integrations/{slug}/actions/{action}/run/`

#### Contact

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"custom_fields"` | Workspace-defined fields. |
| `"email"` |  |
| `"id"` | Contact id. |

Operations: Create, List.

API path: `/contacts/`

#### Conversation

| Field | Description |
| --- | --- |
| `"body"` | Opening message. |
| `"created_at"` |  |
| `"id"` | Conversation id. |
| `"messages"` | Visitor-facing messages, oldest first. |
| `"session"` | Visitor browser session key. |
| `"status"` | Lifecycle state. |
| `"user_id"` |  |
| `"widget_id"` | Widget the conversation belongs to. |

Operations: Create, List, Load, Update.

API path: `/conversations/{id}/assign/`

#### Credential

| Field | Description |
| --- | --- |
| `"widget_id"` | Set when the credential is widget-scoped rather than workspace-wide. |
| `"workspace_id"` |  |

Operations: Load.

API path: `/me/`

#### Integration

| Field | Description |
| --- | --- |
| `"actions"` | Actions this integration exposes. |
| `"auth_type"` | How Conecto authenticates to base_url. |
| `"base_url"` | Root URL Conecto POSTs actions to. |
| `"credential"` |  |
| `"name"` | Human-readable name. |
| `"signing_secret"` | Secret used to sign action calls. |
| `"slug"` | Stable identifier, used in the path. |
| `"widget_ids"` |  |

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
| `"ask_email"` | Prompt the visitor for an email address. |
| `"blocks"` | At most 10. |
| `"body"` |  |
| `"buttons"` |  |
| `"internal"` | Internal note, not shown to the visitor. |
| `"products"` |  |
| `"ticket_form"` | Show the ticket form. |

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
| `"email"` |  |
| `"name"` |  |

Operations: Create.

API path: `/widgets/{id}/visitors/{session}/identify/`

#### Webhook

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"events"` | Event names subscribed to. |
| `"id"` | Webhook id. |
| `"url"` | HTTPS endpoint that receives the event POST. |

Operations: Create, List, Load, Remove.

API path: `/webhooks/`



## Entities


### Action

Create an instance: `action := client.Action(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `map[string]any` |  |
| `blocks` | `[]any` |  |
| `conversation_id` | `int` |  |
| `error` | `string` |  |
| `not_found` | `bool` | A normal no-match, not an error. |
| `ok` | `bool` |  |
| `result` | `map[string]any` |  |

#### Example: Create

```go
result, err := client.Action(nil).Create(map[string]any{
    "id": "example_id",
    "slug": "example_slug",
    "ok": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Contact

Create an instance: `contact := client.Contact(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `custom_fields` | `map[string]any` | Workspace-defined fields. |
| `email` | `string` |  |
| `id` | `int` | Contact id. |

#### Example: List

```go
contacts, err := client.Contact(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(contacts) // the array of records
```

#### Example: Create

```go
result, err := client.Contact(nil).Create(map[string]any{
    "id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Conversation

Create an instance: `conversation := client.Conversation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `string` | Opening message. |
| `created_at` | `string` |  |
| `id` | `int` | Conversation id. |
| `messages` | `[]any` | Visitor-facing messages, oldest first. |
| `session` | `string` | Visitor browser session key. |
| `status` | `string` | Lifecycle state. |
| `user_id` | `int` |  |
| `widget_id` | `int` | Widget the conversation belongs to. |

#### Example: Load

```go
conversation, err := client.Conversation(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversation) // the loaded record
```

#### Example: List

```go
conversations, err := client.Conversation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(conversations) // the array of records
```

#### Example: Create

```go
result, err := client.Conversation(nil).Create(map[string]any{
    "id": 1,
    "status": "example_status",
    "user_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Credential

Create an instance: `credential := client.Credential(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `widget_id` | `int` | Set when the credential is widget-scoped rather than workspace-wide. |
| `workspace_id` | `int` |  |

#### Example: Load

```go
credential, err := client.Credential(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(credential) // the loaded record
```


### Integration

Create an instance: `integration := client.Integration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `[]any` | Actions this integration exposes. |
| `auth_type` | `string` | How Conecto authenticates to base_url. |
| `base_url` | `string` | Root URL Conecto POSTs actions to. |
| `credential` | `string` |  |
| `name` | `string` | Human-readable name. |
| `signing_secret` | `string` | Secret used to sign action calls. |
| `slug` | `string` | Stable identifier, used in the path. |
| `widget_ids` | `[]any` |  |

#### Example: Load

```go
integration, err := client.Integration(nil).Load(map[string]any{"id": "integration_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(integration) // the loaded record
```

#### Example: List

```go
integrations, err := client.Integration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(integrations) // the array of records
```

#### Example: Create

```go
result, err := client.Integration(nil).Create(map[string]any{
    "base_url": "example_base_url",
    "name": "example_name",
    "slug": "example_slug",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Media

Create an instance: `media := client.Media(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.Media(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Message

Create an instance: `message := client.Message(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `bool` | Prompt the visitor for an email address. |
| `blocks` | `[]any` | At most 10. |
| `body` | `string` |  |
| `buttons` | `[]any` |  |
| `internal` | `bool` | Internal note, not shown to the visitor. |
| `products` | `[]any` |  |
| `ticket_form` | `bool` | Show the ticket form. |

#### Example: Create

```go
result, err := client.Message(nil).Create(map[string]any{
    "conversation_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Schema

Create an instance: `schema := client.Schema(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
schema, err := client.Schema(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(schema) // the loaded record
```


### Visitor

Create an instance: `visitor := client.Visitor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `name` | `string` |  |

#### Example: Create

```go
result, err := client.Visitor(nil).Create(map[string]any{
    "session": "example_session",
    "widget_id": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `events` | `[]any` | Event names subscribed to. |
| `id` | `int` | Webhook id. |
| `url` | `string` | HTTPS endpoint that receives the event POST. |

#### Example: Load

```go
webhook, err := client.Webhook(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhook) // the loaded record
```

#### Example: List

```go
webhooks, err := client.Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhooks) // the array of records
```

#### Example: Create

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "events": []any{},
    "id": 1,
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/conecto-sdk/go/
├── conecto.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/conecto-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
contact := client.Contact(nil)
contact.List(nil, nil)

// contact.Data() now returns the contact data from the last list
// contact.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
