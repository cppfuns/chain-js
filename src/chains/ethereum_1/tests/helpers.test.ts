// How to use fetch mocks - https://www.npmjs.com/package/jest-fetch-mock
import { toWei } from '../helpers'

describe('Ethereum Helper Functions', () => {
  // sets fetchMock to throw an error on the next call to fetch (jsonRpc.get_abi calls fetch and triggers the error to be thrown)
  it('tests toWei', async () => {
    const expValue = toWei(100, 'milliether')
    const value = toWei(100, 'finney')

    expect(value).toEqual(expValue)
  })
})
