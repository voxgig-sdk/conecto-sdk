<?php
declare(strict_types=1);

// Typed models for the Conecto SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ActionResult entity data model. */
class ActionResult
{
    public ?array $arguments = null;
    public ?array $blocks = null;
    public ?int $conversation_id = null;
    public ?string $error = null;
    public ?bool $not_found = null;
    public bool $ok;
    public ?array $result = null;
}

/** Request payload for ActionResult#create. */
class ActionResultCreateData
{
    public string $id;
    public string $slug;
    public ?array $arguments = null;
    public ?array $blocks = null;
    public ?int $conversation_id = null;
    public ?string $error = null;
    public ?bool $not_found = null;
    public bool $ok;
    public ?array $result = null;
}

/** Contact entity data model. */
class Contact
{
    public ?string $created_at = null;
    public ?array $custom_fields = null;
    public ?string $email = null;
    public int $id;
}

/** Request payload for Contact#list. */
class ContactListMatch
{
    public ?string $created_at = null;
    public ?array $custom_fields = null;
    public ?string $email = null;
    public ?int $id = null;
}

/** Request payload for Contact#create. */
class ContactCreateData
{
    public ?string $created_at = null;
    public ?array $custom_fields = null;
    public ?string $email = null;
    public int $id;
}

/** Conversation entity data model. */
class Conversation
{
    public ?string $body = null;
    public ?string $created_at = null;
    public int $id;
    public ?array $messages = null;
    public ?string $session = null;
    public string $status;
    public int $user_id;
    public ?int $widget_id = null;
}

/** Request payload for Conversation#load. */
class ConversationLoadMatch
{
    public int $id;
}

/** Request payload for Conversation#list. */
class ConversationListMatch
{
    public ?string $body = null;
    public ?string $created_at = null;
    public ?int $id = null;
    public ?array $messages = null;
    public ?string $session = null;
    public ?string $status = null;
    public ?int $user_id = null;
    public ?int $widget_id = null;
}

/** Request payload for Conversation#create. */
class ConversationCreateData
{
    public ?string $body = null;
    public ?string $created_at = null;
    public int $id;
    public ?array $messages = null;
    public ?string $session = null;
    public string $status;
    public int $user_id;
    public ?int $widget_id = null;
}

/** Request payload for Conversation#update. */
class ConversationUpdateData
{
    public int $id;
    public ?string $body = null;
    public ?string $created_at = null;
    public ?array $messages = null;
    public ?string $session = null;
    public ?string $status = null;
    public ?int $user_id = null;
    public ?int $widget_id = null;
}

/** Credential entity data model. */
class Credential
{
    public ?int $widget_id = null;
    public ?int $workspace_id = null;
}

/** Request payload for Credential#load. */
class CredentialLoadMatch
{
    public ?int $widget_id = null;
    public ?int $workspace_id = null;
}

/** Integration entity data model. */
class Integration
{
    public ?array $actions = null;
    public ?string $auth_type = null;
    public string $base_url;
    public ?string $credential = null;
    public string $name;
    public ?string $signing_secret = null;
    public string $slug;
    public ?array $widget_ids = null;
}

/** Request payload for Integration#load. */
class IntegrationLoadMatch
{
    public string $id;
}

/** Request payload for Integration#list. */
class IntegrationListMatch
{
    public ?array $actions = null;
    public ?string $auth_type = null;
    public ?string $base_url = null;
    public ?string $credential = null;
    public ?string $name = null;
    public ?string $signing_secret = null;
    public ?string $slug = null;
    public ?array $widget_ids = null;
}

/** Request payload for Integration#create. */
class IntegrationCreateData
{
    public ?array $actions = null;
    public ?string $auth_type = null;
    public string $base_url;
    public ?string $credential = null;
    public string $name;
    public ?string $signing_secret = null;
    public string $slug;
    public ?array $widget_ids = null;
}

/** Media entity data model. */
class Media
{
}

/** Request payload for Media#create. */
class MediaCreateData
{
}

/** Message entity data model. */
class Message
{
    public ?bool $ask_email = null;
    public ?array $blocks = null;
    public ?string $body = null;
    public ?array $buttons = null;
    public ?bool $internal = null;
    public ?array $products = null;
    public ?bool $ticket_form = null;
}

/** Request payload for Message#create. */
class MessageCreateData
{
    public ?string $session = null;
    public ?int $widget_id = null;
    public ?int $conversation_id = null;
    public ?bool $ask_email = null;
    public ?array $blocks = null;
    public ?string $body = null;
    public ?array $buttons = null;
    public ?bool $internal = null;
    public ?array $products = null;
    public ?bool $ticket_form = null;
}

/** Schema entity data model. */
class Schema
{
}

/** Request payload for Schema#load. */
class SchemaLoadMatch
{
}

/** Visitor entity data model. */
class Visitor
{
    public ?string $email = null;
    public ?string $name = null;
}

/** Request payload for Visitor#create. */
class VisitorCreateData
{
    public string $session;
    public int $widget_id;
    public ?string $email = null;
    public ?string $name = null;
}

/** Webhook entity data model. */
class Webhook
{
    public ?string $created_at = null;
    public array $events;
    public int $id;
    public string $url;
}

/** Request payload for Webhook#load. */
class WebhookLoadMatch
{
    public int $id;
}

/** Request payload for Webhook#list. */
class WebhookListMatch
{
    public ?string $created_at = null;
    public ?array $events = null;
    public ?int $id = null;
    public ?string $url = null;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public ?string $created_at = null;
    public array $events;
    public int $id;
    public string $url;
}

/** Request payload for Webhook#remove. */
class WebhookRemoveMatch
{
    public int $id;
}

