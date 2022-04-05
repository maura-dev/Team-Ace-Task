import React from 'react';
import HeroImg from "../components/hero.svg";

export default function Admin() {
  return (
    <div className="admin">
        <div className="left">
            <div className="wallet-details">
                <p className="key">Your Address:</p> 
                <p className="value">0xdsg264hdhewuhu74u34h3gt36</p>
                <p  className="key">Token Balance: </p>
                <p className="value">100000 NXT</p>
            </div>
            <p className="text">Send NXT to multiple addresses at once.</p>
            <p className="text-sm">Input spreadsheet containing addresses</p>
            <div className="input-section">
                <input type="file" name="file" className="file-input"/>
                <button className="transfer-btn">Send</button>
            </div>            
        </div>
        <div className="right">
            <img src={HeroImg} alt="img"/>
        </div>
    </div>
  )
}
