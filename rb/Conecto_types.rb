# frozen_string_literal: true

# Typed models for the Conecto SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ActionResult entity data model.
#
# @!attribute [rw] arguments
#   @return [Hash, nil]
#
# @!attribute [rw] blocks
#   @return [Array, nil]
#
# @!attribute [rw] conversation_id
#   @return [Integer, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] not_found
#   @return [Boolean, nil]
#
# @!attribute [rw] ok
#   @return [Boolean]
#
# @!attribute [rw] result
#   @return [Hash, nil]
ActionResult = Struct.new(
  :arguments,
  :blocks,
  :conversation_id,
  :error,
  :not_found,
  :ok,
  :result,
  keyword_init: true
)

# Request payload for ActionResult#create.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] arguments
#   @return [Hash, nil]
#
# @!attribute [rw] blocks
#   @return [Array, nil]
#
# @!attribute [rw] conversation_id
#   @return [Integer, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] not_found
#   @return [Boolean, nil]
#
# @!attribute [rw] ok
#   @return [Boolean]
#
# @!attribute [rw] result
#   @return [Hash, nil]
ActionResultCreateData = Struct.new(
  :id,
  :slug,
  :arguments,
  :blocks,
  :conversation_id,
  :error,
  :not_found,
  :ok,
  :result,
  keyword_init: true
)

# Contact entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] custom_fields
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
Contact = Struct.new(
  :created_at,
  :custom_fields,
  :email,
  :id,
  keyword_init: true
)

# Request payload for Contact#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] custom_fields
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
ContactListMatch = Struct.new(
  :created_at,
  :custom_fields,
  :email,
  :id,
  keyword_init: true
)

# Request payload for Contact#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] custom_fields
#   @return [Hash, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
ContactCreateData = Struct.new(
  :created_at,
  :custom_fields,
  :email,
  :id,
  keyword_init: true
)

# Conversation entity data model.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [Integer]
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
Conversation = Struct.new(
  :body,
  :created_at,
  :id,
  :messages,
  :session,
  :status,
  :user_id,
  :widget_id,
  keyword_init: true
)

# Request payload for Conversation#load.
#
# @!attribute [rw] id
#   @return [Integer]
ConversationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Conversation#list.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
ConversationListMatch = Struct.new(
  :body,
  :created_at,
  :id,
  :messages,
  :session,
  :status,
  :user_id,
  :widget_id,
  keyword_init: true
)

# Request payload for Conversation#create.
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String]
#
# @!attribute [rw] user_id
#   @return [Integer]
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
ConversationCreateData = Struct.new(
  :body,
  :created_at,
  :id,
  :messages,
  :session,
  :status,
  :user_id,
  :widget_id,
  keyword_init: true
)

# Request payload for Conversation#update.
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
ConversationUpdateData = Struct.new(
  :id,
  :body,
  :created_at,
  :messages,
  :session,
  :status,
  :user_id,
  :widget_id,
  keyword_init: true
)

# Credential entity data model.
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
#
# @!attribute [rw] workspace_id
#   @return [Integer, nil]
Credential = Struct.new(
  :widget_id,
  :workspace_id,
  keyword_init: true
)

# Request payload for Credential#load.
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
#
# @!attribute [rw] workspace_id
#   @return [Integer, nil]
CredentialLoadMatch = Struct.new(
  :widget_id,
  :workspace_id,
  keyword_init: true
)

# Integration entity data model.
#
# @!attribute [rw] actions
#   @return [Array, nil]
#
# @!attribute [rw] auth_type
#   @return [String, nil]
#
# @!attribute [rw] base_url
#   @return [String]
#
# @!attribute [rw] credential
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] signing_secret
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] widget_ids
#   @return [Array, nil]
Integration = Struct.new(
  :actions,
  :auth_type,
  :base_url,
  :credential,
  :name,
  :signing_secret,
  :slug,
  :widget_ids,
  keyword_init: true
)

# Request payload for Integration#load.
#
# @!attribute [rw] id
#   @return [String]
IntegrationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Integration#list.
#
# @!attribute [rw] actions
#   @return [Array, nil]
#
# @!attribute [rw] auth_type
#   @return [String, nil]
#
# @!attribute [rw] base_url
#   @return [String, nil]
#
# @!attribute [rw] credential
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] signing_secret
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String, nil]
#
# @!attribute [rw] widget_ids
#   @return [Array, nil]
IntegrationListMatch = Struct.new(
  :actions,
  :auth_type,
  :base_url,
  :credential,
  :name,
  :signing_secret,
  :slug,
  :widget_ids,
  keyword_init: true
)

# Request payload for Integration#create.
#
# @!attribute [rw] actions
#   @return [Array, nil]
#
# @!attribute [rw] auth_type
#   @return [String, nil]
#
# @!attribute [rw] base_url
#   @return [String]
#
# @!attribute [rw] credential
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] signing_secret
#   @return [String, nil]
#
# @!attribute [rw] slug
#   @return [String]
#
# @!attribute [rw] widget_ids
#   @return [Array, nil]
IntegrationCreateData = Struct.new(
  :actions,
  :auth_type,
  :base_url,
  :credential,
  :name,
  :signing_secret,
  :slug,
  :widget_ids,
  keyword_init: true
)

# Media entity data model.
class Media
end

# Request payload for Media#create.
class MediaCreateData
end

# Message entity data model.
#
# @!attribute [rw] ask_email
#   @return [Boolean, nil]
#
# @!attribute [rw] blocks
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] buttons
#   @return [Array, nil]
#
# @!attribute [rw] internal
#   @return [Boolean, nil]
#
# @!attribute [rw] products
#   @return [Array, nil]
#
# @!attribute [rw] ticket_form
#   @return [Boolean, nil]
Message = Struct.new(
  :ask_email,
  :blocks,
  :body,
  :buttons,
  :internal,
  :products,
  :ticket_form,
  keyword_init: true
)

# Request payload for Message#create.
#
# @!attribute [rw] session
#   @return [String, nil]
#
# @!attribute [rw] widget_id
#   @return [Integer, nil]
#
# @!attribute [rw] conversation_id
#   @return [Integer, nil]
#
# @!attribute [rw] ask_email
#   @return [Boolean, nil]
#
# @!attribute [rw] blocks
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] buttons
#   @return [Array, nil]
#
# @!attribute [rw] internal
#   @return [Boolean, nil]
#
# @!attribute [rw] products
#   @return [Array, nil]
#
# @!attribute [rw] ticket_form
#   @return [Boolean, nil]
MessageCreateData = Struct.new(
  :session,
  :widget_id,
  :conversation_id,
  :ask_email,
  :blocks,
  :body,
  :buttons,
  :internal,
  :products,
  :ticket_form,
  keyword_init: true
)

# Schema entity data model.
class Schema
end

# Request payload for Schema#load.
class SchemaLoadMatch
end

# Visitor entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Visitor = Struct.new(
  :email,
  :name,
  keyword_init: true
)

# Request payload for Visitor#create.
#
# @!attribute [rw] session
#   @return [String]
#
# @!attribute [rw] widget_id
#   @return [Integer]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
VisitorCreateData = Struct.new(
  :session,
  :widget_id,
  :email,
  :name,
  keyword_init: true
)

# Webhook entity data model.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] url
#   @return [String]
Webhook = Struct.new(
  :created_at,
  :events,
  :id,
  :url,
  keyword_init: true
)

# Request payload for Webhook#load.
#
# @!attribute [rw] id
#   @return [Integer]
WebhookLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Webhook#list.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] events
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
WebhookListMatch = Struct.new(
  :created_at,
  :events,
  :id,
  :url,
  keyword_init: true
)

# Request payload for Webhook#create.
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] events
#   @return [Array]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] url
#   @return [String]
WebhookCreateData = Struct.new(
  :created_at,
  :events,
  :id,
  :url,
  keyword_init: true
)

# Request payload for Webhook#remove.
#
# @!attribute [rw] id
#   @return [Integer]
WebhookRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

