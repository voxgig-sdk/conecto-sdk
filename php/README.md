# Conecto PHP SDK



The PHP SDK for the Conecto API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->ActionResult()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/conecto-sdk/releases](https://github.com/voxgig-sdk/conecto-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'conecto_sdk.php';

$client = new ConectoSDK([
    "apikey" => getenv("CONECTO_APIKEY"),
]);
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created ActionResult record.
$created = $client->ActionResult()->create(["id" => "example_id", "slug" => "example_slug", "ok" => true]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $contacts = $client->Contact()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = ConectoSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$contact = $client->Contact()->list();
print_r($contact);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ConectoSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
CONECTO_TEST_LIVE=TRUE
CONECTO_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ConectoSDK

```php
require_once 'conecto_sdk.php';
$client = new ConectoSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ConectoSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ConectoSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `ActionResult` | `($data): ActionResultEntity` | Create an ActionResult entity instance. |
| `Contact` | `($data): ContactEntity` | Create a Contact entity instance. |
| `Conversation` | `($data): ConversationEntity` | Create a Conversation entity instance. |
| `Credential` | `($data): CredentialEntity` | Create a Credential entity instance. |
| `Integration` | `($data): IntegrationEntity` | Create an Integration entity instance. |
| `Media` | `($data): MediaEntity` | Create a Media entity instance. |
| `Message` | `($data): MessageEntity` | Create a Message entity instance. |
| `Schema` | `($data): SchemaEntity` | Create a Schema entity instance. |
| `Visitor` | `($data): VisitorEntity` | Create a Visitor entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### ActionResult

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


### ActionResult

Create an instance: `$action_result = $client->ActionResult();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `array` |  |
| `blocks` | `array` |  |
| `conversation_id` | `int` |  |
| `error` | `string` |  |
| `not_found` | `bool` |  |
| `ok` | `bool` |  |
| `result` | `array` |  |

#### Example: Create

```php
$action_result = $client->ActionResult()->create([
    "id" => null, // string
    "slug" => null, // string
    "ok" => null, // bool
]);
```


### Contact

Create an instance: `$contact = $client->Contact();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `custom_fields` | `array` |  |
| `email` | `string` |  |
| `id` | `int` |  |

#### Example: List

```php
// list() returns an array of Contact records (throws on error).
$contacts = $client->Contact()->list();
```

#### Example: Create

```php
$contact = $client->Contact()->create([
    "id" => null, // int
]);
```


### Conversation

Create an instance: `$conversation = $client->Conversation();`

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
| `body` | `string` |  |
| `created_at` | `string` |  |
| `id` | `int` |  |
| `messages` | `array` |  |
| `session` | `string` |  |
| `status` | `string` |  |
| `user_id` | `int` |  |
| `widget_id` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Conversation record (throws on error).
$conversation = $client->Conversation()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Conversation records (throws on error).
$conversations = $client->Conversation()->list();
```

#### Example: Create

```php
$conversation = $client->Conversation()->create([
    "id" => null, // int
    "status" => null, // string
    "user_id" => null, // int
]);
```


### Credential

Create an instance: `$credential = $client->Credential();`

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

```php
// load() returns the ENTITY — call data_get() for the Credential record (throws on error).
$credential = $client->Credential()->load();
```


### Integration

Create an instance: `$integration = $client->Integration();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `array` |  |
| `auth_type` | `string` |  |
| `base_url` | `string` |  |
| `credential` | `string` |  |
| `name` | `string` |  |
| `signing_secret` | `string` |  |
| `slug` | `string` |  |
| `widget_ids` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Integration record (throws on error).
$integration = $client->Integration()->load(["id" => "integration_id"]);
```

#### Example: List

```php
// list() returns an array of Integration records (throws on error).
$integrations = $client->Integration()->list();
```

#### Example: Create

```php
$integration = $client->Integration()->create([
    "base_url" => null, // string
    "name" => null, // string
    "slug" => null, // string
]);
```


### Media

Create an instance: `$media = $client->Media();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$media = $client->Media()->create([
]);
```


### Message

Create an instance: `$message = $client->Message();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `bool` |  |
| `blocks` | `array` |  |
| `body` | `string` |  |
| `buttons` | `array` |  |
| `internal` | `bool` |  |
| `products` | `array` |  |
| `ticket_form` | `bool` |  |

#### Example: Create

```php
$message = $client->Message()->create([
]);
```


### Schema

Create an instance: `$schema = $client->Schema();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Schema record (throws on error).
$schema = $client->Schema()->load();
```


### Visitor

Create an instance: `$visitor = $client->Visitor();`

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

```php
$visitor = $client->Visitor()->create([
    "session" => null, // string
    "widget_id" => null, // int
]);
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

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
| `events` | `array` |  |
| `id` | `int` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Webhook record (throws on error).
$webhook = $client->Webhook()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Webhook records (throws on error).
$webhooks = $client->Webhook()->list();
```

#### Example: Create

```php
$webhook = $client->Webhook()->create([
    "events" => null, // array
    "id" => null, // int
    "url" => null, // string
]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── conecto_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`conecto_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$contact = $client->Contact();
$contact->list();

// $contact->data_get() now returns the contact data from the last list
// $contact->match_get() returns the last match criteria
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
