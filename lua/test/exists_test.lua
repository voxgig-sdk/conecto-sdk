-- Conecto SDK exists test

local sdk = require("conecto_sdk")

describe("ConectoSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
