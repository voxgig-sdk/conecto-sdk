

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ConectoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MessageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Message()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONECTO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'message.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ask_email","req":false,"short":"Prompt the visitor for an email address.","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"blocks","req":false,"short":"At most 10.","type":"`$ARRAY`","index$":1},{"active":true,"name":"body","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"buttons","req":false,"type":"`$ARRAY`","index$":3},{"active":true,"name":"internal","req":false,"short":"Internal note, not shown to the visitor.","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"products","req":false,"type":"`$ARRAY`","index$":5},{"active":true,"name":"ticket_form","req":false,"short":"Show the ticket form.","type":"`$BOOLEAN`","index$":6}],"name":"message","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"idempotency_key","orig":"idempotency_key","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"session","orig":"session","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"widget_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"POST /widgets/{id}/visitors/{session}/message/","json":"{\"operationId\":\"messageVisitor\",\"parameters\":[{\"description\":\"Widget id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Visitor browser session key.\",\"in\":\"path\",\"name\":\"session\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"type\":\"string\"},\"buttons\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"products\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/widgets/{id}/visitors/{session}/message/","rename":{"param":{"id":"widget_id"}},"segments":[{"lit":"widgets"},{"var":"widget_id"},{"lit":"visitors"},{"var":"session"},{"lit":"message"}],"select":{"exist":["idempotency_key","session","widget_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"idempotency_key","orig":"idempotency_key","reqd":false,"type":"`$STRING`"}],"params":[{"active":true,"kind":"param","name":"conversation_id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"POST /conversations/{id}/messages/","json":"{\"operationId\":\"createMessage\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ask_email\":{\"description\":\"Prompt the visitor for an email address.\",\"type\":\"boolean\"},\"blocks\":{\"description\":\"At most 10.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"type\":\"string\"},\"buttons\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"products\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"ticket_form\":{\"description\":\"Show the ticket form.\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/conversations/{id}/messages/","rename":{"param":{"id":"conversation_id"}},"segments":[{"lit":"conversations"},{"var":"conversation_id"},{"lit":"messages"}],"select":{"exist":["conversation_id","idempotency_key"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["conversation"],["widget","visitor"]]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":6}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"message_ref01"},"match":{"conversation_id":"conversation01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Message')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const message_ref01_ent = client.Message()
    let message_ref01_data = setup.data.new.message['message_ref01']
    message_ref01_data['conversation_id'] = setup.idmap['conversation01']

    message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data()
    assert(null != message_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/message/MessageTestData.json')

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
    ['message01','message02','message03','conversation01','conversation02','conversation03','widget01','widget02','widget03','visitor01','visitor02','visitor03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_MESSAGE_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_MESSAGE_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_MESSAGE_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
