

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


describe('ActionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Action()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONECTO_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'action.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"arguments","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"blocks","req":false,"type":"`$ARRAY`","index$":1},{"active":true,"name":"conversation_id","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"error","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"not_found","req":false,"short":"A normal no-match, not an error.","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"ok","req":true,"type":"`$BOOLEAN`","index$":6},{"active":true,"name":"result","req":false,"type":"`$OBJECT`","index$":7}],"id":{"field":"id","name":"id"},"name":"action","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"action","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"POST /integrations/{slug}/actions/{action}/run/","json":"{\"operationId\":\"runIntegrationAction\",\"parameters\":[{\"description\":\"Integration slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Action name.\",\"in\":\"path\",\"name\":\"action\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"arguments\":{\"additionalProperties\":true,\"type\":\"object\"},\"conversation_id\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Result of running an integration action.\",\"properties\":{\"blocks\":{\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"error\":{\"type\":\"string\"},\"not_found\":{\"description\":\"A normal no-match, not an error.\",\"type\":\"boolean\"},\"ok\":{\"type\":\"boolean\"},\"result\":{\"additionalProperties\":true,\"type\":\"object\"}},\"required\":[\"ok\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/integrations/{slug}/actions/{action}/run/","rename":{"param":{"action":"id"}},"segments":[{"lit":"integrations"},{"var":"slug"},{"lit":"actions"},{"var":"id"},{"lit":"run"}],"select":{"$action":"run","exist":["id","slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["integration"]]},"key$":"action","name__orig":"action","Name":"Action","name_":"action","name-":"action","NAME":"ACTION","index$":0}, {"active":true,"entity":"action","key$":"BasicActionFlow","kind":"basic","name":"BasicActionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"action_ref01"},"match":{"action":"action01","slug":"slug01"},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Action')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const action_ref01_ent = client.Action()
    let action_ref01_data = setup.data.new.action['action_ref01']
    action_ref01_data['action'] = setup.idmap['action01']
    action_ref01_data['slug'] = setup.idmap['slug01']

    action_ref01_data = (await action_ref01_ent.create(action_ref01_data)).data()
    assert(null != action_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/action/ActionTestData.json')

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
    ['action01','action02','action03','integration01','integration02','integration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_ACTION_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_ACTION_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_ACTION_ENTID']
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
  
