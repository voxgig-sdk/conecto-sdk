# Conecto SDK utility: make_context
require_relative '../core/context'
module ConectoUtilities
  MakeContext = ->(ctxmap, basectx) {
    ConectoContext.new(ctxmap, basectx)
  }
end
