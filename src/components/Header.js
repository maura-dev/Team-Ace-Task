import React from 'react';
import "./Home.css";

export default function Header( {connectWallet, currentAccount, connected}) {
    //truncate wallet address
    function truncate(input) {
        return input.substring(0, 5) + '...' + input.substring(38);
  };
  return (
    currentAccount?.length === 0 && !connected ?
    (<div>
      <nav>
        <p className="brand-name">Nestcoin 🎥</p>
        <p>
          <button onClick={connectWallet} className="connect-wallet">
            Connect wallet 👛
          </button>
        </p>
      </nav>
    </div>) : (
        <div>
            <nav>
                <p className="brand-name">Nestcoin 🎥</p>
                <p className='connect-wallet' onClick={connectWallet}>
                {truncate(currentAccount)}
                </p>
            </nav>
        </div>
    )
  )
}
