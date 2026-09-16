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
(0, node_test_1.describe)('MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CONECTO_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CONECTO_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ConectoSDK.test();
        const ent = testsdk.Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CONECTO_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "ask_email", "req": false, "short": "Prompt the visitor for an email address.", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "blocks", "req": false, "short": "At most 10.", "type": "`$ARRAY`", "index$": 1 }, { "active": true, "name": "body", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "buttons", "req": false, "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "internal", "req": false, "short": "Internal note, not shown to the visitor.", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "products", "req": false, "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "ticket_form", "req": false, "short": "Show the ticket form.", "type": "`$BOOLEAN`", "index$": 6 }], "name": "message", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "idempotency_key", "orig": "idempotency_key", "reqd": false, "type": "`$STRING`" }], "params": [{ "active": true, "kind": "param", "name": "session", "orig": "session", "reqd": true, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "param", "name": "widget_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "POST /widgets/{id}/visitors/{session}/message/", "json": "{\"operationId\":\"messageVisitor\",\"parameters\":[{\"description\":\"Widget id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Visitor browser session key.\",\"in\":\"path\",\"name\":\"session\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"body\":{\"type\":\"string\"},\"buttons\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"products\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/widgets/{id}/visitors/{session}/message/", "rename": { "param": { "id": "widget_id" } }, "segments": [{ "lit": "widgets" }, { "var": "widget_id" }, { "lit": "visitors" }, { "var": "session" }, { "lit": "message" }], "select": { "exist": ["idempotency_key", "session", "widget_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "idempotency_key", "orig": "idempotency_key", "reqd": false, "type": "`$STRING`" }], "params": [{ "active": true, "kind": "param", "name": "conversation_id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "POST /conversations/{id}/messages/", "json": "{\"operationId\":\"createMessage\",\"parameters\":[{\"description\":\"Conversation id.\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Any UUID. Retrying a write with the same key returns 200 with the original result instead of creating a duplicate.\",\"in\":\"header\",\"name\":\"Idempotency-Key\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ask_email\":{\"description\":\"Prompt the visitor for an email address.\",\"type\":\"boolean\"},\"blocks\":{\"description\":\"At most 10.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"type\":\"string\"},\"buttons\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"products\":{\"items\":{\"additionalProperties\":true,\"type\":\"object\"},\"type\":\"array\"},\"ticket_form\":{\"description\":\"Show the ticket form.\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"A single message in a conversation.\",\"properties\":{\"blocks\":{\"description\":\"Rich content blocks. At most 10 per message.\",\"items\":{\"additionalProperties\":true,\"description\":\"One rich-content block in a message. `type` selects the shape; the documented types are image, video, embed, audio, file, cards, list, buttons, text and divider. Invalid blocks are rejected with 400 and a reason rather than dropped silently.\",\"properties\":{\"type\":{\"enum\":[\"image\",\"video\",\"embed\",\"audio\",\"file\",\"cards\",\"list\",\"buttons\",\"text\",\"divider\"],\"type\":\"string\"}},\"required\":[\"type\"],\"type\":\"object\"},\"type\":\"array\"},\"body\":{\"description\":\"Plain-text body.\",\"type\":\"string\"},\"created_at\":{\"description\":\"When the message was created.\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Message id.\",\"type\":\"integer\"},\"internal\":{\"description\":\"Internal note, not shown to the visitor.\",\"type\":\"boolean\"},\"sender\":{\"description\":\"Who sent it.\",\"examples\":[\"visitor\",\"agent\",\"bot\"],\"type\":\"string\"}},\"required\":[\"id\",\"sender\",\"body\",\"created_at\"],\"type\":\"object\"}}},\"description\":\"Created.\"}},\"security\":[{\"bearerAuth\":[]},{\"basicAuth\":[]}],\"securitySchemes\":{\"basicAuth\":{\"description\":\"Client id as username, secret as password.\",\"scheme\":\"basic\",\"type\":\"http\"},\"bearerAuth\":{\"description\":\"Authorization: Bearer <client_id>:<secret>\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/conversations/{id}/messages/", "rename": { "param": { "id": "conversation_id" } }, "segments": [{ "lit": "conversations" }, { "var": "conversation_id" }, { "lit": "messages" }], "select": { "exist": ["conversation_id", "idempotency_key"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["conversation"], ["widget", "visitor"]] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 6 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "message_ref01" }, "match": { "conversation_id": "conversation01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Message');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const message_ref01_ent = client.Message();
        let message_ref01_data = setup.data.new.message['message_ref01'];
        message_ref01_data['conversation_id'] = setup.idmap['conversation01'];
        message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data();
        (0, node_assert_1.default)(null != message_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/message/MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ConectoSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['message01', 'message02', 'message03', 'conversation01', 'conversation02', 'conversation03', 'widget01', 'widget02', 'widget03', 'visitor01', 'visitor02', 'visitor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CONECTO_TEST_MESSAGE_ENTID': idmap,
        'CONECTO_TEST_LIVE': 'FALSE',
        'CONECTO_TEST_EXPLAIN': 'FALSE',
        'CONECTO_APIKEY': '',
    });
    idmap = env['CONECTO_TEST_MESSAGE_ENTID'];
    const live = 'TRUE' === env.CONECTO_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CONECTO_TEST_MESSAGE_ENTID'];
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
//# sourceMappingURL=MessageEntity.test.js.map