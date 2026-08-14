# Conecto SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ConectoFeatures
  def self.make_feature(name)
    case name
    when "base"
      ConectoBaseFeature.new
    when "test"
      ConectoTestFeature.new
    else
      ConectoBaseFeature.new
    end
  end
end
