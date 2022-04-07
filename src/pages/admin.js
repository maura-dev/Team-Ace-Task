import React, {useState, useEffect} from 'react';
// import HeroImg from "../components/hero.svg";
import NestCoinIcon from '../components/NestCoinIcon';
import { read, utils, writeFileXLSX } from "xlsx";
import "./admin.css";
import { ethers } from "ethers";

import abi from '../artifacts/contracts/NestcoinToken.sol/NestcoinToken.json';




export default function Admin({currentAccount}) {

    const { getContractAddress } = require('@ethersproject/address');
    
    // ====================================================
    // HANDLING GETTING THE NEEDED ARRY FROM A SPREADSHEET
    // ====================================================
    const [args, setArgs] = useState([]);
    const [cols, setCols] = useState([])
    const XLSX = require('xlsx')
  
    const make_cols = refstr => {
      let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
      for(var i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key:i};
      return o;
    }

    //getting data from the uploaded spreadsheet (.xlsx) file
    const readUploadFile = (e) => {
      e.preventDefault();
      if(e.target.files) {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws, {
            header: 1
        });
        setArgs(data)
        setCols(make_cols(ws['!ref']));
        console.log(cols)
        }
        reader.readAsArrayBuffer(e.target.files[0])
      }
    }
    console.log("inital data look",args)

    //turn the spreadsheet to a javascript object with the addresses as key and amounts as values
    const object = Object.fromEntries(args)
    console.log("turned object",object)
  
    //extract the addresses into one array (the addresses are the keys)
    const addressesArray = Object.keys(object)
  
    //extract the amounts into one array (the amounts are the values)
    const amountsArray = Object.values(object)
  
    const readAddresses = () => {
      console.log("array of address:", addressesArray)
    }
  
    const readAmounts = () => {
      console.log("array of address:", amountsArray)
    }


    // ==============================
    // Contract x Frontend functions
    // ===============================

    

    const contractAddr = '0x172076E0166D1F9Cc711C77Adf8488051744980C'; 

    const [balanceInfo, setBalanceInfo] = useState({
        totalSupply: "",
        balance: ""
    })

    //getting our initial info => token balance and the total fixed supply minted
    const getInfo = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const erc20 = new ethers.Contract(contractAddr, abi, provider);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const balance = await erc20.checkTokenBalance();
        const totalSupply = await erc20.totalSupply();
        ascertainAddresses()
        setBalanceInfo({
            totalSupply: totalSupply,
            balance: String(balance)
        });
    };

    //extra : just to ascertain the addresses being dealt with
    const [batchOperator, setBatchOperator] = useState("");
    const [deployerAddr, setDeployerAddr] = useState("");
    const ascertainAddresses = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const contract = new ethers.Contract(contractAddr, abi, provider);
        const _batchOperator = await contract.batchOperator(); 
        const _deployerAddr = await contract._owner();
        setBatchOperator(_batchOperator)
        setDeployerAddr(_deployerAddr)
    };

    //getting the balance of the current connected address 
    const [bal, setBal] = useState("-")
    const getMyBalance = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const erc20 = new ethers.Contract(contractAddr,abi, signer);
        const addr = provider.getCode(contractAddr)
        console.log("ssd",addr);
        const signerAddress = await signer.getAddress();
        const balance = await erc20.userBalance();
        setBal(balance)
      };


    //Function to run the batch transfer
    const handleBatchTransfer = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        console.log("signer", signer.getAddress())
     
        const contract = new ethers.Contract(contractAddr, abi, signer);

        console.log( "Array of accounts we're sending to" ,addressesArray)
        console.log("Array of the amounts we're transferring to",amountsArray)

        await contract.batchTransfer(addressesArray, amountsArray)
    };

    //Function to change the batch operator 
    const delegateBatchTransaction = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        await provider.send("eth_requestAccounts", []);
        const contract = new ethers.Contract(contractAddr, abi, signer);
        await contract.delegateBatchOperation(data.get("addr"), data.get("amount"));
        console.log(data.get("addr"))
    }

  return (
    <div className="admin">
        <div className="left">
            <div className="wallet-details">
                <p className="key">Your Address:</p> 
                <p className="value">{currentAccount}</p>
                <br />
                <div class="token-details">
                    <div>
                        <p  className="key">Token Balance: </p>
                        <p className="value">{`${balanceInfo.balance} NXT`}</p>
                    </div>
                    <div>
                        <p  className="key">Total Token Supply: </p>
                        <p className="value">{`${balanceInfo.totalSupply} NXT `}</p>
                    </div>
                    <br/>
                    
                </div>
                <button className='info-btn' onClick = {getInfo} type = "submit">Get Info</button>

                <div className='addrs'>
                    <p className='deployer'> <strong>Deployer:</strong>  {deployerAddr} </p>
                    <p className='operator'> <strong>Batch Operator:</strong>  {batchOperator} </p>
                </div>
               
                
            </div>

            <div className='operator-section'>
                <h2>Delegate the batch operation to a trusted address (optional)</h2>
                <form className='operator-form' onSubmit={delegateBatchTransaction}> 
                    <input type="text" name="addr" placeholder="Delegate the transferring to.."/>
                    <input type="text" name="amount" placeholder="Amount to send to delegate"/>
                    <button type="submit">Change Operator</button>
                </form>
            </div>
            
            <div className='user-section'>
                <div>
                    <p>Current address' balance : {String(bal)}</p>
                    <button onClick={getMyBalance} > Check Balance</button>
                </div>
            </div>
            


            <p className="text"><span style={{color:"#ffa503"}}>Send NXT coins</span> to multiple addresses by uploading a spreadsheet</p>
            <div className="input-section">
                <input type="file" name="upload" className="file-input" id="file"
                onChange={readUploadFile}/>
                <label for="file">Upload your spreasheet by clicking here</label>
                <button onClick={handleBatchTransfer} className="transfer-btn">Send</button>
                <div className="blob"></div>
            </div>         
            {/* <p className="text"><span style={{color:"#ffa503"}}>Mint NXT coins</span> to increase the total supply of the nestcoin tokens</p>  
            <button className="mint-btn">Mint Tokens</button>  */}
            <p>{JSON.stringify(args, null, 1)}</p>
        </div>
        <div className="right">
            <NestCoinIcon/>
        </div>
    </div>
  )
}
