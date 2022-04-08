import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./components/Header";
import Admin from "./pages/admin";
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [currentAccount, setCurrentAccount] = useState ('');
  const [connected, setconnected] = useState(false)
   
    const checkIfWalletIsConnected = async () => {
      try {
        const {ethereum} = window;
        if (!ethereum) {
          alert("Please install metamask extension");
          window.open("https://metamask.io/download/", "_blank");
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
          setconnected(true);
        } else {
          alert ('No authorized account found');
        }
      } catch (error) {
        console.log (error);
      }
    };
  
    //connect wallet with button click
    const connectWallet = async() => {
      if(!connected) {
        try {
          const {ethereum} = window;
          if (!ethereum) {
            alert("Please install metamask");
            window.open("https://metamask.io/download/", "_blank");
            return;
          }
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      
          console.log("Connected", accounts[0]);
          setCurrentAccount(accounts[0]);
          setconnected(true);
         } catch (error) {
           console.log(error)
         }
      } else{
        setCurrentAccount("");
        setconnected(false)
      }
   }
    useEffect (() => {
      checkIfWalletIsConnected ();
    }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
          <Header connectWallet={connectWallet} currentAccount={currentAccount} connected={connected}/>
        <Routes>
          <Route path="/" element={<Home connectWallet={connectWallet} currentAccount={currentAccount} connected={connected}/>} />
          <Route path="/admin" element={<Admin currentAccount={currentAccount} connected={connected}/>} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
