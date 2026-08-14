
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ConectoSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ConectoSDK.test()
    equal(null !== testsdk, true)
  })

})
