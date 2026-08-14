package voxgigconectosdk

import (
	"github.com/voxgig-sdk/conecto-sdk/go/core"
	"github.com/voxgig-sdk/conecto-sdk/go/entity"
	"github.com/voxgig-sdk/conecto-sdk/go/feature"
	_ "github.com/voxgig-sdk/conecto-sdk/go/utility"
)

// Type aliases preserve external API.
type ConectoSDK = core.ConectoSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ConectoEntity = core.ConectoEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ConectoError = core.ConectoError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewActionEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewActionEntity(client, entopts)
	}
	core.NewContactEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewContactEntity(client, entopts)
	}
	core.NewConversationEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewConversationEntity(client, entopts)
	}
	core.NewCredentialEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewCredentialEntity(client, entopts)
	}
	core.NewIntegrationEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewIntegrationEntity(client, entopts)
	}
	core.NewMediaEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewMediaEntity(client, entopts)
	}
	core.NewMessageEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewMessageEntity(client, entopts)
	}
	core.NewSchemaEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewSchemaEntity(client, entopts)
	}
	core.NewVisitorEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewVisitorEntity(client, entopts)
	}
	core.NewWebhookEntityFunc = func(client *core.ConectoSDK, entopts map[string]any) core.ConectoEntity {
		return entity.NewWebhookEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewConectoSDK = core.NewConectoSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewConectoSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *ConectoSDK  { return NewConectoSDK(nil) }
func Test() *ConectoSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
