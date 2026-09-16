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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WebhookEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONECTO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ConectoSDK.test();
        const ent = testsdk.Webhook();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONECTO_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'webhook.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "created_at", "req": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "events", "req": true, "short": "Event names subscribed to.", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "id", "req": true, "short": "Webhook id.", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "format": "uri", "name": "url", "req": true, "short": "HTTPS endpoint that receives the event POST.", "type": "`$STRING`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "webhook", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /webhooks/", "json": "{\"operationId\":\"createWebhook\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"events\":{\"description\":\"e.g. message.created, conversation.created.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"url\":{\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\",\"events\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An HTTP endpoint subscribed to workspace events.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"events\":{\"description\":\"Event names subscribed to.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Webhook id.\",\"type\":\"integer\"},\"url\":{\"description\":\"HTTPS endpoint that receives the event POST.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"url\",\"events\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/webhooks/", "segments": [{ "lit": "webhooks" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /webhooks/", "json": "{\"operationId\":\"listWebhooks\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"webhooks\":{\"items\":{\"description\":\"An HTTP endpoint subscribed to workspace events.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"events\":{\"description\":\"Event names subscribed to.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Webhook id.\",\"type\":\"integer\"},\"url\":{\"description\":\"HTTPS endpoint that receives the event POST.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"url\",\"events\"],\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/webhooks/", "segments": [{ "lit": "webhooks" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body.webhooks`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /webhooks/{id}/", "json": "{\"operationId\":\"getWebhook\",\"parameters\":[{\"description\":\"Webhook id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"An HTTP endpoint subscribed to workspace events.\",\"properties\":{\"created_at\":{\"format\":\"date-time\",\"type\":\"string\"},\"events\":{\"description\":\"Event names subscribed to.\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"Webhook id.\",\"type\":\"integer\"},\"url\":{\"description\":\"HTTPS endpoint that receives the event POST.\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"url\",\"events\"],\"type\":\"object\"}}},\"description\":\"Success.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/webhooks/{id}/", "segments": [{ "lit": "webhooks" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "DELETE /webhooks/{id}/", "json": "{\"operationId\":\"deleteWebhook\",\"parameters\":[{\"description\":\"Webhook id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/webhooks/{id}/", "segments": [{ "lit": "webhooks" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "webhook", "name__orig": "webhook", "Name": "Webhook", "name_": "webhook", "name-": "webhook", "NAME": "WEBHOOK", "index$": 9 }, { "active": true, "entity": "webhook", "key$": "BasicWebhookFlow", "kind": "basic", "name": "BasicWebhookFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "webhook_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "webhook_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "webhook_ref01", "srcdatavar": "webhook_ref01_data", "suffix": "_dt0" }, "match": { "id": "webhook01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-webhook_ref01" } }], "index$": 2 }, { "active": true, "data": {}, "input": { "ref": "webhook_ref01", "suffix": "_rm0" }, "match": { "id": "webhook01" }, "op": "remove", "spec": [], "valid": [], "index$": 3 }, { "active": true, "data": {}, "input": { "suffix": "_rt0" }, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemNotExists", "def": { "ref": "webhook_ref01" } }], "index$": 4 }] }, 'Webhook');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const webhook_ref01_ent = client.Webhook();
        let webhook_ref01_data = setup.data.new.webhook['webhook_ref01'];
        webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data();
        (0, node_assert_1.default)(null != webhook_ref01_data.id);
        // LIST
        const webhook_ref01_match = {};
        const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })));
        // LOAD
        const webhook_ref01_match_dt0 = {};
        webhook_ref01_match_dt0.id = webhook_ref01_data.id;
        const webhook_ref01_data_dt0 = (await webhook_ref01_ent.load(webhook_ref01_match_dt0)).data();
        (0, node_assert_1.default)(webhook_ref01_data_dt0.id === webhook_ref01_data.id);
        // REMOVE
        const webhook_ref01_match_rm0 = { id: webhook_ref01_data.id };
        await webhook_ref01_ent.remove(webhook_ref01_match_rm0);
        // LIST
        const webhook_ref01_match_rt0 = {};
        const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/webhook/WebhookTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ConectoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['webhook01', 'webhook02', 'webhook03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CONECTO_TEST_WEBHOOK_ENTID': idmap,
        'CONECTO_TEST_LIVE': 'FALSE',
        'CONECTO_TEST_EXPLAIN': 'FALSE',
        'CONECTO_APIKEY': '',
    });
    idmap = env['CONECTO_TEST_WEBHOOK_ENTID'];
    const live = 'TRUE' === env.CONECTO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CONECTO_TEST_WEBHOOK_ENTID'];
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
//# sourceMappingURL=WebhookEntity.test.js.map