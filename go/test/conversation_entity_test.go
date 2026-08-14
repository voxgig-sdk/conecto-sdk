package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestConversationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Conversation(nil)
		if ent == nil {
			t.Fatal("expected non-nil ConversationEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"conversation": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Conversation(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Conversation(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := conversationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "conversation." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set CONECTO_TEST_CONVERSATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		conversationRef01Ent := client.Conversation(nil)
		conversationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "conversation"}, setup.data), "conversation_ref01"))

		conversationRef01DataResult, err := conversationRef01Ent.Create(conversationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		conversationRef01Data = core.ToMapAny(entityData(conversationRef01DataResult))
		if conversationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if conversationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		conversationRef01Match := map[string]any{}

		conversationRef01ListResult, err := conversationRef01Ent.List(conversationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		conversationRef01List, conversationRef01ListOk := conversationRef01ListResult.([]any)
		if !conversationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", conversationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(conversationRef01List), map[string]any{"id": conversationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		conversationRef01DataUp0Up := map[string]any{
			"id": conversationRef01Data["id"],
		}

		conversationRef01MarkdefUp0Name := "body"
		conversationRef01MarkdefUp0Value := fmt.Sprintf("Mark01-conversation_ref01_%d", setup.now)
		conversationRef01DataUp0Up[conversationRef01MarkdefUp0Name] = conversationRef01MarkdefUp0Value

		conversationRef01ResdataUp0Result, err := conversationRef01Ent.Update(conversationRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		conversationRef01ResdataUp0 := core.ToMapAny(entityData(conversationRef01ResdataUp0Result))
		if conversationRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if conversationRef01ResdataUp0["id"] != conversationRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if conversationRef01ResdataUp0[conversationRef01MarkdefUp0Name] != conversationRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", conversationRef01MarkdefUp0Name, conversationRef01ResdataUp0[conversationRef01MarkdefUp0Name])
		}

		// LOAD
		conversationRef01MatchDt0 := map[string]any{
			"id": conversationRef01Data["id"],
		}
		conversationRef01DataDt0Loaded, err := conversationRef01Ent.Load(conversationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		conversationRef01DataDt0LoadResult := core.ToMapAny(entityData(conversationRef01DataDt0Loaded))
		if conversationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if conversationRef01DataDt0LoadResult["id"] != conversationRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func conversationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "conversation", "ConversationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read conversation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse conversation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"conversation01", "conversation02", "conversation03"},
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
	entidEnvRaw := os.Getenv("CONECTO_TEST_CONVERSATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CONECTO_TEST_CONVERSATION_ENTID": idmap,
		"CONECTO_TEST_LIVE":      "FALSE",
		"CONECTO_TEST_EXPLAIN":   "FALSE",
		"CONECTO_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CONECTO_TEST_CONVERSATION_ENTID"])
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
