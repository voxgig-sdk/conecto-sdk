
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')


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


describe('ConversationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Conversation()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const conversation_ref01_ent = client.Conversation()
    let conversation_ref01_data = setup.data.new.conversation['conversation_ref01']

    conversation_ref01_data = (await conversation_ref01_ent.create(conversation_ref01_data)).data()
    assert(null != conversation_ref01_data.id)


    // LIST
    const conversation_ref01_match = {}

    const conversation_ref01_list = (await conversation_ref01_ent.list(conversation_ref01_match)).map((e) => e.data())

    assert(!isempty(select(conversation_ref01_list, { id: conversation_ref01_data.id })))


    // UPDATE
    const conversation_ref01_data_up0 = {}
    conversation_ref01_data_up0.id = conversation_ref01_data.id

    const conversation_ref01_markdef_up0 = { name: 'body', value: 'Mark01-conversation_ref01_' + setup.now }
    conversation_ref01_data_up0 [conversation_ref01_markdef_up0.name] = conversation_ref01_markdef_up0.value

    const conversation_ref01_resdata_up0 = (await conversation_ref01_ent.update(conversation_ref01_data_up0)).data()
    assert(conversation_ref01_resdata_up0.id === conversation_ref01_data_up0.id)

    assert(conversation_ref01_resdata_up0[conversation_ref01_markdef_up0.name] === conversation_ref01_markdef_up0.value)


    // LOAD
    const conversation_ref01_match_dt0 = {}
    conversation_ref01_match_dt0.id = conversation_ref01_data.id
    const conversation_ref01_data_dt0 = (await conversation_ref01_ent.load(conversation_ref01_match_dt0)).data()
    assert(conversation_ref01_data_dt0.id === conversation_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/conversation/ConversationTestData.json')

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
    ['conversation01','conversation02','conversation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CONECTO_TEST_CONVERSATION_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': '',
  })

  idmap = env['CONECTO_TEST_CONVERSATION_ENTID']

  if ('TRUE' === env.CONECTO_TEST_LIVE) {
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
      extra || {}
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
    now: Date.now(),
  }

  return setup
}
  
