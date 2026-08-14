
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { ConectoSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ConectoSDK.test()
    equal(null !== testsdk, true)
  })

})
