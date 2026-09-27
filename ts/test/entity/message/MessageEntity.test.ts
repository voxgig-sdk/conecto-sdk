

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ask_email":{"a":true,"h":"Ask Email","n":"ask_email","r":false,"sh":"Prompt the visitor for an email address.","t":"`$BOOLEAN`","key$":"ask_email","index$":0},"blocks":{"a":true,"h":"Blocks","n":"blocks","r":false,"sh":"At most 10.","t":"`$ARRAY`","key$":"blocks","index$":1},"body":{"a":true,"h":"Body","n":"body","r":false,"t":"`$STRING`","key$":"body","index$":2},"buttons":{"a":true,"h":"Buttons","n":"buttons","r":false,"t":"`$ARRAY`","key$":"buttons","index$":3},"internal":{"a":true,"h":"Internal","n":"internal","r":false,"sh":"Internal note, not shown to the visitor.","t":"`$BOOLEAN`","key$":"internal","index$":4},"products":{"a":true,"h":"Products","n":"products","r":false,"t":"`$ARRAY`","key$":"products","index$":5},"ticket_form":{"a":true,"h":"Ticket Form","n":"ticket_form","r":false,"sh":"Show the ticket form.","t":"`$BOOLEAN`","key$":"ticket_form","index$":6}},"name":"message","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /widgets/{id}/visitors/{session}/message/","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"session","or":"session","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"widget_id","or":"id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/widgets/{id}/visitors/{session}/message/","q":{"exist":["idempotency_key","session","widget_id"]},"r":{"param":{"id":"widget_id"}},"s":[{"lit":"widgets"},{"var":"widget_id"},{"lit":"visitors"},{"var":"session"},{"lit":"message"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /conversations/{id}/messages/","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"conversation_id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/conversations/{id}/messages/","q":{"exist":["conversation_id","idempotency_key"]},"r":{"param":{"id":"conversation_id"}},"s":[{"lit":"conversations"},{"var":"conversation_id"},{"lit":"messages"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.conversation"],["$.main.kit.entity.visitor"]]},"key$":"message","name__orig":"message","Name":"Message","name_":"message","name-":"message","NAME":"MESSAGE","index$":6}, {"active":true,"entity":"message","key$":"BasicMessageFlow","kind":"basic","name":"BasicMessageFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"message_ref01"},"m":{"conversation_id":"conversation01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Message', {"POST /widgets/{id}/visitors/{session}/message/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"body":{"type":"string","key$":"body"},"buttons":{"type":"array","items":{"type":"object","additionalProperties":true},"key$":"buttons"},"products":{"type":"array","items":{"type":"object","additionalProperties":true},"key$":"products"}},"index$":1}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Widget id.","schema":{"type":"integer"},"index$":0},{"name":"session","in":"path","required":true,"description":"Visitor browser session key.","schema":{"type":"string"},"index$":1},{"name":"Idempotency-Key","in":"header","required":false,"description":"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.","schema":{"type":"string"},"index$":2}]},"POST /conversations/{id}/messages/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"body":{"type":"string","key$":"body"},"blocks":{"type":"array","items":{"type":"object","description":"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.","properties":{"type":{"enum":[],"type":"string"}},"required":["type"],"additionalProperties":true,"x-ref":"#/components/schemas/Block"},"description":"At most 10.","key$":"blocks"},"buttons":{"type":"array","items":{"type":"object","additionalProperties":true},"key$":"buttons"},"ask_email":{"type":"boolean","description":"Prompt the visitor for an email address.","key$":"ask_email"},"ticket_form":{"type":"boolean","description":"Show the ticket form.","key$":"ticket_form"},"products":{"type":"array","items":{"type":"object","additionalProperties":true},"key$":"products"},"internal":{"type":"boolean","description":"Internal note, not shown to the visitor.","key$":"internal"}},"index$":1}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Conversation id.","schema":{"type":"integer"},"index$":0},{"name":"Idempotency-Key","in":"header","required":false,"description":"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.","schema":{"type":"string"},"index$":1}]}})
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
    ['message01','message02','message03','conversation01','conversation02','conversation03','visitor01','visitor02','visitor03'],
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
  
