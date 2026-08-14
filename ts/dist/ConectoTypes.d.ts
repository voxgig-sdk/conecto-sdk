export interface ActionResult {
    arguments?: Record<string, any>;
    blocks?: any[];
    conversation_id?: number;
    error?: string;
    not_found?: boolean;
    ok: boolean;
    result?: Record<string, any>;
}
export interface ActionResultCreateData {
    id: string;
    slug: string;
    arguments?: Record<string, any>;
    blocks?: any[];
    conversation_id?: number;
    error?: string;
    not_found?: boolean;
    ok: boolean;
    result?: Record<string, any>;
    $action?: string;
    [action: string]: any;
}
export interface Contact {
    created_at?: string;
    custom_fields?: Record<string, any>;
    email?: string;
    id: number;
}
export interface ContactListMatch {
    created_at?: string;
    custom_fields?: Record<string, any>;
    email?: string;
    id?: number;
}
export interface ContactCreateData {
    created_at?: string;
    custom_fields?: Record<string, any>;
    email?: string;
    id: number;
}
export interface Conversation {
    body?: string;
    created_at?: string;
    id: number;
    messages?: any[];
    session?: string;
    status: string;
    user_id: number;
    widget_id?: number;
}
export interface ConversationLoadMatch {
    id: number;
}
export interface ConversationListMatch {
    body?: string;
    created_at?: string;
    id?: number;
    messages?: any[];
    session?: string;
    status?: string;
    user_id?: number;
    widget_id?: number;
}
export interface ConversationCreateData {
    body?: string;
    created_at?: string;
    id: number;
    messages?: any[];
    session?: string;
    status: string;
    user_id: number;
    widget_id?: number;
    $action?: string;
    [action: string]: any;
}
export interface ConversationUpdateData {
    id: number;
    body?: string;
    created_at?: string;
    messages?: any[];
    session?: string;
    status?: string;
    user_id?: number;
    widget_id?: number;
    $action?: string;
    [action: string]: any;
}
export interface Credential {
    widget_id?: number;
    workspace_id?: number;
}
export interface CredentialLoadMatch {
    widget_id?: number;
    workspace_id?: number;
}
export interface Integration {
    actions?: any[];
    auth_type?: string;
    base_url: string;
    credential?: string;
    name: string;
    signing_secret?: string;
    slug: string;
    widget_ids?: any[];
}
export interface IntegrationLoadMatch {
    id: string;
}
export interface IntegrationListMatch {
    actions?: any[];
    auth_type?: string;
    base_url?: string;
    credential?: string;
    name?: string;
    signing_secret?: string;
    slug?: string;
    widget_ids?: any[];
}
export interface IntegrationCreateData {
    actions?: any[];
    auth_type?: string;
    base_url: string;
    credential?: string;
    name: string;
    signing_secret?: string;
    slug: string;
    widget_ids?: any[];
    $action?: string;
    [action: string]: any;
}
export interface Media {
}
export interface MediaCreateData {
}
export interface Message {
    ask_email?: boolean;
    blocks?: any[];
    body?: string;
    buttons?: any[];
    internal?: boolean;
    products?: any[];
    ticket_form?: boolean;
}
export interface MessageCreateData {
    session?: string;
    widget_id?: number;
    conversation_id?: number;
    ask_email?: boolean;
    blocks?: any[];
    body?: string;
    buttons?: any[];
    internal?: boolean;
    products?: any[];
    ticket_form?: boolean;
}
export interface Schema {
}
export interface SchemaLoadMatch {
}
export interface Visitor {
    email?: string;
    name?: string;
}
export interface VisitorCreateData {
    session: string;
    widget_id: number;
    email?: string;
    name?: string;
    $action?: string;
    [action: string]: any;
}
export interface Webhook {
    created_at?: string;
    events: any[];
    id: number;
    url: string;
}
export interface WebhookLoadMatch {
    id: number;
}
export interface WebhookListMatch {
    created_at?: string;
    events?: any[];
    id?: number;
    url?: string;
}
export interface WebhookCreateData {
    created_at?: string;
    events: any[];
    id: number;
    url: string;
}
export interface WebhookRemoveMatch {
    id: number;
}
