
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ConectoSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ConectoSDK.test()
    equal(testsdk instanceof ConectoSDK, true,
      'ConectoSDK.test() must return a client synchronously')
  })

})
