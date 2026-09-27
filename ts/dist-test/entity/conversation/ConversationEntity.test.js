"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ConversationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONECTO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ConectoSDK.test();
        const ent = testsdk.Conversation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONECTO_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'conversation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "body": { "a": true, "h": "Body", "n": "body", "r": false, "sh": "Opening message.", "t": "`$STRING`", "key$": "body", "index$": 0 }, "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": true, "sh": "Conversation id.", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": false, "sh": "Visitor-facing messages, oldest first.", "t": "`$ARRAY`", "key$": "messages", "index$": 3 }, "session": { "a": true, "h": "Session", "n": "session", "r": false, "sh": "Visitor browser session key.", "t": "`$STRING`", "key$": "session", "index$": 4 }, "status": { "a": true, "h": "Status", "n": "status", "r": true, "sh": "Lifecycle state.", "t": "`$STRING`", "key$": "status", "index$": 5 }, "widget_id": { "a": true, "h": "Widget Id", "n": "widget_id", "r": false, "sh": "Widget the conversation belongs to.", "t": "`$INTEGER`", "key$": "widget_id", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "conversation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /conversations/{id}/assign/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/conversations/{id}/assign/", "q": { "$action": "assign", "exist": ["id"] }, "r": {}, "s": [{ "lit": "conversations" }, { "var": "id" }, { "lit": "assign" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /conversations/{id}/handoff/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/conversations/{id}/handoff/", "q": { "$action": "handoff", "exist": ["id"] }, "r": {}, "s": [{ "lit": "conversations" }, { "var": "id" }, { "lit": "handoff" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /conversations/", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "idempotency_key", "or": "idempotency_key", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/conversations/", "q": { "exist": ["idempotency_key"] }, "r": {}, "s": [{ "lit": "conversations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /conversations/", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "before_id", "or": "before_id", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 25, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "session", "or": "session", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "widget_id", "or": "widget_id", "r": false, "t": "`$INTEGER`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/conversations/", "q": { "exist": ["before_id", "limit", "session", "status", "widget_id"] }, "r": {}, "s": [{ "lit": "conversations" }], "t": { "req": "`reqdata`", "res": "`body.conversations`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /conversations/{id}/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "since_id", "or": "since_id", "r": false, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/conversations/{id}/", "q": { "exist": ["id", "since_id"] }, "r": {}, "s": [{ "lit": "conversations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /conversations/{id}/messages/", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/conversations/{id}/messages/", "q": { "$action": "message", "exist": ["id"] }, "r": {}, "s": [{ "lit": "conversations" }, { "var": "id" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "conversation", "name__orig": "conversation", "Name": "Conversation", "name_": "conversation", "name-": "conversation", "NAME": "CONVERSATION", "index$": 2 }, { "active": true, "entity": "conversation", "key$": "BasicConversationFlow", "kind": "basic", "name": "BasicConversationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "conversation_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "conversation_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "conversation_ref01", "srcdatavar": "conversation_ref01_data", "suffix": "_up0", "textfield": "body" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-conversation_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "conversation_ref01", "srcdatavar": "conversation_ref01_data", "suffix": "_dt0" }, "m": { "id": "conversation01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-conversation_ref01" } }], "index$": 3 }] }, 'Conversation', { "POST /conversations/{id}/assign/": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "user_id": { "type": "integer" } }, "required": ["user_id"] } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Conversation id.", "schema": { "type": "integer" }, "index$": 0 }] }, "POST /conversations/{id}/handoff/": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Conversation id.", "schema": { "type": "integer" }, "index$": 0 }] }, "POST /conversations/": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "widget_id": { "type": "integer", "key$": "widget_id" }, "session": { "type": "string", "key$": "session" }, "body": { "type": "string", "description": "Opening message.", "key$": "body" } }, "index$": 1 } } } }, "parameters": [{ "name": "Idempotency-Key", "in": "header", "required": false, "description": "Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.", "schema": { "type": "string" }, "index$": 0 }] }, "GET /conversations/": { "protocol": "http", "parameters": [{ "name": "status", "in": "query", "required": false, "description": "Filter by lifecycle state.", "schema": { "type": "string", "enum": ["open", "pending", "closed"] }, "index$": 0 }, { "name": "widget_id", "in": "query", "required": false, "description": "Filter to one widget.", "schema": { "type": "integer" }, "index$": 1 }, { "name": "session", "in": "query", "required": false, "description": "Narrow to one visitor browser session.", "schema": { "type": "string" }, "index$": 2 }, { "name": "limit", "in": "query", "required": false, "description": "Page size. Defaults to 25.", "schema": { "type": "integer", "default": 25 }, "index$": 3 }, { "name": "before_id", "in": "query", "required": false, "description": "Return records older than this id. Take it from next_before_id in the previous response.", "schema": { "type": "integer" }, "index$": 4 }] }, "GET /conversations/{id}/": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Conversation id.", "schema": { "type": "integer" }, "index$": 0 }, { "name": "since_id", "in": "query", "required": false, "description": "Return only messages newer than this id — the cheap way to poll a thread already being tracked.", "schema": { "type": "integer" }, "index$": 1 }] }, "PATCH /conversations/{id}/messages/": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "Conversation id.", "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const conversation_ref01_ent = client.Conversation();
        let conversation_ref01_data = setup.data.new.conversation['conversation_ref01'];
        conversation_ref01_data = (await conversation_ref01_ent.create(conversation_ref01_data)).data();
        (0, node_assert_1.default)(null != conversation_ref01_data.id);
        // LIST
        const conversation_ref01_match = {};
        const conversation_ref01_list = (await conversation_ref01_ent.list(conversation_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(conversation_ref01_list, { id: conversation_ref01_data.id })));
        // UPDATE
        const conversation_ref01_data_up0 = {};
        conversation_ref01_data_up0.id = conversation_ref01_data.id;
        const conversation_ref01_markdef_up0 = { name: 'body', value: 'Mark01-conversation_ref01_' + setup.now };
        conversation_ref01_data_up0[conversation_ref01_markdef_up0.name] = conversation_ref01_markdef_up0.value;
        const conversation_ref01_resdata_up0 = (await conversation_ref01_ent.update(conversation_ref01_data_up0)).data();
        (0, node_assert_1.default)(conversation_ref01_resdata_up0.id === conversation_ref01_data_up0.id);
        (0, node_assert_1.default)(conversation_ref01_resdata_up0[conversation_ref01_markdef_up0.name] === conversation_ref01_markdef_up0.value);
        // LOAD
        const conversation_ref01_match_dt0 = {};
        conversation_ref01_match_dt0.id = conversation_ref01_data.id;
        const conversation_ref01_data_dt0 = (await conversation_ref01_ent.load(conversation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(conversation_ref01_data_dt0.id === conversation_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/conversation/ConversationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ConectoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['conversation01', 'conversation02', 'conversation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CONECTO_TEST_CONVERSATION_ENTID': idmap,
        'CONECTO_TEST_LIVE': 'FALSE',
        'CONECTO_TEST_EXPLAIN': 'FALSE',
        'CONECTO_APIKEY': '',
    });
    idmap = env['CONECTO_TEST_CONVERSATION_ENTID'];
    const live = 'TRUE' === env.CONECTO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CONECTO_TEST_CONVERSATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ConectoSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.CONECTO_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ConversationEntity.test.js.map