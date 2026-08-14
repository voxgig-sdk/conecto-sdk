# Conecto Python SDK



The Python SDK for the Conecto API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Action()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/conecto-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from conecto_sdk import ConectoSDK

client = ConectoSDK({
    "apikey": os.environ.get("CONECTO_APIKEY"),
})
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Action().create({"id": "example_id", "slug": "example_slug", "ok": True})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    contacts = client.Contact().list()
    print(contacts)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ConectoSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
contact = client.Contact().list()
# contact contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ConectoSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ConectoSDK

```python
from conecto_sdk import ConectoSDK

client = ConectoSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ConectoSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ConectoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `action = client.Action()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `dict` |  |
| `blocks` | `list` |  |
| `conversation_id` | `int` |  |
| `error` | `str` |  |
| `not_found` | `bool` |  |
| `ok` | `bool` |  |
| `result` | `dict` |  |

#### Example: Create

```python
action = client.Action().create({
    "id": "example_id",  # str
    "slug": "example_slug",  # str
    "ok": True,  # bool
})
```


### Contact

Create an instance: `contact = client.Contact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `custom_fields` | `dict` |  |
| `email` | `str` |  |
| `id` | `int` |  |

#### Example: List

```python
contacts = client.Contact().list()
```

#### Example: Create

```python
contact = client.Contact().create({
    "id": 1,  # int
})
```


### Conversation

Create an instance: `conversation = client.Conversation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `body` | `str` |  |
| `created_at` | `str` |  |
| `id` | `int` |  |
| `messages` | `list` |  |
| `session` | `str` |  |
| `status` | `str` |  |
| `user_id` | `int` |  |
| `widget_id` | `int` |  |

#### Example: Load

```python
conversation = client.Conversation().load({"id": 1})
```

#### Example: List

```python
conversations = client.Conversation().list()
```

#### Example: Create

```python
conversation = client.Conversation().create({
    "id": 1,  # int
    "status": "example_status",  # str
    "user_id": 1,  # int
})
```


### Credential

Create an instance: `credential = client.Credential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `widget_id` | `int` |  |
| `workspace_id` | `int` |  |

#### Example: Load

```python
credential = client.Credential().load()
```


### Integration

Create an instance: `integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `list` |  |
| `auth_type` | `str` |  |
| `base_url` | `str` |  |
| `credential` | `str` |  |
| `name` | `str` |  |
| `signing_secret` | `str` |  |
| `slug` | `str` |  |
| `widget_ids` | `list` |  |

#### Example: Load

```python
integration = client.Integration().load({"id": "integration_id"})
```

#### Example: List

```python
integrations = client.Integration().list()
```

#### Example: Create

```python
integration = client.Integration().create({
    "base_url": "example_base_url",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```


### Media

Create an instance: `media = client.Media()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
media = client.Media().create({
})
```


### Message

Create an instance: `message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `bool` |  |
| `blocks` | `list` |  |
| `body` | `str` |  |
| `buttons` | `list` |  |
| `internal` | `bool` |  |
| `products` | `list` |  |
| `ticket_form` | `bool` |  |

#### Example: Create

```python
message = client.Message().create({
})
```


### Schema

Create an instance: `schema = client.Schema()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
schema = client.Schema().load()
```


### Visitor

Create an instance: `visitor = client.Visitor()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `name` | `str` |  |

#### Example: Create

```python
visitor = client.Visitor().create({
    "session": "example_session",  # str
    "widget_id": 1,  # int
})
```


### Webhook

Create an instance: `webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `str` |  |
| `events` | `list` |  |
| `id` | `int` |  |
| `url` | `str` |  |

#### Example: Load

```python
webhook = client.Webhook().load({"id": 1})
```

#### Example: List

```python
webhooks = client.Webhook().list()
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "events": [],  # list
    "id": 1,  # int
    "url": "example_url",  # str
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── conecto_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`conecto_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
contact = client.Contact()
contact.list()

# contact.data_get() now returns the contact data from the last list
# contact.match_get() returns the last match criteria
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
