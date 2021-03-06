import { EthereumActionHelper } from '../ethAction'
import { toWei, toEthereumTxData } from '../helpers'
import { EthUnit } from '../models'

describe('Ethereum Action Tests', () => {
  const ABI: any[] = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'mint',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  const method = 'mint'
  const parameters = [50]
  const to = '0x04825941Ad80A6a869e85606b29c9D25144E91e6'
  const value = toWei(100, EthUnit.Finney)
  const contract = {
    abi: ABI,
    method,
    parameters,
  }
  it('creates eth transfer action object with to, value and contract', async () => {
    const ethAction = new EthereumActionHelper({ to, value, contract })

    expect(ethAction.hasData).toEqual(true)
  })
  it('creates eth transfer action object with only to & value ', async () => {
    const ethAction = new EthereumActionHelper({ to, value })

    expect(ethAction.hasData).toEqual(false)
  })

  it('creates eth transfer action object with to, value, contract & data. Expect error', async () => {
    const data = toEthereumTxData('0x04825941Ad80A6a869e85606b29c9D25144E91e6')
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ethAction = new EthereumActionHelper({ to, value, contract, data })
    }).toThrowError('You can provide either data or contract but not both')
  })
})
