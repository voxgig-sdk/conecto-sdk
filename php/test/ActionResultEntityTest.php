<?php
declare(strict_types=1);

// ActionResult entity test

require_once __DIR__ . '/../conecto_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ActionResultEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ConectoSDK::test(null, null);
        $ent = $testsdk->ActionResult(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = action_result_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "action_result." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CONECTO_TEST_ACTION_RESULT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $action_result_ref01_ent = $client->ActionResult(null);
        $action_result_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.action_result"), "action_result_ref01"));
        $action_result_ref01_data["action"] = $setup["idmap"]["action01"];
        $action_result_ref01_data["slug"] = $setup["idmap"]["slug01"];

        $action_result_ref01_data_result = $action_result_ref01_ent->create($action_result_ref01_data, null);
        $action_result_ref01_data = Helpers::to_map(is_object($action_result_ref01_data_result) && method_exists($action_result_ref01_data_result, 'data_get') ? $action_result_ref01_data_result->data_get() : $action_result_ref01_data_result);
        $this->assertNotNull($action_result_ref01_data);

    }
}

function action_result_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/action_result/ActionResultTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ConectoSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["action_result01", "action_result02", "action_result03", "integration01", "integration02", "integration03", "action01", "slug01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CONECTO_TEST_ACTION_RESULT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CONECTO_TEST_ACTION_RESULT_ENTID" => $idmap,
        "CONECTO_TEST_LIVE" => "FALSE",
        "CONECTO_TEST_EXPLAIN" => "FALSE",
        "CONECTO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CONECTO_TEST_ACTION_RESULT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["CONECTO_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["CONECTO_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ConectoSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["CONECTO_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["CONECTO_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
