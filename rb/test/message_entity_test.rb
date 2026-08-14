# Message entity test

require "minitest/autorun"
require "json"
require_relative "../Conecto_sdk"
require_relative "runner"

class MessageEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ConectoSDK.test(nil, nil)
    ent = testsdk.Message(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = message_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "message." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CONECTO_TEST_MESSAGE_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    message_ref01_ent = client.Message(nil)
    message_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.message"), "message_ref01"))
    message_ref01_data["conversation_id"] = setup[:idmap]["conversation01"]

    message_ref01_data_result = message_ref01_ent.create(message_ref01_data, nil)
    message_ref01_data = Helpers.to_map(message_ref01_data_result.respond_to?(:data_get) ? message_ref01_data_result.data_get : message_ref01_data_result)
    assert !message_ref01_data.nil?

  end
end

def message_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "message", "MessageTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ConectoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["message01", "message02", "message03", "conversation01", "conversation02", "conversation03", "widget01", "widget02", "widget03", "visitor01", "visitor02", "visitor03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["CONECTO_TEST_MESSAGE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CONECTO_TEST_MESSAGE_ENTID" => idmap,
    "CONECTO_TEST_LIVE" => "FALSE",
    "CONECTO_TEST_EXPLAIN" => "FALSE",
    "CONECTO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CONECTO_TEST_MESSAGE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CONECTO_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["CONECTO_APIKEY"],
      },
      extra || {},
    ])
    client = ConectoSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CONECTO_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CONECTO_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
