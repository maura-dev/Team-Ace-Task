/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./components/Header";
import Admin from "./pages/admin";
import Header from './components/Header';
import Home from './components/Home';
import { ethers } from 'ethers';
import abi from './contracts/abi.json';
import contractAddress from './contracts/contract_address.json'

function App() {
  const [currentAccount, setCurrentAccount] = useState ('');
  const [connected, setconnected] = useState(false);
  const [ isAdmin, setIsAdmin] = useState(false);
  const contractAddr = contractAddress.contractAddress
   
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
      setconnected(false)
      checkIfWalletIsConnected ();
      //check if the connected wallet address belongs to a user or an admin
      const userCheck = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const erc20wSigner =  new ethers.Contract(contractAddr,abi, signer);
        const res = await erc20wSigner.isBatchOperator();
        if(res === true){
          setIsAdmin(true);
        }  else{
          setIsAdmin(false);
        }    
      };
      userCheck();
    }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
          <Header connectWallet={connectWallet} currentAccount={currentAccount} connected={connected}/>
        <Routes>
          <Route path="/" element={<Home connectWallet={connectWallet} currentAccount={currentAccount} connected={connected} isAdmin={isAdmin}/>} />
          <Route path="/admin" element={isAdmin ? <Admin currentAccount={currentAccount} connected={connected}/> :<p>Not Authorized</p>} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
