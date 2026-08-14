# Typed models for the Conecto SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class ActionResultRequired(TypedDict):
    ok: bool


class ActionResult(ActionResultRequired, total=False):
    arguments: dict
    blocks: list
    conversation_id: int
    error: str
    not_found: bool
    result: dict


class ActionResultCreateDataRequired(TypedDict):
    id: str
    slug: str
    ok: bool


class ActionResultCreateData(ActionResultCreateDataRequired, total=False):
    arguments: dict
    blocks: list
    conversation_id: int
    error: str
    not_found: bool
    result: dict


class ContactRequired(TypedDict):
    id: int


class Contact(ContactRequired, total=False):
    created_at: str
    custom_fields: dict
    email: str


class ContactListMatch(TypedDict, total=False):
    created_at: str
    custom_fields: dict
    email: str
    id: int


class ContactCreateDataRequired(TypedDict):
    id: int


class ContactCreateData(ContactCreateDataRequired, total=False):
    created_at: str
    custom_fields: dict
    email: str


class ConversationRequired(TypedDict):
    id: int
    status: str
    user_id: int


class Conversation(ConversationRequired, total=False):
    body: str
    created_at: str
    messages: list
    session: str
    widget_id: int


class ConversationLoadMatch(TypedDict):
    id: int


class ConversationListMatch(TypedDict, total=False):
    body: str
    created_at: str
    id: int
    messages: list
    session: str
    status: str
    user_id: int
    widget_id: int


class ConversationCreateDataRequired(TypedDict):
    id: int
    status: str
    user_id: int


class ConversationCreateData(ConversationCreateDataRequired, total=False):
    body: str
    created_at: str
    messages: list
    session: str
    widget_id: int


class ConversationUpdateDataRequired(TypedDict):
    id: int


class ConversationUpdateData(ConversationUpdateDataRequired, total=False):
    body: str
    created_at: str
    messages: list
    session: str
    status: str
    user_id: int
    widget_id: int


class Credential(TypedDict, total=False):
    widget_id: int
    workspace_id: int


class CredentialLoadMatch(TypedDict, total=False):
    widget_id: int
    workspace_id: int


class IntegrationRequired(TypedDict):
    base_url: str
    name: str
    slug: str


class Integration(IntegrationRequired, total=False):
    actions: list
    auth_type: str
    credential: str
    signing_secret: str
    widget_ids: list


class IntegrationLoadMatch(TypedDict):
    id: str


class IntegrationListMatch(TypedDict, total=False):
    actions: list
    auth_type: str
    base_url: str
    credential: str
    name: str
    signing_secret: str
    slug: str
    widget_ids: list


class IntegrationCreateDataRequired(TypedDict):
    base_url: str
    name: str
    slug: str


class IntegrationCreateData(IntegrationCreateDataRequired, total=False):
    actions: list
    auth_type: str
    credential: str
    signing_secret: str
    widget_ids: list


class Media(TypedDict):
    pass


class MediaCreateData(TypedDict):
    pass


class Message(TypedDict, total=False):
    ask_email: bool
    blocks: list
    body: str
    buttons: list
    internal: bool
    products: list
    ticket_form: bool


class MessageCreateData(TypedDict, total=False):
    session: str
    widget_id: int
    conversation_id: int
    ask_email: bool
    blocks: list
    body: str
    buttons: list
    internal: bool
    products: list
    ticket_form: bool


class Schema(TypedDict):
    pass


class SchemaLoadMatch(TypedDict):
    pass


class Visitor(TypedDict, total=False):
    email: str
    name: str


class VisitorCreateDataRequired(TypedDict):
    session: str
    widget_id: int


class VisitorCreateData(VisitorCreateDataRequired, total=False):
    email: str
    name: str


class WebhookRequired(TypedDict):
    events: list
    id: int
    url: str


class Webhook(WebhookRequired, total=False):
    created_at: str


class WebhookLoadMatch(TypedDict):
    id: int


class WebhookListMatch(TypedDict, total=False):
    created_at: str
    events: list
    id: int
    url: str


class WebhookCreateDataRequired(TypedDict):
    events: list
    id: int
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    created_at: str


class WebhookRemoveMatch(TypedDict):
    id: int
