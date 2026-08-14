# Conecto SDK exists test

require "minitest/autorun"
require_relative "../Conecto_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ConectoSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
