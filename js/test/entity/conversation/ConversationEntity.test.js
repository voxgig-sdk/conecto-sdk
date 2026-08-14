
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { ConectoSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('ConversationEntity', async () => {

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
    'CONECTO_APIKEY': 'NONE',
  })

  idmap = env['CONECTO_TEST_CONVERSATION_ENTID']

  if ('TRUE' === env.CONECTO_TEST_LIVE) {
    client = new ConectoSDK(merge([
      {
        apikey: env.CONECTO_APIKEY,
      },
      extra
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
  
