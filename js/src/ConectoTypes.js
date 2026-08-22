// Typed models for the Conecto SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Action
 * @property {Object} [arguments]
 * @property {Array} [blocks]
 * @property {number} [conversation_id]
 * @property {string} [error]
 * @property {boolean} [not_found]
 * @property {boolean} ok
 * @property {Object} [result]
 */

/**
 * @typedef {Object} ActionCreateData
 * @property {string} id
 * @property {string} slug
 * @property {Object} [arguments]
 * @property {Array} [blocks]
 * @property {number} [conversation_id]
 * @property {string} [error]
 * @property {boolean} [not_found]
 * @property {boolean} ok
 * @property {Object} [result]
 */

/**
 * @typedef {Object} Contact
 * @property {string} [created_at]
 * @property {Object} [custom_fields]
 * @property {string} [email]
 * @property {number} id
 */

/**
 * @typedef {Object} ContactListMatch
 * @property {string} [created_at]
 * @property {Object} [custom_fields]
 * @property {string} [email]
 * @property {number} [id]
 */

/**
 * @typedef {Object} ContactCreateData
 * @property {string} [created_at]
 * @property {Object} [custom_fields]
 * @property {string} [email]
 * @property {number} id
 */

/**
 * @typedef {Object} Conversation
 * @property {string} [body]
 * @property {string} [created_at]
 * @property {number} id
 * @property {Array} [messages]
 * @property {string} [session]
 * @property {string} status
 * @property {number} user_id
 * @property {number} [widget_id]
 */

/**
 * @typedef {Object} ConversationLoadMatch
 * @property {number} id
 */

/**
 * @typedef {Object} ConversationListMatch
 * @property {string} [body]
 * @property {string} [created_at]
 * @property {number} [id]
 * @property {Array} [messages]
 * @property {string} [session]
 * @property {string} [status]
 * @property {number} [user_id]
 * @property {number} [widget_id]
 */

/**
 * @typedef {Object} ConversationCreateData
 * @property {string} [body]
 * @property {string} [created_at]
 * @property {number} id
 * @property {Array} [messages]
 * @property {string} [session]
 * @property {string} status
 * @property {number} user_id
 * @property {number} [widget_id]
 */

/**
 * @typedef {Object} ConversationUpdateData
 * @property {number} id
 * @property {string} [body]
 * @property {string} [created_at]
 * @property {Array} [messages]
 * @property {string} [session]
 * @property {string} [status]
 * @property {number} [user_id]
 * @property {number} [widget_id]
 */

/**
 * @typedef {Object} Credential
 * @property {number} [widget_id]
 * @property {number} [workspace_id]
 */

/**
 * @typedef {Object} CredentialLoadMatch
 * @property {number} [widget_id]
 * @property {number} [workspace_id]
 */

/**
 * @typedef {Object} Integration
 * @property {Array} [actions]
 * @property {string} [auth_type]
 * @property {string} base_url
 * @property {string} [credential]
 * @property {string} name
 * @property {string} [signing_secret]
 * @property {string} slug
 * @property {Array} [widget_ids]
 */

/**
 * @typedef {Object} IntegrationLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} IntegrationListMatch
 * @property {Array} [actions]
 * @property {string} [auth_type]
 * @property {string} [base_url]
 * @property {string} [credential]
 * @property {string} [name]
 * @property {string} [signing_secret]
 * @property {string} [slug]
 * @property {Array} [widget_ids]
 */

/**
 * @typedef {Object} IntegrationCreateData
 * @property {Array} [actions]
 * @property {string} [auth_type]
 * @property {string} base_url
 * @property {string} [credential]
 * @property {string} name
 * @property {string} [signing_secret]
 * @property {string} slug
 * @property {Array} [widget_ids]
 */

/**
 * @typedef {Object} Media
 */

/**
 * @typedef {Object} MediaCreateData
 */

/**
 * @typedef {Object} Message
 * @property {boolean} [ask_email]
 * @property {Array} [blocks]
 * @property {string} [body]
 * @property {Array} [buttons]
 * @property {boolean} [internal]
 * @property {Array} [products]
 * @property {boolean} [ticket_form]
 */

/**
 * @typedef {Object} MessageCreateData
 * @property {number} conversation_id
 * @property {boolean} [ask_email]
 * @property {Array} [blocks]
 * @property {string} [body]
 * @property {Array} [buttons]
 * @property {boolean} [internal]
 * @property {Array} [products]
 * @property {boolean} [ticket_form]
 */

/**
 * @typedef {Object} Schema
 */

/**
 * @typedef {Object} SchemaLoadMatch
 */

/**
 * @typedef {Object} Visitor
 * @property {string} [email]
 * @property {string} [name]
 */

/**
 * @typedef {Object} VisitorCreateData
 * @property {string} session
 * @property {number} widget_id
 * @property {string} [email]
 * @property {string} [name]
 */

/**
 * @typedef {Object} Webhook
 * @property {string} [created_at]
 * @property {Array} events
 * @property {number} id
 * @property {string} url
 */

/**
 * @typedef {Object} WebhookLoadMatch
 * @property {number} id
 */

/**
 * @typedef {Object} WebhookListMatch
 * @property {string} [created_at]
 * @property {Array} [events]
 * @property {number} [id]
 * @property {string} [url]
 */

/**
 * @typedef {Object} WebhookCreateData
 * @property {string} [created_at]
 * @property {Array} events
 * @property {number} id
 * @property {string} url
 */

/**
 * @typedef {Object} WebhookRemoveMatch
 * @property {number} id
 */

