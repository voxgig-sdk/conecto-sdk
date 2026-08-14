// Typed models for the Conecto SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/conecto-sdk/go/core"
)

// ActionResult is the typed data model for the action_result entity.
type ActionResult struct {
	Arguments *map[string]any `json:"arguments,omitempty"`
	Blocks *[]any `json:"blocks,omitempty"`
	ConversationId *int `json:"conversation_id,omitempty"`
	Error *string `json:"error,omitempty"`
	NotFound *bool `json:"not_found,omitempty"`
	Ok bool `json:"ok"`
	Result *map[string]any `json:"result,omitempty"`
}

// ActionResultCreateData is the typed request payload for ActionResult.CreateTyped.
type ActionResultCreateData struct {
	Id string `json:"id"`
	Slug string `json:"slug"`
	Arguments *map[string]any `json:"arguments,omitempty"`
	Blocks *[]any `json:"blocks,omitempty"`
	ConversationId *int `json:"conversation_id,omitempty"`
	Error *string `json:"error,omitempty"`
	NotFound *bool `json:"not_found,omitempty"`
	Ok bool `json:"ok"`
	Result *map[string]any `json:"result,omitempty"`
}

// Contact is the typed data model for the contact entity.
type Contact struct {
	CreatedAt *string `json:"created_at,omitempty"`
	CustomFields *map[string]any `json:"custom_fields,omitempty"`
	Email *string `json:"email,omitempty"`
	Id int `json:"id"`
}

// ContactListMatch is the typed request payload for Contact.ListTyped.
type ContactListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	CustomFields *map[string]any `json:"custom_fields,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
}

// ContactCreateData is the typed request payload for Contact.CreateTyped.
type ContactCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	CustomFields *map[string]any `json:"custom_fields,omitempty"`
	Email *string `json:"email,omitempty"`
	Id int `json:"id"`
}

// Conversation is the typed data model for the conversation entity.
type Conversation struct {
	Body *string `json:"body,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id int `json:"id"`
	Messages *[]any `json:"messages,omitempty"`
	Session *string `json:"session,omitempty"`
	Status string `json:"status"`
	UserId int `json:"user_id"`
	WidgetId *int `json:"widget_id,omitempty"`
}

// ConversationLoadMatch is the typed request payload for Conversation.LoadTyped.
type ConversationLoadMatch struct {
	Id int `json:"id"`
}

// ConversationListMatch is the typed request payload for Conversation.ListTyped.
type ConversationListMatch struct {
	Body *string `json:"body,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id *int `json:"id,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Session *string `json:"session,omitempty"`
	Status *string `json:"status,omitempty"`
	UserId *int `json:"user_id,omitempty"`
	WidgetId *int `json:"widget_id,omitempty"`
}

// ConversationCreateData is the typed request payload for Conversation.CreateTyped.
type ConversationCreateData struct {
	Body *string `json:"body,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Id int `json:"id"`
	Messages *[]any `json:"messages,omitempty"`
	Session *string `json:"session,omitempty"`
	Status string `json:"status"`
	UserId int `json:"user_id"`
	WidgetId *int `json:"widget_id,omitempty"`
}

// ConversationUpdateData is the typed request payload for Conversation.UpdateTyped.
type ConversationUpdateData struct {
	Id int `json:"id"`
	Body *string `json:"body,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Session *string `json:"session,omitempty"`
	Status *string `json:"status,omitempty"`
	UserId *int `json:"user_id,omitempty"`
	WidgetId *int `json:"widget_id,omitempty"`
}

// Credential is the typed data model for the credential entity.
type Credential struct {
	WidgetId *int `json:"widget_id,omitempty"`
	WorkspaceId *int `json:"workspace_id,omitempty"`
}

// CredentialLoadMatch is the typed request payload for Credential.LoadTyped.
type CredentialLoadMatch struct {
	WidgetId *int `json:"widget_id,omitempty"`
	WorkspaceId *int `json:"workspace_id,omitempty"`
}

// Integration is the typed data model for the integration entity.
type Integration struct {
	Actions *[]any `json:"actions,omitempty"`
	AuthType *string `json:"auth_type,omitempty"`
	BaseUrl string `json:"base_url"`
	Credential *string `json:"credential,omitempty"`
	Name string `json:"name"`
	SigningSecret *string `json:"signing_secret,omitempty"`
	Slug string `json:"slug"`
	WidgetIds *[]any `json:"widget_ids,omitempty"`
}

// IntegrationLoadMatch is the typed request payload for Integration.LoadTyped.
type IntegrationLoadMatch struct {
	Id string `json:"id"`
}

// IntegrationListMatch is the typed request payload for Integration.ListTyped.
type IntegrationListMatch struct {
	Actions *[]any `json:"actions,omitempty"`
	AuthType *string `json:"auth_type,omitempty"`
	BaseUrl *string `json:"base_url,omitempty"`
	Credential *string `json:"credential,omitempty"`
	Name *string `json:"name,omitempty"`
	SigningSecret *string `json:"signing_secret,omitempty"`
	Slug *string `json:"slug,omitempty"`
	WidgetIds *[]any `json:"widget_ids,omitempty"`
}

// IntegrationCreateData is the typed request payload for Integration.CreateTyped.
type IntegrationCreateData struct {
	Actions *[]any `json:"actions,omitempty"`
	AuthType *string `json:"auth_type,omitempty"`
	BaseUrl string `json:"base_url"`
	Credential *string `json:"credential,omitempty"`
	Name string `json:"name"`
	SigningSecret *string `json:"signing_secret,omitempty"`
	Slug string `json:"slug"`
	WidgetIds *[]any `json:"widget_ids,omitempty"`
}

// Media is the typed data model for the media entity.
type Media struct {
}

// MediaCreateData is the typed request payload for Media.CreateTyped.
type MediaCreateData struct {
}

// Message is the typed data model for the message entity.
type Message struct {
	AskEmail *bool `json:"ask_email,omitempty"`
	Blocks *[]any `json:"blocks,omitempty"`
	Body *string `json:"body,omitempty"`
	Buttons *[]any `json:"buttons,omitempty"`
	Internal *bool `json:"internal,omitempty"`
	Products *[]any `json:"products,omitempty"`
	TicketForm *bool `json:"ticket_form,omitempty"`
}

// MessageCreateData is the typed request payload for Message.CreateTyped.
type MessageCreateData struct {
	Session *string `json:"session,omitempty"`
	WidgetId *int `json:"widget_id,omitempty"`
	ConversationId *int `json:"conversation_id,omitempty"`
	AskEmail *bool `json:"ask_email,omitempty"`
	Blocks *[]any `json:"blocks,omitempty"`
	Body *string `json:"body,omitempty"`
	Buttons *[]any `json:"buttons,omitempty"`
	Internal *bool `json:"internal,omitempty"`
	Products *[]any `json:"products,omitempty"`
	TicketForm *bool `json:"ticket_form,omitempty"`
}

// Schema is the typed data model for the schema entity.
type Schema struct {
}

// SchemaLoadMatch is the typed request payload for Schema.LoadTyped.
type SchemaLoadMatch struct {
}

// Visitor is the typed data model for the visitor entity.
type Visitor struct {
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
}

// VisitorCreateData is the typed request payload for Visitor.CreateTyped.
type VisitorCreateData struct {
	Session string `json:"session"`
	WidgetId int `json:"widget_id"`
	Email *string `json:"email,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Events []any `json:"events"`
	Id int `json:"id"`
	Url string `json:"url"`
}

// WebhookLoadMatch is the typed request payload for Webhook.LoadTyped.
type WebhookLoadMatch struct {
	Id int `json:"id"`
}

// WebhookListMatch is the typed request payload for Webhook.ListTyped.
type WebhookListMatch struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Events *[]any `json:"events,omitempty"`
	Id *int `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	CreatedAt *string `json:"created_at,omitempty"`
	Events []any `json:"events"`
	Id int `json:"id"`
	Url string `json:"url"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
