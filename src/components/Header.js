import React from 'react'
import NestCoinIcon from './NestCoinIcon'

export default function Header() {
  return (
    <nav>
        {/* Logo */}
        <div className='logo'>
            <NestCoinIcon/>
            <p>NestCoin</p>
        </div>
        {/* connect wallet button */}
        <button className='connect-btn'>
            Connect Wallet
        </button>
    </nav>
  )
}
