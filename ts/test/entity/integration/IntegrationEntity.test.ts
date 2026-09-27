

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


describe('IntegrationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Integration()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONECTO_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'integration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actions":{"a":true,"h":"Actions","n":"actions","r":false,"sh":"Actions this integration exposes.","t":"`$ARRAY`","key$":"actions","index$":0},"auth_type":{"a":true,"h":"Auth Type","n":"auth_type","r":false,"sh":"How Conecto authenticates to base_url.","t":"`$STRING`","key$":"auth_type","index$":1},"base_url":{"a":true,"fo":"uri","h":"Base Url","n":"base_url","r":true,"sh":"Root URL Conecto POSTs actions to.","t":"`$STRING`","key$":"base_url","index$":2},"credential":{"a":true,"h":"Credential","n":"credential","r":false,"t":"`$STRING`","key$":"credential","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Human-readable name.","t":"`$STRING`","key$":"name","index$":5},"signing_secret":{"a":true,"h":"Signing Secret","n":"signing_secret","r":false,"sh":"Secret used to sign action calls.","t":"`$STRING`","key$":"signing_secret","index$":6},"slug":{"a":true,"h":"Slug","n":"slug","r":true,"sh":"Stable identifier, used in the path.","t":"`$STRING`","key$":"slug","index$":7}},"id":{"field":"id","name":"id"},"name":"integration","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /integrations/{slug}/install/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/integrations/{slug}/install/","q":{"$action":"install","exist":["slug"]},"r":{},"s":[{"lit":"integrations"},{"var":"slug"},{"lit":"install"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /integrations/{slug}/rotate_signing_secret/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"slug","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/integrations/{slug}/rotate_signing_secret/","q":{"$action":"rotate_signing_secret","exist":["slug"]},"r":{},"s":[{"lit":"integrations"},{"var":"slug"},{"lit":"rotate_signing_secret"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /integrations/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/integrations/","q":{},"r":{},"s":[{"lit":"integrations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /integrations/","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/integrations/","q":{},"r":{},"s":[{"lit":"integrations"}],"t":{"req":"`reqdata`","res":"`body.integrations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /integrations/{slug}/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"slug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/integrations/{slug}/","q":{"exist":["id"]},"r":{"param":{"slug":"id"}},"s":[{"lit":"integrations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"integration","name__orig":"integration","Name":"Integration","name_":"integration","name-":"integration","NAME":"INTEGRATION","index$":4}, {"active":true,"entity":"integration","key$":"BasicIntegrationFlow","kind":"basic","name":"BasicIntegrationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"integration_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"integration_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"integration_ref01","srcdatavar":"integration_ref01_data","suffix":"_dt0"},"m":{"id":"integration01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-integration_ref01"}}],"index$":2}]}, 'Integration', {"POST /integrations/{slug}/install/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"widget_ids":{"type":"array","items":{"type":"integer"}},"actions":{"type":"array","items":{"type":"string"},"description":"Allowlist of action names."}}}}}},"parameters":[{"name":"slug","in":"path","required":true,"description":"Integration slug.","schema":{"type":"string"},"index$":0}]},"POST /integrations/{slug}/rotate_signing_secret/":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Integration slug.","schema":{"type":"string"},"index$":0}]},"POST /integrations/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"slug":{"type":"string","key$":"slug"},"name":{"type":"string","key$":"name"},"base_url":{"type":"string","format":"uri","key$":"base_url"},"auth_type":{"type":"string","key$":"auth_type"},"credential":{"type":"string","key$":"credential"},"actions":{"type":"array","items":{"type":"object","description":"One callable action on an integration.","properties":{"name":{"description":"Action name, e.g. orders.get_status.","type":"string"},"path":{"description":"Path appended to base_url.","type":"string"},"risk":{"description":"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.","enum":[],"type":"string"}},"required":["name"],"x-ref":"#/components/schemas/IntegrationAction"},"key$":"actions"}},"required":["slug","name","base_url"],"index$":1}}}},"parameters":[]},"GET /integrations/":{"protocol":"http","parameters":[]},"GET /integrations/{slug}/":{"protocol":"http","parameters":[{"name":"slug","in":"path","required":true,"description":"Integration slug.","schema":{"type":"string"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const integration_ref01_ent = client.Integration()
    let integration_ref01_data = setup.data.new.integration['integration_ref01']

    integration_ref01_data = (await integration_ref01_ent.create(integration_ref01_data)).data()
    assert(null != integration_ref01_data.id)


    // LIST
    const integration_ref01_match: any = {}

    const integration_ref01_list = (await integration_ref01_ent.list(integration_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(integration_ref01_list, { id: integration_ref01_data.id })))


    // LOAD
    const integration_ref01_match_dt0: any = {}
    integration_ref01_match_dt0.id = integration_ref01_data.id
    const integration_ref01_data_dt0 = (await integration_ref01_ent.load(integration_ref01_match_dt0)).data()
    assert(integration_ref01_data_dt0.id === integration_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/integration/IntegrationTestData.json')

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
    ['integration01','integration02','integration03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_INTEGRATION_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_INTEGRATION_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_INTEGRATION_ENTID']
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
  
