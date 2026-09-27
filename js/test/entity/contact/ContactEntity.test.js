
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

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"t":"`$STRING`","key$":"created_at","index$":0},"custom_fields":{"a":true,"h":"Custom Fields","n":"custom_fields","r":false,"sh":"Workspace-defined fields.","t":"`$OBJECT`","key$":"custom_fields","index$":1},"email":{"a":true,"fo":"email","h":"Email","n":"email","r":false,"t":"`$STRING`","key$":"email","index$":2},"id":{"a":true,"h":"Id","n":"id","r":true,"sh":"Contact id.","t":"`$INTEGER`","key$":"id","index$":3}},"id":{"field":"id","name":"id"},"name":"contact","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /contacts/","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"idempotency_key","or":"idempotency_key","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/contacts/","q":{"exist":["idempotency_key"]},"r":{},"s":[{"lit":"contacts"}],"t":{"req":"`reqdata`","res":"`body.custom_fields`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /contacts/","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"before_id","or":"before_id","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":25,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/contacts/","q":{"exist":["before_id","limit"]},"r":{},"s":[{"lit":"contacts"}],"t":{"req":"`reqdata`","res":"`body.contacts`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"contact","name__orig":"contact","Name":"Contact","name_":"contact","name-":"contact","NAME":"CONTACT","index$":1}, {"active":true,"entity":"contact","key$":"BasicContactFlow","kind":"basic","name":"BasicContactFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"contact_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"contact_ref01"}}],"index$":1}]}, 'Contact', {"POST /contacts/":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email","key$":"email"},"custom_fields":{"type":"object","additionalProperties":true,"key$":"custom_fields"}},"index$":1}}}},"parameters":[{"name":"Idempotency-Key","in":"header","required":false,"description":"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.","schema":{"type":"string"},"index$":0}]},"GET /contacts/":{"protocol":"http","parameters":[{"name":"limit","in":"query","required":false,"description":"Page size. Defaults to 25.","schema":{"type":"integer","default":25},"index$":0},{"name":"before_id","in":"query","required":false,"description":"Return records older than this id. Take it from next_before_id in the previous response.","schema":{"type":"integer"},"index$":1}]}})
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
    const contact_ref01_match = {}

    const contact_ref01_list = (await contact_ref01_ent.list(contact_ref01_match)).map((e) => e.data())

    assert(!isempty(select(contact_ref01_list, { id: contact_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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
  
