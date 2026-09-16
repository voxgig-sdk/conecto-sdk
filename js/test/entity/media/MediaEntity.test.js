
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


describe('MediaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Media()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"media","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /media/","json":"{\"operationId\":\"createMedia\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"file\":{\"format\":\"binary\",\"type\":\"string\"}},\"required\":[\"file\"],\"type\":\"object\"}}},\"description\":\"Multipart upload, at most 10 MB.\",\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An uploaded file, addressable by URL from a block.\",\"properties\":{\"filename\":{\"type\":\"string\"},\"size\":{\"description\":\"Bytes. Maximum 10 MB on upload.\",\"type\":\"integer\"},\"url\":{\"description\":\"HTTPS URL of the stored file.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/media/","segments":[{"lit":"media"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"media","name__orig":"media","Name":"Media","name_":"media","name-":"media","NAME":"MEDIA","index$":5}, {"active":true,"entity":"media","key$":"BasicMediaFlow","kind":"basic","name":"BasicMediaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"media_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Media')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const media_ref01_ent = client.Media()
    let media_ref01_data = setup.data.new.media['media_ref01']

    media_ref01_data = (await media_ref01_ent.create(media_ref01_data)).data()
    assert(null != media_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/media/MediaTestData.json')

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
    ['media01','media02','media03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_MEDIA_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_MEDIA_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CONECTO_TEST_MEDIA_ENTID']
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
  
