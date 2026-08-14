# Conecto Python SDK Reference

Complete API reference for the Conecto Python SDK.


## ConectoSDK

### Constructor

```python
from conecto_sdk import ConectoSDK

client = ConectoSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ConectoSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ConectoSDK.test()
```


### Instance Methods

#### `Action(data=None)`

Create a new `ActionEntity` instance. Pass `None` for no initial data.

#### `Contact(data=None)`

Create a new `ContactEntity` instance. Pass `None` for no initial data.

#### `Conversation(data=None)`

Create a new `ConversationEntity` instance. Pass `None` for no initial data.

#### `Credential(data=None)`

Create a new `CredentialEntity` instance. Pass `None` for no initial data.

#### `Integration(data=None)`

Create a new `IntegrationEntity` instance. Pass `None` for no initial data.

#### `Media(data=None)`

Create a new `MediaEntity` instance. Pass `None` for no initial data.

#### `Message(data=None)`

Create a new `MessageEntity` instance. Pass `None` for no initial data.

#### `Schema(data=None)`

Create a new `SchemaEntity` instance. Pass `None` for no initial data.

#### `Visitor(data=None)`

Create a new `VisitorEntity` instance. Pass `None` for no initial data.

#### `Webhook(data=None)`

Create a new `WebhookEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ActionEntity

```python
action = client.Action()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arguments` | `dict` | No |  |
| `blocks` | `list` | No |  |
| `conversation_id` | `int` | No |  |
| `error` | `str` | No |  |
| `not_found` | `bool` | No |  |
| `ok` | `bool` | Yes |  |
| `result` | `dict` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Action().create({
    "id": "example_id",  # str
    "slug": "example_slug",  # str
    "ok": True,  # bool
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ActionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ContactEntity

```python
contact = client.Contact()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `custom_fields` | `dict` | No |  |
| `email` | `str` | No |  |
| `id` | `int` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Contact().create({
    "id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Contact().list()
for contact in results:
    print(contact)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ContactEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ConversationEntity

```python
conversation = client.Conversation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `body` | `str` | No |  |
| `created_at` | `str` | No |  |
| `id` | `int` | Yes |  |
| `messages` | `list` | No |  |
| `session` | `str` | No |  |
| `status` | `str` | Yes |  |
| `user_id` | `int` | Yes |  |
| `widget_id` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Conversation().create({
    "id": 1,  # int
    "status": "example_status",  # str
    "user_id": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Conversation().list()
for conversation in results:
    print(conversation)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Conversation().load({"id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Conversation().update({
    "id": 1,
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ConversationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CredentialEntity

```python
credential = client.Credential()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `widget_id` | `int` | No |  |
| `workspace_id` | `int` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Credential().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CredentialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntegrationEntity

```python
integration = client.Integration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actions` | `list` | No |  |
| `auth_type` | `str` | No |  |
| `base_url` | `str` | Yes |  |
| `credential` | `str` | No |  |
| `name` | `str` | Yes |  |
| `signing_secret` | `str` | No |  |
| `slug` | `str` | Yes |  |
| `widget_ids` | `list` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Integration().create({
    "base_url": "example_base_url",  # str
    "name": "example_name",  # str
    "slug": "example_slug",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Integration().list()
for integration in results:
    print(integration)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Integration().load({"id": "integration_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntegrationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MediaEntity

```python
media = client.Media()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Media().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MediaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MessageEntity

```python
message = client.Message()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ask_email` | `bool` | No |  |
| `blocks` | `list` | No |  |
| `body` | `str` | No |  |
| `buttons` | `list` | No |  |
| `internal` | `bool` | No |  |
| `products` | `list` | No |  |
| `ticket_form` | `bool` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Message().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MessageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SchemaEntity

```python
schema = client.Schema()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Schema().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SchemaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VisitorEntity

```python
visitor = client.Visitor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Visitor().create({
    "session": "example_session",  # str
    "widget_id": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VisitorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEntity

```python
webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `str` | No |  |
| `events` | `list` | Yes |  |
| `id` | `int` | Yes |  |
| `url` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Webhook().create({
    "events": [],  # list
    "id": 1,  # int
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Webhook().list()
for webhook in results:
    print(webhook)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Webhook().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Webhook().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ConectoSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

