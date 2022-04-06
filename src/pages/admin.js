import React, {useState} from 'react';
// import HeroImg from "../components/hero.svg";
import NestCoinIcon from '../components/NestCoinIcon';
import { read, utils, writeFileXLSX } from "xlsx";
import "./admin.css";

export default function Admin() {
    const XLSX = require('xlsx');
    const[data, setData] = useState([]);
    const[cols, setCols] = useState([]);

    const makeCols = (refstr) => {
        let o = [], c = XLSX.utils.decode_range(refstr).e.c + 1;
        for(var i=0; i < c; ++i) o[i] = {name: XLSX.utils.encode_col(i), key:i};
    }

    // function to extract addresses from spreadsheet
    const readUploadFile = (e) => {
        e.preventDefault();

        if(e.target.files){
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            reader.onload = (e) => {
                const bstr = e.target.result;
                const wb= XLSX.read(bstr, {type:rABS ? "binary" : "array"});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, {
                    header: 1
                });
                setData(data);
                //console.log(data[3][0], data[3][1]);
                console.log("data", JSON.stringify(data));

                setCols(makeCols(ws["!ref"]));
                //console.log(cols)
            }

            reader.readAsArrayBuffer(e.target.files[0])
        }
    }
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
                        <p className="value">20000000 NXT</p>
                    </div>
                    <div>
                        <p  className="key">Total Token Supply: </p>
                        <p className="value">20000000 NXT</p>
                    </div>
                    <br/>
                    
                </div>
                
            </div>
            <p className="text"><span style={{color:"#ffa503"}}>Send NXT coins</span> to multiple addresses by uploading a spreadsheet</p>
            <div className="input-section">
                <input type="file" name="upload" className="file-input" id="file"
                onChange={readUploadFile}/>
                <label for="file">Upload your spreasheet by clicking here</label>
                <button className="transfer-btn">Send</button>
                <div className="blob"></div>
            </div>         
            {/* <p className="text"><span style={{color:"#ffa503"}}>Mint NXT coins</span> to increase the total supply of the nestcoin tokens</p>  
            <button className="mint-btn">Mint Tokens</button>  */}
            {/* <p>{JSON.stringify(data,null, 1)}</p> */}
        </div>
        <div className="right">
            <NestCoinIcon/>
        </div>
    </div>
  )
}
