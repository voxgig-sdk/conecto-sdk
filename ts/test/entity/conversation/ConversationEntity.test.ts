
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ConectoSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ConversationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
  afterEach(liveDelay('CONECTO_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ConectoSDK.test()
    const ent = testsdk.Conversation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CONECTO_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'conversation.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set CONECTO_TEST_CONVERSATION_ENTID JSON to run live')
      return
    }
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
    const conversation_ref01_match: any = {}

    const conversation_ref01_list = (await conversation_ref01_ent.list(conversation_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(conversation_ref01_list, { id: conversation_ref01_data.id })))


    // UPDATE
    const conversation_ref01_data_up0: any = {}
    conversation_ref01_data_up0.id = conversation_ref01_data.id

    const conversation_ref01_markdef_up0 = { name: 'body', value: 'Mark01-conversation_ref01_' + setup.now }
    ;(conversation_ref01_data_up0 as any)[conversation_ref01_markdef_up0.name] = conversation_ref01_markdef_up0.value

    const conversation_ref01_resdata_up0 = (await conversation_ref01_ent.update(conversation_ref01_data_up0)).data()
    assert(conversation_ref01_resdata_up0.id === conversation_ref01_data_up0.id)

    assert((conversation_ref01_resdata_up0 as any)[conversation_ref01_markdef_up0.name] === conversation_ref01_markdef_up0.value)


    // LOAD
    const conversation_ref01_match_dt0: any = {}
    conversation_ref01_match_dt0.id = conversation_ref01_data.id
    const conversation_ref01_data_dt0 = (await conversation_ref01_ent.load(conversation_ref01_match_dt0)).data()
    assert(conversation_ref01_data_dt0.id === conversation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['CONECTO_TEST_CONVERSATION_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'CONECTO_TEST_CONVERSATION_ENTID': idmap,
    'CONECTO_TEST_LIVE': 'FALSE',
    'CONECTO_TEST_EXPLAIN': 'FALSE',
    'CONECTO_APIKEY': 'NONE',
  })

  idmap = env['CONECTO_TEST_CONVERSATION_ENTID']

  const live = 'TRUE' === env.CONECTO_TEST_LIVE

  if (live) {
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
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
