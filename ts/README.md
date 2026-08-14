# Conecto TypeScript SDK



The TypeScript SDK for the Conecto API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ActionResult()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/conecto-sdk/releases](https://github.com/voxgig-sdk/conecto-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ConectoSDK } from '@voxgig-sdk/conecto'

const client = new ConectoSDK({
  apikey: process.env.CONECTO_APIKEY,
})
```

### 4. Create, update, and remove

```ts
// Create — returns the created ActionResult ENTITY (.data() for the record)
const created = await client.ActionResult().create({
  id: 'example_id',
  slug: 'example_slug',
  ok: true,
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const contacts = await client.Contact().list()
  console.log(contacts)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ConectoSDK.test()

const contact = await client.Contact().list()
// contact is the entity, populated with mock response data
// — call contact.data() for the record itself
console.log(contact)
```

You can also use the instance method:

```ts
const client = new ConectoSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Contact()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ConectoSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### ConectoSDK

#### Constructor

```ts
new ConectoSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ActionResult(data?)` | `ActionResultEntity` | Create an ActionResult entity instance. |
| `Contact(data?)` | `ContactEntity` | Create a Contact entity instance. |
| `Conversation(data?)` | `ConversationEntity` | Create a Conversation entity instance. |
| `Credential(data?)` | `CredentialEntity` | Create a Credential entity instance. |
| `Integration(data?)` | `IntegrationEntity` | Create an Integration entity instance. |
| `Media(data?)` | `MediaEntity` | Create a Media entity instance. |
| `Message(data?)` | `MessageEntity` | Create a Message entity instance. |
| `Schema(data?)` | `SchemaEntity` | Create a Schema entity instance. |
| `Visitor(data?)` | `VisitorEntity` | Create a Visitor entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `tester(testopts?, sdkopts?)` | `ConectoSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ConectoSDK.test(testopts?, sdkopts?)` | `ConectoSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ConectoSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create.

API path: `/integrations/{slug}/actions/{action}/run/`

#### Contact

| Field | Description |
| --- | --- |
| `created_at` |  |
| `custom_fields` |  |
| `email` |  |
| `id` |  |

Operations: create, list.

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

Operations: create, list, load, update.

API path: `/conversations/{id}/assign/`

#### Credential

| Field | Description |
| --- | --- |
| `widget_id` |  |
| `workspace_id` |  |

Operations: load.

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

Operations: create, list, load.

API path: `/integrations/{slug}/install/`

#### Media

| Field | Description |
| --- | --- |

Operations: create.

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

Operations: create.

API path: `/widgets/{id}/visitors/{session}/message/`

#### Schema

| Field | Description |
| --- | --- |

Operations: load.

API path: `/schema/`

#### Visitor

| Field | Description |
| --- | --- |
| `email` |  |
| `name` |  |

Operations: create.

API path: `/widgets/{id}/visitors/{session}/identify/`

#### Webhook

| Field | Description |
| --- | --- |
| `created_at` |  |
| `events` |  |
| `id` |  |
| `url` |  |

Operations: create, list, load, remove.

API path: `/webhooks/`



## Entities


### ActionResult

Create an instance: `const action_result = client.ActionResult()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arguments` | `Record<string, any>` |  |
| `blocks` | `any[]` |  |
| `conversation_id` | `number` |  |
| `error` | `string` |  |
| `not_found` | `boolean` |  |
| `ok` | `boolean` |  |
| `result` | `Record<string, any>` |  |

#### Example: Create

```ts
const action_result = await client.ActionResult().create({
  id: 'example_id',
  slug: 'example_slug',
  ok: true,
})
```


### Contact

Create an instance: `const contact = client.Contact()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `custom_fields` | `Record<string, any>` |  |
| `email` | `string` |  |
| `id` | `number` |  |

#### Example: List

```ts
const contacts = await client.Contact().list()
```

#### Example: Create

```ts
const contact = await client.Contact().create({
  id: 1,
})
```


### Conversation

Create an instance: `const conversation = client.Conversation()`

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
| `id` | `number` |  |
| `messages` | `any[]` |  |
| `session` | `string` |  |
| `status` | `string` |  |
| `user_id` | `number` |  |
| `widget_id` | `number` |  |

#### Example: Load

```ts
const conversation = await client.Conversation().load({ id: 1 })
```

#### Example: List

```ts
const conversations = await client.Conversation().list()
```

#### Example: Create

```ts
const conversation = await client.Conversation().create({
  id: 1,
  status: 'example_status',
  user_id: 1,
})
```


### Credential

Create an instance: `const credential = client.Credential()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `widget_id` | `number` |  |
| `workspace_id` | `number` |  |

#### Example: Load

```ts
const credential = await client.Credential().load()
```


### Integration

Create an instance: `const integration = client.Integration()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `any[]` |  |
| `auth_type` | `string` |  |
| `base_url` | `string` |  |
| `credential` | `string` |  |
| `name` | `string` |  |
| `signing_secret` | `string` |  |
| `slug` | `string` |  |
| `widget_ids` | `any[]` |  |

#### Example: Load

```ts
const integration = await client.Integration().load({ id: 'integration_id' })
```

#### Example: List

```ts
const integrations = await client.Integration().list()
```

#### Example: Create

```ts
const integration = await client.Integration().create({
  base_url: 'example_base_url',
  name: 'example_name',
  slug: 'example_slug',
})
```


### Media

Create an instance: `const media = client.Media()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const media = await client.Media().create({
})
```


### Message

Create an instance: `const message = client.Message()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ask_email` | `boolean` |  |
| `blocks` | `any[]` |  |
| `body` | `string` |  |
| `buttons` | `any[]` |  |
| `internal` | `boolean` |  |
| `products` | `any[]` |  |
| `ticket_form` | `boolean` |  |

#### Example: Create

```ts
const message = await client.Message().create({
})
```


### Schema

Create an instance: `const schema = client.Schema()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const schema = await client.Schema().load()
```


### Visitor

Create an instance: `const visitor = client.Visitor()`

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

```ts
const visitor = await client.Visitor().create({
  session: 'example_session',
  widget_id: 1,
})
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

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
| `events` | `any[]` |  |
| `id` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const webhook = await client.Webhook().load({ id: 1 })
```

#### Example: List

```ts
const webhooks = await client.Webhook().list()
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  events: [],
  id: 1,
  url: 'example_url',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
conecto/
├── src/
│   ├── ConectoSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ConectoSDK } from '@voxgig-sdk/conecto'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const contact = client.Contact()
await contact.list()

// contact.data() now returns the contact data from the last `list`
// contact.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
