-- Conecto SDK error

local ConectoError = {}
ConectoError.__index = ConectoError


function ConectoError.new(code, msg, ctx)
  local self = setmetatable({}, ConectoError)
  self.is_sdk_error = true
  self.sdk = "Conecto"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ConectoError:error()
  return self.msg
end


function ConectoError:__tostring()
  return self.msg
end


return ConectoError
