
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


describe('VisitorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Visitor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"visitor","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /widgets/{id}/visitors/{session}/identify/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"session","or":"session","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"widget_id","or":"id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/widgets/{id}/visitors/{session}/identify/","q":{"$action":"identify","exist":["session","widget_id"]},"r":{"param":{"id":"widget_id"}},"s":[{"lit":"widgets"},{"var":"widget_id"},{"lit":"visitors"},{"var":"session"},{"lit":"identify"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /widgets/{id}/visitors/{session}/unverify/","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"session","or":"session","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"widget_id","or":"id","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/widgets/{id}/visitors/{session}/unverify/","q":{"$action":"unverify","exist":["session","widget_id"]},"r":{"param":{"id":"widget_id"}},"s":[{"lit":"widgets"},{"var":"widget_id"},{"lit":"visitors"},{"var":"session"},{"lit":"unverify"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"visitor","name__orig":"visitor","Name":"Visitor","name_":"visitor","name-":"visitor","NAME":"VISITOR","index$":8}, {"active":true,"entity":"visitor","key$":"BasicVisitorFlow","kind":"basic","name":"BasicVisitorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"visitor_ref01"},"m":{"session":"session01","widget_id":"widget01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Visitor', {"POST /widgets/{id}/visitors/{session}/identify/":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","format":"email"},"name":{"type":"string"}}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Widget id.","schema":{"type":"integer"},"index$":0},{"name":"session","in":"path","required":true,"description":"Visitor browser session key.","schema":{"type":"string"},"index$":1}]},"POST /widgets/{id}/visitors/{session}/unverify/":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"Widget id.","schema":{"type":"integer"},"index$":0},{"name":"session","in":"path","required":true,"description":"Visitor browser session key.","schema":{"type":"string"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const visitor_ref01_ent = client.Visitor()
    let visitor_ref01_data = setup.data.new.visitor['visitor_ref01']
    visitor_ref01_data['session'] = setup.idmap['session01']
    visitor_ref01_data['widget_id'] = setup.idmap['widget01']

    visitor_ref01_data = (await visitor_ref01_ent.create(visitor_ref01_data)).data()
    assert(null != visitor_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/visitor/VisitorTestData.json')

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
    ['visitor01','visitor02','visitor03','session01','widget01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_VISITOR_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_VISITOR_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_VISITOR_ENTID']
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
  
