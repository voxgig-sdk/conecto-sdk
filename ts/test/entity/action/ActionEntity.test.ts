

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"action","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /integrations/{slug}/actions/{action}/run/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"action","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/integrations/{slug}/actions/{action}/run/","q":{"$action":"run","exist":["id","slug"]},"r":{"param":{"action":"id"}},"s":[{"lit":"integrations"},{"var":"slug"},{"lit":"actions"},{"var":"id"},{"lit":"run"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.integration"]]},"key$":"action","name__orig":"action","Name":"Action","name_":"action","name-":"action","NAME":"ACTION","index$":0}, {"active":true,"entity":"action","key$":"BasicActionFlow","kind":"basic","name":"BasicActionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"action_ref01"},"m":{"action":"action01","slug":"slug01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Action', {"POST /integrations/{slug}/actions/{action}/run/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"arguments":{"type":"object","additionalProperties":true},"conversation_id":{"type":"integer"}}}}}},"parameters":[{"name":"slug","in":"path","required":true,"description":"Integration slug.","schema":{"type":"string"},"index$":0},{"name":"action","in":"path","required":true,"description":"Action name.","schema":{"type":"string"},"index$":1}]}})
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
    ['action01','action02','action03','integration01','integration02','integration03','slug01'],
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
  
