# Conecto SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

ConectoUtility.registrar = ->(u) {
  u.clean = ConectoUtilities::Clean
  u.done = ConectoUtilities::Done
  u.make_error = ConectoUtilities::MakeError
  u.feature_add = ConectoUtilities::FeatureAdd
  u.feature_hook = ConectoUtilities::FeatureHook
  u.feature_init = ConectoUtilities::FeatureInit
  u.fetcher = ConectoUtilities::Fetcher
  u.make_fetch_def = ConectoUtilities::MakeFetchDef
  u.make_context = ConectoUtilities::MakeContext
  u.make_options = ConectoUtilities::MakeOptions
  u.make_request = ConectoUtilities::MakeRequest
  u.make_response = ConectoUtilities::MakeResponse
  u.make_result = ConectoUtilities::MakeResult
  u.make_point = ConectoUtilities::MakePoint
  u.make_spec = ConectoUtilities::MakeSpec
  u.make_url = ConectoUtilities::MakeUrl
  u.param = ConectoUtilities::Param
  u.prepare_auth = ConectoUtilities::PrepareAuth
  u.prepare_body = ConectoUtilities::PrepareBody
  u.prepare_headers = ConectoUtilities::PrepareHeaders
  u.prepare_method = ConectoUtilities::PrepareMethod
  u.prepare_params = ConectoUtilities::PrepareParams
  u.prepare_path = ConectoUtilities::PreparePath
  u.prepare_query = ConectoUtilities::PrepareQuery
  u.graphql_body = ConectoUtilities::GraphqlBody
  u.graphql_errors = ConectoUtilities::GraphqlErrors
  u.result_basic = ConectoUtilities::ResultBasic
  u.result_body = ConectoUtilities::ResultBody
  u.result_headers = ConectoUtilities::ResultHeaders
  u.transform_request = ConectoUtilities::TransformRequest
  u.transform_response = ConectoUtilities::TransformResponse
}
