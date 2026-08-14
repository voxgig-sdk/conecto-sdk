package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/conecto-sdk/go"
	"github.com/voxgig-sdk/conecto-sdk/go/core"

	vs "github.com/voxgig-sdk/conecto-sdk/go/utility/struct"
)

func TestActionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Action(nil)
		if ent == nil {
			t.Fatal("expected non-nil ActionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := actionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "action." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CONECTO_TEST_ACTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		actionRef01Ent := client.Action(nil)
		actionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "action"}, setup.data), "action_ref01"))
		actionRef01Data["action"] = setup.idmap["action01"]
		actionRef01Data["slug"] = setup.idmap["slug01"]

		actionRef01DataResult, err := actionRef01Ent.Create(actionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		actionRef01Data = core.ToMapAny(entityData(actionRef01DataResult))
		if actionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func actionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "action", "ActionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read action test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse action test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"action01", "action02", "action03", "integration01", "integration02", "integration03", "slug01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CONECTO_TEST_ACTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CONECTO_TEST_ACTION_ENTID": idmap,
		"CONECTO_TEST_LIVE":      "FALSE",
		"CONECTO_TEST_EXPLAIN":   "FALSE",
		"CONECTO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CONECTO_TEST_ACTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CONECTO_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CONECTO_APIKEY"],
			},
			extra,
		})
		client = sdk.NewConectoSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CONECTO_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CONECTO_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
