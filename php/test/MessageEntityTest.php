<?php
declare(strict_types=1);

// Message entity test

require_once __DIR__ . '/../conecto_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MessageEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ConectoSDK::test(null, null);
        $ent = $testsdk->Message(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = message_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "message." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set CONECTO_TEST_MESSAGE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $message_ref01_ent = $client->Message(null);
        $message_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.message"), "message_ref01"));
        $message_ref01_data["conversation_id"] = $setup["idmap"]["conversation01"];

        $message_ref01_data_result = $message_ref01_ent->create($message_ref01_data, null);
        $message_ref01_data = Helpers::to_map(is_object($message_ref01_data_result) && method_exists($message_ref01_data_result, 'data_get') ? $message_ref01_data_result->data_get() : $message_ref01_data_result);
        $this->assertNotNull($message_ref01_data);

    }
}

function message_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/message/MessageTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ConectoSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["message01", "message02", "message03", "conversation01", "conversation02", "conversation03", "widget01", "widget02", "widget03", "visitor01", "visitor02", "visitor03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("CONECTO_TEST_MESSAGE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "CONECTO_TEST_MESSAGE_ENTID" => $idmap,
        "CONECTO_TEST_LIVE" => "FALSE",
        "CONECTO_TEST_EXPLAIN" => "FALSE",
        "CONECTO_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["CONECTO_TEST_MESSAGE_ENTID"]);
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
