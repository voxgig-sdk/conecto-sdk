# Conversation entity test

require "minitest/autorun"
require "json"
require_relative "../Conecto_sdk"
require_relative "runner"

class ConversationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ConectoSDK.test(nil, nil)
    ent = testsdk.Conversation(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "conversation" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ConectoSDK.test(seed, nil)
    seen = base.Conversation(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ConectoConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ConectoSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Conversation(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  def test_basic_flow
    setup = conversation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "conversation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CONECTO_TEST_CONVERSATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    conversation_ref01_ent = client.Conversation(nil)
    conversation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.conversation"), "conversation_ref01"))

    conversation_ref01_data_result = conversation_ref01_ent.create(conversation_ref01_data, nil)
    conversation_ref01_data = Helpers.to_map(conversation_ref01_data_result.respond_to?(:data_get) ? conversation_ref01_data_result.data_get : conversation_ref01_data_result)
    assert !conversation_ref01_data.nil?
    assert !conversation_ref01_data["id"].nil?

    # LIST
    conversation_ref01_match = {}

    conversation_ref01_list_result = conversation_ref01_ent.list(conversation_ref01_match, nil)
    assert conversation_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(conversation_ref01_list_result),
      { "id" => conversation_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # UPDATE
    conversation_ref01_data_up0_up = {
      "id" => conversation_ref01_data["id"],
    }

    conversation_ref01_markdef_up0_name = "body"
    conversation_ref01_markdef_up0_value = "Mark01-conversation_ref01_#{setup[:now]}"
    conversation_ref01_data_up0_up[conversation_ref01_markdef_up0_name] = conversation_ref01_markdef_up0_value

    conversation_ref01_resdata_up0_result = conversation_ref01_ent.update(conversation_ref01_data_up0_up, nil)
    conversation_ref01_resdata_up0 = Helpers.to_map(conversation_ref01_resdata_up0_result.respond_to?(:data_get) ? conversation_ref01_resdata_up0_result.data_get : conversation_ref01_resdata_up0_result)
    assert !conversation_ref01_resdata_up0.nil?
    assert_equal conversation_ref01_resdata_up0["id"], conversation_ref01_data_up0_up["id"]
    assert_equal conversation_ref01_resdata_up0[conversation_ref01_markdef_up0_name], conversation_ref01_markdef_up0_value

    # LOAD
    conversation_ref01_match_dt0 = {
      "id" => conversation_ref01_data["id"],
    }
    conversation_ref01_data_dt0_loaded = conversation_ref01_ent.load(conversation_ref01_match_dt0, nil)
    conversation_ref01_data_dt0_load_result = Helpers.to_map(conversation_ref01_data_dt0_loaded.respond_to?(:data_get) ? conversation_ref01_data_dt0_loaded.data_get : conversation_ref01_data_dt0_loaded)
    assert !conversation_ref01_data_dt0_load_result.nil?
    assert_equal conversation_ref01_data_dt0_load_result["id"], conversation_ref01_data["id"]

  end
end

def conversation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "conversation", "ConversationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ConectoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["conversation01", "conversation02", "conversation03"],
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
  entid_env_raw = ENV["CONECTO_TEST_CONVERSATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CONECTO_TEST_CONVERSATION_ENTID" => idmap,
    "CONECTO_TEST_LIVE" => "FALSE",
    "CONECTO_TEST_EXPLAIN" => "FALSE",
    "CONECTO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CONECTO_TEST_CONVERSATION_ENTID"])
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
