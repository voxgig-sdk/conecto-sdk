
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { ConectoSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('ConversationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Conversation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"body","req":false,"short":"Opening message.","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"id","req":true,"short":"Conversation id.","type":"`$INTEGER`","index$":2},{"active":true,"name":"messages","req":false,"short":"Visitor-facing messages, oldest first.","type":"`$ARRAY`","index$":3},{"active":true,"name":"session","req":false,"short":"Visitor browser session key.","type":"`$STRING`","index$":4},{"active":true,"name":"status","req":true,"short":"Lifecycle state.","type":"`$STRING`","index$":5},{"active":true,"name":"user_id","req":true,"type":"`$INTEGER`","index$":6},{"active":true,"name":"widget_id","req":false,"short":"Widget the conversation belongs to.","type":"`$INTEGER`","index$":7}],"id":{"field":"id","name":"id"},"name":"conversation","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`"}]},"contract":{"id":"POST /conversations/{id}/assign/","json":"{\"operationId\":\"assignConversation\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"user_id\":{\"type\":\"integer\"}},\"required\":[\"user_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/conversations/{id}/assign/","segments":[{"lit":"conversations"},{"var":"id"},{"lit":"assign"}],"select":{"$action":"assign","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`"}]},"contract":{"id":"POST /conversations/{id}/handoff/","json":"{\"operationId\":\"handoffConversation\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/conversations/{id}/handoff/","segments":[{"lit":"conversations"},{"var":"id"},{"lit":"handoff"}],"select":{"$action":"handoff","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"idempotency_key","orig":"idempotency_key","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /conversations/","json":"{\"operationId\":\"createConversation\",\"parameters\":[{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"description\":\"Opening message.\",\"type\":\"string\"},\"session\":{\"type\":\"string\"},\"widget_id\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/conversations/","segments":[{"lit":"conversations"}],"select":{"exist":["idempotency_key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"before_id","orig":"before_id","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":25,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"session","orig":"session","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"widget_id","orig":"widget_id","reqd":false,"type":"`$INTEGER`","index$":4}]},"contract":{"id":"GET /conversations/","json":"{\"operationId\":\"listConversations\",\"parameters\":[{\"description\":\"Filter by lifecycle state.\",\"in\":\"query\",\"name\":\"status\",\"required\":false,\"schema\":{\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"}},{\"description\":\"Filter to one widget.\",\"in\":\"query\",\"name\":\"widget_id\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Narrow to one visitor browser session.\",\"in\":\"query\",\"name\":\"session\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Page size. Defaults to 25.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":25,\"type\":\"integer\"}},{\"description\":\"Return records older than this id. Take it from next_before_id in the previous response.\",\"in\":\"query\",\"name\":\"before_id\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"conversations\":{\"items\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"},\"type\":\"array\"},\"next_before_id\":{\"description\":\"Pass as before_id to fetch the next page.\",\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/conversations/","segments":[{"lit":"conversations"}],"select":{"exist":["before_id","limit","session","status","widget_id"]},"transform":{"req":"`reqdata`","res":"`body.conversations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"since_id","orig":"since_id","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /conversations/{id}/","json":"{\"operationId\":\"getConversation\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Return only messages newer than this id — the cheap way to poll a thread already being tracked.\",\"in\":\"query\",\"name\":\"since_id\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/conversations/{id}/","segments":[{"lit":"conversations"},{"var":"id"}],"select":{"exist":["id","since_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"PATCH /conversations/{id}/messages/","json":"{\"operationId\":\"closeConversation\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A conversation between a visitor and the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Conversation id.\",\"type\":\"integer\"},\"messages\":{\"description\":\"Visitor-facing messages, oldest first.\",\"items\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"},\"type\":\"array\"},\"session\":{\"description\":\"Visitor browser session key.\",\"type\":\"string\"},\"status\":{\"description\":\"Lifecycle state.\",\"enum\":[\"open\",\"pending\",\"closed\"],\"type\":\"string\"},\"widget_id\":{\"description\":\"Widget the conversation belongs to.\",\"type\":\"integer\"}},\"required\":[\"id\",\"status\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/conversations/{id}/messages/","segments":[{"lit":"conversations"},{"var":"id"},{"lit":"messages"}],"select":{"$action":"message","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"conversation","name__orig":"conversation","Name":"Conversation","name_":"conversation","name-":"conversation","NAME":"CONVERSATION","index$":2}, {"active":true,"entity":"conversation","key$":"BasicConversationFlow","kind":"basic","name":"BasicConversationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"conversation_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"conversation_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"conversation_ref01","srcdatavar":"conversation_ref01_data","suffix":"_up0","textfield":"body"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-conversation_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"conversation_ref01","srcdatavar":"conversation_ref01_data","suffix":"_dt0"},"match":{"id":"conversation01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-conversation_ref01"}}],"index$":3}]}, 'Conversation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const conversation_ref01_ent = client.Conversation()
    let conversation_ref01_data = setup.data.new.conversation['conversation_ref01']

    conversation_ref01_data = (await conversation_ref01_ent.create(conversation_ref01_data)).data()
    assert(null != conversation_ref01_data.id)


    // LIST
    const conversation_ref01_match = {}

    const conversation_ref01_list = (await conversation_ref01_ent.list(conversation_ref01_match)).map((e) => e.data())

    assert(!isempty(select(conversation_ref01_list, { id: conversation_ref01_data.id })))


    // UPDATE
    const conversation_ref01_data_up0 = {}
    conversation_ref01_data_up0.id = conversation_ref01_data.id

    const conversation_ref01_markdef_up0 = { name: 'body', value: 'Mark01-conversation_ref01_' + setup.now }
    conversation_ref01_data_up0 [conversation_ref01_markdef_up0.name] = conversation_ref01_markdef_up0.value

    const conversation_ref01_resdata_up0 = (await conversation_ref01_ent.update(conversation_ref01_data_up0)).data()
    assert(conversation_ref01_resdata_up0.id === conversation_ref01_data_up0.id)

    assert(conversation_ref01_resdata_up0[conversation_ref01_markdef_up0.name] === conversation_ref01_markdef_up0.value)


    // LOAD
    const conversation_ref01_match_dt0 = {}
    conversation_ref01_match_dt0.id = conversation_ref01_data.id
    const conversation_ref01_data_dt0 = (await conversation_ref01_ent.load(conversation_ref01_match_dt0)).data()
    assert(conversation_ref01_data_dt0.id === conversation_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/conversation/ConversationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ConectoSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['conversation01','conversation02','conversation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_CONVERSATION_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_CONVERSATION_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_CONVERSATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ConectoSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.CONECTO_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CONECTO_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
