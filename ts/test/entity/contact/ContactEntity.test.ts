

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


describe('ContactEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Contact()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONECTO_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'contact.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"created_at","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"custom_fields","req":false,"short":"Workspace-defined fields.","type":"`$OBJECT`","index$":1},{"active":true,"format":"email","name":"email","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"id","req":true,"short":"Contact id.","type":"`$INTEGER`","index$":3}],"id":{"field":"id","name":"id"},"name":"contact","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"idempotency_key","orig":"idempotency_key","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /contacts/","json":"{\"operationId\":\"createContact\",\"parameters\":[{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"custom_fields\":{\"additionalProperties\":true,\"type\":\"object\"},\"email\":{\"format\":\"email\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A person known to the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"custom_fields\":{\"additionalProperties\":true,\"description\":\"Workspace-defined fields.\",\"type\":\"object\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Contact id.\",\"type\":\"integer\"}},\"required\":[\"id\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/contacts/","segments":[{"lit":"contacts"}],"select":{"exist":["idempotency_key"]},"transform":{"req":"`reqdata`","res":"`body.custom_fields`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"before_id","orig":"before_id","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":25,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /contacts/","json":"{\"operationId\":\"listContacts\",\"parameters\":[{\"description\":\"Page size. Defaults to 25.\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":25,\"type\":\"integer\"}},{\"description\":\"Return records older than this id. Take it from next_before_id in the previous response.\",\"in\":\"query\",\"name\":\"before_id\",\"required\":false,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"contacts\":{\"items\":{\"description\":\"A person known to the workspace.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"custom_fields\":{\"additionalProperties\":true,\"description\":\"Workspace-defined fields.\",\"type\":\"object\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"id\":{\"description\":\"Contact id.\",\"type\":\"integer\"}},\"required\":[\"id\"],\"type\":\"object\"},\"type\":\"array\"},\"next_before_id\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/contacts/","segments":[{"lit":"contacts"}],"select":{"exist":["before_id","limit"]},"transform":{"req":"`reqdata`","res":"`body.contacts`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"contact","name__orig":"contact","Name":"Contact","name_":"contact","name-":"contact","NAME":"CONTACT","index$":1}, {"active":true,"entity":"contact","key$":"BasicContactFlow","kind":"basic","name":"BasicContactFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"contact_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"contact_ref01"}}],"index$":1}]}, 'Contact')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const contact_ref01_ent = client.Contact()
    let contact_ref01_data = setup.data.new.contact['contact_ref01']

    contact_ref01_data = (await contact_ref01_ent.create(contact_ref01_data)).data()
    assert(null != contact_ref01_data.id)


    // LIST
    const contact_ref01_match: any = {}

    const contact_ref01_list = (await contact_ref01_ent.list(contact_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(contact_ref01_list, { id: contact_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/contact/ContactTestData.json')

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
    ['contact01','contact02','contact03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_CONTACT_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_CONTACT_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_CONTACT_ENTID']
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
  
