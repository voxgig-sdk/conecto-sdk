-- Typed models for the Conecto SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ActionResult
---@field arguments? table
---@field blocks? table
---@field conversation_id? number
---@field error? string
---@field not_found? boolean
---@field ok boolean
---@field result? table

---@class ActionResultCreateData
---@field id string
---@field slug string
---@field arguments? table
---@field blocks? table
---@field conversation_id? number
---@field error? string
---@field not_found? boolean
---@field ok boolean
---@field result? table

---@class Contact
---@field created_at? string
---@field custom_fields? table
---@field email? string
---@field id number

---@class ContactListMatch
---@field created_at? string
---@field custom_fields? table
---@field email? string
---@field id? number

---@class ContactCreateData
---@field created_at? string
---@field custom_fields? table
---@field email? string
---@field id number

---@class Conversation
---@field body? string
---@field created_at? string
---@field id number
---@field messages? table
---@field session? string
---@field status string
---@field user_id number
---@field widget_id? number

---@class ConversationLoadMatch
---@field id number

---@class ConversationListMatch
---@field body? string
---@field created_at? string
---@field id? number
---@field messages? table
---@field session? string
---@field status? string
---@field user_id? number
---@field widget_id? number

---@class ConversationCreateData
---@field body? string
---@field created_at? string
---@field id number
---@field messages? table
---@field session? string
---@field status string
---@field user_id number
---@field widget_id? number

---@class ConversationUpdateData
---@field id number
---@field body? string
---@field created_at? string
---@field messages? table
---@field session? string
---@field status? string
---@field user_id? number
---@field widget_id? number

---@class Credential
---@field widget_id? number
---@field workspace_id? number

---@class CredentialLoadMatch
---@field widget_id? number
---@field workspace_id? number

---@class Integration
---@field actions? table
---@field auth_type? string
---@field base_url string
---@field credential? string
---@field name string
---@field signing_secret? string
---@field slug string
---@field widget_ids? table

---@class IntegrationLoadMatch
---@field id string

---@class IntegrationListMatch
---@field actions? table
---@field auth_type? string
---@field base_url? string
---@field credential? string
---@field name? string
---@field signing_secret? string
---@field slug? string
---@field widget_ids? table

---@class IntegrationCreateData
---@field actions? table
---@field auth_type? string
---@field base_url string
---@field credential? string
---@field name string
---@field signing_secret? string
---@field slug string
---@field widget_ids? table

---@class Media

---@class MediaCreateData

---@class Message
---@field ask_email? boolean
---@field blocks? table
---@field body? string
---@field buttons? table
---@field internal? boolean
---@field products? table
---@field ticket_form? boolean

---@class MessageCreateData
---@field session? string
---@field widget_id? number
---@field conversation_id? number
---@field ask_email? boolean
---@field blocks? table
---@field body? string
---@field buttons? table
---@field internal? boolean
---@field products? table
---@field ticket_form? boolean

---@class Schema

---@class SchemaLoadMatch

---@class Visitor
---@field email? string
---@field name? string

---@class VisitorCreateData
---@field session string
---@field widget_id number
---@field email? string
---@field name? string

---@class Webhook
---@field created_at? string
---@field events table
---@field id number
---@field url string

---@class WebhookLoadMatch
---@field id number

---@class WebhookListMatch
---@field created_at? string
---@field events? table
---@field id? number
---@field url? string

---@class WebhookCreateData
---@field created_at? string
---@field events table
---@field id number
---@field url string

---@class WebhookRemoveMatch
---@field id number

local M = {}

return M
