import Web3 from 'web3'
import Web3Adapter from '@gnosis.pm/safe-web3-lib'

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
console.log(web3)
const safeOwner = '0x...'

export const ethAdapter = new Web3Adapter({
  web3,
  signerAddress: safeOwner
})  