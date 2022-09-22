import './App.css';
import React from 'react'
import { init, useConnectWallet } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import magicModule from '@web3-onboard/magic'
import trezorModule from '@web3-onboard/trezor'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import { ethers } from 'ethers'

const injected = injectedModule()
//const magic = magicModule()
const trezor = trezorModule({
  email: '<EMAIL_CONTACT>',
  appUrl: '<APP_URL>'
})
const coinbase = coinbaseWalletModule()

const rpcApiKey = 'fxX2OnBfP4z4eLrSGYqf5mOUIlDMyBGN'
const rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${rpcApiKey}`

// initialize Onboard
init({
  wallets: [injected,trezor,coinbase],
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
    <div className='screen_height'>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect() : connect())}
      >
        {connecting ? 'Connecting to wallet' : wallet ? 'Disconnect wallet' : 'Connect Wallet'}
      </button>
    </div>
  )
}

 export default App;
