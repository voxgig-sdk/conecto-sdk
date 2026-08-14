# Webhook entity test

require "minitest/autorun"
require "json"
require_relative "../Conecto_sdk"
require_relative "runner"

class WebhookEntityTest < Minitest::Test
  def test_create_instance
    testsdk = ConectoSDK.test(nil, nil)
    ent = testsdk.Webhook(nil)
    assert !ent.nil?
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "webhook" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = ConectoSDK.test(seed, nil)
    seen = base.Webhook(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = ConectoConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = ConectoSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Webhook(nil).stream("list", nil, nil).each do |item|
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
    setup = webhook_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "webhook." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set CONECTO_TEST_WEBHOOK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    webhook_ref01_ent = client.Webhook(nil)
    webhook_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.webhook"), "webhook_ref01"))

    webhook_ref01_data_result = webhook_ref01_ent.create(webhook_ref01_data, nil)
    webhook_ref01_data = Helpers.to_map(webhook_ref01_data_result.respond_to?(:data_get) ? webhook_ref01_data_result.data_get : webhook_ref01_data_result)
    assert !webhook_ref01_data.nil?
    assert !webhook_ref01_data["id"].nil?

    # LIST
    webhook_ref01_match = {}

    webhook_ref01_list_result = webhook_ref01_ent.list(webhook_ref01_match, nil)
    assert webhook_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(webhook_ref01_list_result),
      { "id" => webhook_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    webhook_ref01_match_dt0 = {
      "id" => webhook_ref01_data["id"],
    }
    webhook_ref01_data_dt0_loaded = webhook_ref01_ent.load(webhook_ref01_match_dt0, nil)
    webhook_ref01_data_dt0_load_result = Helpers.to_map(webhook_ref01_data_dt0_loaded.respond_to?(:data_get) ? webhook_ref01_data_dt0_loaded.data_get : webhook_ref01_data_dt0_loaded)
    assert !webhook_ref01_data_dt0_load_result.nil?
    assert_equal webhook_ref01_data_dt0_load_result["id"], webhook_ref01_data["id"]

    # REMOVE
    webhook_ref01_match_rm0 = {
      "id" => webhook_ref01_data["id"],
    }
    webhook_ref01_ent.remove(webhook_ref01_match_rm0, nil)

    # LIST
    webhook_ref01_match_rt0 = {}

    webhook_ref01_list_rt0_result = webhook_ref01_ent.list(webhook_ref01_match_rt0, nil)
    assert webhook_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(webhook_ref01_list_rt0_result),
      { "id" => webhook_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def webhook_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "webhook", "WebhookTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ConectoSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["webhook01", "webhook02", "webhook03"],
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
  entid_env_raw = ENV["CONECTO_TEST_WEBHOOK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CONECTO_TEST_WEBHOOK_ENTID" => idmap,
    "CONECTO_TEST_LIVE" => "FALSE",
    "CONECTO_TEST_EXPLAIN" => "FALSE",
    "CONECTO_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["CONECTO_TEST_WEBHOOK_ENTID"])
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
