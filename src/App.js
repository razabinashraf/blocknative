import logo from './logo.svg';
import './App.css';

import React from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import magicModule from '@web3-onboard/magic'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import coinbaseWalletModule from '@web3-onboard/coinbase'


import { ethers } from 'ethers'

const injected = injectedModule()
const magic = magicModule()
const trezor = trezorModule()
const ledger = ledgerModule()
const coinbase = coinbaseWalletModule()

const rpcApiKey = '<ALCHEMY_KEY>' || '<INFURA_KEY>'
const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${rpcApiKey}` || `https://mainnet.infura.io/v3/${rpcApiKey}`

// initialize Onboard
init({
  wallets: [injected,magic,trezor,ledger,coinbase],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ]
})

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect() : connect())}
      >
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  )
}

 export default App;
