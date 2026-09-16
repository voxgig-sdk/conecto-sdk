

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"actions","req":false,"short":"Actions this integration exposes.","type":"`$ARRAY`","index$":0},{"active":true,"name":"auth_type","req":false,"short":"How Conecto authenticates to base_url.","type":"`$STRING`","index$":1},{"active":true,"format":"uri","name":"base_url","req":true,"short":"Root URL Conecto POSTs actions to.","type":"`$STRING`","index$":2},{"active":true,"name":"credential","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"name","req":true,"short":"Human-readable name.","type":"`$STRING`","index$":5},{"active":true,"name":"signing_secret","req":false,"short":"Secret used to sign action calls.","type":"`$STRING`","index$":6},{"active":true,"name":"slug","req":true,"short":"Stable identifier, used in the path.","type":"`$STRING`","index$":7},{"active":true,"name":"widget_ids","req":false,"type":"`$ARRAY`","index$":8}],"id":{"field":"id","name":"id"},"name":"integration","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /integrations/{slug}/install/","json":"{\"operationId\":\"installIntegration\",\"parameters\":[{\"description\":\"Integration slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"actions\":{\"description\":\"Allowlist of action names.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"widget_ids\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A custom integration the AI agent can call.\",\"properties\":{\"actions\":{\"description\":\"Actions this integration exposes.\",\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"description\":\"How Conecto authenticates to base_url.\",\"type\":\"string\"},\"base_url\":{\"description\":\"Root URL Conecto POSTs actions to.\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable name.\",\"type\":\"string\"},\"signing_secret\":{\"description\":\"Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.\",\"type\":\"string\"},\"slug\":{\"description\":\"Stable identifier, used in the path.\",\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/integrations/{slug}/install/","segments":[{"lit":"integrations"},{"var":"slug"},{"lit":"install"}],"select":{"$action":"install","exist":["slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"slug","orig":"slug","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /integrations/{slug}/rotate_signing_secret/","json":"{\"operationId\":\"rotateIntegrationSigningSecret\",\"parameters\":[{\"description\":\"Integration slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A custom integration the AI agent can call.\",\"properties\":{\"actions\":{\"description\":\"Actions this integration exposes.\",\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"description\":\"How Conecto authenticates to base_url.\",\"type\":\"string\"},\"base_url\":{\"description\":\"Root URL Conecto POSTs actions to.\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable name.\",\"type\":\"string\"},\"signing_secret\":{\"description\":\"Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.\",\"type\":\"string\"},\"slug\":{\"description\":\"Stable identifier, used in the path.\",\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/integrations/{slug}/rotate_signing_secret/","segments":[{"lit":"integrations"},{"var":"slug"},{"lit":"rotate_signing_secret"}],"select":{"$action":"rotate_signing_secret","exist":["slug"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{},"contract":{"id":"POST /integrations/","json":"{\"operationId\":\"createIntegration\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"actions\":{\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"type\":\"string\"},\"base_url\":{\"format\":\"uri\",\"type\":\"string\"},\"credential\":{\"type\":\"string\"},\"name\":{\"type\":\"string\"},\"slug\":{\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A custom integration the AI agent can call.\",\"properties\":{\"actions\":{\"description\":\"Actions this integration exposes.\",\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"description\":\"How Conecto authenticates to base_url.\",\"type\":\"string\"},\"base_url\":{\"description\":\"Root URL Conecto POSTs actions to.\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable name.\",\"type\":\"string\"},\"signing_secret\":{\"description\":\"Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.\",\"type\":\"string\"},\"slug\":{\"description\":\"Stable identifier, used in the path.\",\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"}}},\"description\":\"Created. The response carries signing_secret.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/integrations/","segments":[{"lit":"integrations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /integrations/","json":"{\"operationId\":\"listIntegrations\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"integrations\":{\"items\":{\"description\":\"A custom integration the AI agent can call.\",\"properties\":{\"actions\":{\"description\":\"Actions this integration exposes.\",\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"description\":\"How Conecto authenticates to base_url.\",\"type\":\"string\"},\"base_url\":{\"description\":\"Root URL Conecto POSTs actions to.\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable name.\",\"type\":\"string\"},\"signing_secret\":{\"description\":\"Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.\",\"type\":\"string\"},\"slug\":{\"description\":\"Stable identifier, used in the path.\",\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/integrations/","segments":[{"lit":"integrations"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.integrations`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"slug","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /integrations/{slug}/","json":"{\"operationId\":\"getIntegration\",\"parameters\":[{\"description\":\"Integration slug.\",\"in\":\"path\",\"name\":\"slug\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A custom integration the AI agent can call.\",\"properties\":{\"actions\":{\"description\":\"Actions this integration exposes.\",\"items\":{\"description\":\"One callable action on an integration.\",\"properties\":{\"name\":{\"description\":\"Action name, e.g. orders.get_status.\",\"type\":\"string\"},\"path\":{\"description\":\"Path appended to base_url.\",\"type\":\"string\"},\"risk\":{\"description\":\"Identity requirement. public_read needs no identity; verified_read requires a verified visitor email; write is a mutation on a verified account and is never silently retried.\",\"enum\":[\"public_read\",\"verified_read\",\"public_write\",\"write\"],\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"auth_type\":{\"description\":\"How Conecto authenticates to base_url.\",\"type\":\"string\"},\"base_url\":{\"description\":\"Root URL Conecto POSTs actions to.\",\"format\":\"uri\",\"type\":\"string\"},\"name\":{\"description\":\"Human-readable name.\",\"type\":\"string\"},\"signing_secret\":{\"description\":\"Secret used to sign action calls. Returned on create and on read, and replaced by rotate_signing_secret.\",\"type\":\"string\"},\"slug\":{\"description\":\"Stable identifier, used in the path.\",\"type\":\"string\"}},\"required\":[\"slug\",\"name\",\"base_url\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/integrations/{slug}/","rename":{"param":{"slug":"id"}},"segments":[{"lit":"integrations"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["integration"]]},"key$":"integration","name__orig":"integration","Name":"Integration","name_":"integration","name-":"integration","NAME":"INTEGRATION","index$":4}, {"active":true,"entity":"integration","key$":"BasicIntegrationFlow","kind":"basic","name":"BasicIntegrationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"integration_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"integration_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"integration_ref01","srcdatavar":"integration_ref01_data","suffix":"_dt0"},"match":{"id":"integration01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-integration_ref01"}}],"index$":2}]}, 'Integration')
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
    ['integration01','integration02','integration03','integration01','integration02','integration03'],
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
  
