# Conecto SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ConectoFeatures
  def self.make_feature(name)
    case name
    when "base"
      ConectoBaseFeature.new
    when "debug"
      ConectoDebugFeature.new
    when "idempotency"
      ConectoIdempotencyFeature.new
    when "metrics"
      ConectoMetricsFeature.new
    when "paging"
      ConectoPagingFeature.new
    when "ratelimit"
      ConectoRatelimitFeature.new
    when "retry"
      ConectoRetryFeature.new
    when "test"
      ConectoTestFeature.new
    when "timeout"
      ConectoTimeoutFeature.new
    else
      ConectoBaseFeature.new
    end
  end
end
