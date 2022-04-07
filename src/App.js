import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./components/Header";
import Admin from "./pages/admin";
import Header from './components/Header';
import Home from './components/Home';

function App() {
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
  
  return (
    <div className="App">
      <BrowserRouter>
          <Header connectWallet={connectWallet} currentAccount={currentAccount}/>
        <Routes>
          <Route path="/" element={<Home connectWallet={connectWallet} currentAccount={currentAccount}/>} />
          <Route path="/admin" element={<Admin currentAccount={currentAccount}/>} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
