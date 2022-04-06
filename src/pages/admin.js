import React from 'react';
// import HeroImg from "../components/hero.svg";
import NestCoinIcon from '../components/NestCoinIcon';
import "./admin.css";

export default function Admin() {
  return (
    <div className="admin">
        <div className="left">
            <div className="wallet-details">
                <p className="key">Your Address:</p> 
                <p className="value">0xdsg264hdhewuhu74u34h3gt36</p>
                <br />
                <div class="token-details">
                    <div>
                        <p  className="key">Token Balance: </p>
                        <p className="value">100000 NXT</p>
                    </div>
                    <div>
                        <p  className="key">Total Token Supply: </p>
                        <p className="value">100000 NXT</p>
                    </div>
                    <br/>
                    
                </div>
                
            </div>
            <p className="text"><span style={{color:"#ffa503"}}>Send NXT coins</span> to multiple addresses by uploading a spreadsheet</p>
            <div className="input-section">
                <input type="file" name="file" className="file-input" aria-hidden="true"/>
                <button className="transfer-btn">Send</button>
                <div className="blob"></div>
            </div>         
            <p className="text"><span style={{color:"#ffa503"}}>Mint NXT coins</span> to increase the total supply of the tokens</p>  
            <button className="mint-btn">Mint Tokens</button> 
        </div>
        <div className="right">
            <NestCoinIcon/>
        </div>
    </div>
  )
}
