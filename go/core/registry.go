package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewActionEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewContactEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewConversationEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewCredentialEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewIntegrationEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewMediaEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewMessageEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewSchemaEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewVisitorEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

var NewWebhookEntityFunc func(client *ConectoSDK, entopts map[string]any) ConectoEntity

