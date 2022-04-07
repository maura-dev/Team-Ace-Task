import {useEffect, useState} from 'react';
import './Home.css';

import movieImg from '../assets/nest-img.png';

const Home = () => {
    const [currentAccount, setCurrentAccount] = useState ('');
   
    const checkIfWalletIsConnected = async () => {
      try {
        const {ethereum} = window;
        if (!ethereum) {
          console.log ('you need to install metamask');
        } else {
          console.log ('found one', ethereum);
        }
        /*
        * Check if we're authorized to access the user's wallet
        */
  
        const accounts = await ethereum.request ({method: 'eth_accounts'});
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log ('account ', account);
          setCurrentAccount (account);
        } else {
          console.log ('no authorized account found');
        }
      } catch (error) {
        console.log (error);
      }
    };
  
    //connect wallet with button click
    const connectWallet = async() => {
     try {
      const {ethereum} = window;
      if (!ethereum) {
        console.log ('you need to install metamask');
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
     } catch (error) {
       console.log(error)
     }
   }
    useEffect (() => {
      checkIfWalletIsConnected ();
    }, []);
  
  
  
    //truncate wallet address
    function truncate(input) {
         return input.substring(0, 5) + '...' + input.substring(38);
   };

  //disconnect wallet address

  //    const disconnectWallet = async() => {
  //     const account = await window.ethereum.request({
  //       method: 'eth_requestAccounts',
  //       params: [
  //         {
  //           eth_accounts: {}
  //         }
  //       ]
  //     })
  // setCurrentAccount('')
  //   }
  return (

    <div className="home-container">
        {currentAccount.length === 0 ? 
    <div>
    <div>
      <nav>
        <p className="brand-name">Nestcoin 🎥</p>
        <p>
          <button onClick={connectWallet} className="connect-wallet">
            Connect wallet 👛
          </button>
        </p>
      </nav>
    </div>

    <div className="hero-section">
      <div className="description">
        <p className="hero-text">
         <span className='yellow'>Welcome</span> Human. Trade your NST coins for backstage passes and other goodies.
        </p>
        <p className="center">
          <button onClick={connectWallet} className="connect-wallet ">
            Connect wallet 👛
          </button>
        </p>
      </div>
      <p><img className="movie-img" src={movieImg} alt="" srcset="" /></p>
    </div>
  </div>

:
<div>
<div>
  <nav>
    <p className="brand-name">Nestcoin 🎥</p>
    <div className='connect-buttons'>
    <p className='connect-wallet'>
      {truncate(currentAccount)}
    </p>
    {/* <p>
      <button className='disconnect' onClick={disconnectWallet}>Disconnect Wallet</button>
    </p> */}
    </div>
   
  </nav>
</div>

<div className="hero-section">
  <div className="description">
    <p className="hero-text">
     <span className='yellow'>Welcome</span> Human. Trade your NST coins for backstage passes and other goodies.
    </p>
  </div>
  <p><img className="movie-img" src={movieImg} alt="" srcset="" /></p>
</div>

<div className='trade-coins-section'>
  <p className='trade'>Trade your <span className='yellow'>NST</span> </p>
  <p>You have 0 NST tokens. Choose how you would like to spend it.</p>
  </div>
</div>

        }
  


    </div>
  );
};

export default Home;
