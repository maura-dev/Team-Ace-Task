/* eslint-disable react-hooks/exhaustive-deps */
import './MovieItem.css'
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

//import { getContract } from '../api';
import { ethers } from 'ethers';

import abi from '../contracts/abi.json'
import contractAddress from '../contracts/contract_address.json';


const MovieItem = (props) => {
    const { title, price, image_url, balance, number } = props
    const [movie, setMovie] = useState();
    const [purchasing, setpurchasing] = useState(false);
    const contractAddr = contractAddress.contractAddress;

    useEffect(() => {
      setMovie(number)
    
    
    }, [number])
    

    // useEffect(() => {
    //     const res = JSON.parse(localStorage.getItem("purchases"))
    //     if(res?.length > 0 && res !== undefined && res !== null){
    //         setMovie((res.filter(x=> x = price)).length)
    //     } else{
    //         setMovie(0)
    //     }
        
    //     console.log(number)
    // }, [])

    const error = {
        title: 'Swap Token',
        message: `You do not have enough NXT, be loyal and get more tokens`,
        buttons: [
            {
                label: 'Ok',
                onClick: () => {  }
            },
        ],
        closeOnEscape: true,
        closeOnClickOutside: true,
        afterClose: () => {

        },
    }


    async function swap() {
        setpurchasing(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const erc20 = new ethers.Contract(contractAddr,abi, signer);
        const swap = await erc20.swapToken(parseInt(price), title)
        if(swap){
            setpurchasing(false)
            setMovie(movie + 1);
            const purchases = JSON.parse(localStorage.getItem("purchases"))
            purchases.push(price)
            localStorage.setItem("purchases", JSON.stringify(purchases))
            window.location.reload();
           
        } else{
            setpurchasing(false)
            alert("Opps!, transaction failed")
        }
                
    }

    async function purchase() {
        let callSwap = false

        const options = {
            title: 'Swap Token',
            message: `Do you want to swap your ${price} NXT for ${title} ticket`,

            buttons: [
                {
                    label: 'Yes',
                    onClick: () => callSwap = true
                    
                },
                {
                    label: 'No',
                    onClick: () => callSwap = false
                }
            ],

            closeOnEscape: true,
            closeOnClickOutside: true,
            afterClose:() => {
                if(callSwap){
                    if(parseInt(balance) >= parseInt(price)){
                        swap();
                    } else{
                        confirmAlert(error)
                    }
                } else{
                    return;
                }
            }
            // afterClose: () => {
            //     if (callSwap) {
            //         swap()
            //         if(title === "Nestcoin Movie"){
            //             setMovie1(prev => prev += 1)
            //         }
            //         else if(title === "Nestcoin Movie 2"){
            //             setMovie2(prev => prev += 1)
                        
            //         }
            //         else {
            //             setMovie3(prev => prev += 1)

            //         }
            //     }
           // },
        }

        confirmAlert(options)
    }

    // const movies = () => {
    //     if(title === 'Nestcoin Movie'){
    //         return <p> You have <span className='movie-color'>{movie}</span> ticket(s)</p>
    //     }else if (title === 'Nestcoin Movie 2') {
    //         return <p> You have <span className='movie-color'>{movie2}</span> ticket(s)</p>
    //     }else {
    //         return <p> You have <span className='movie-color'>{movie3}</span> ticket(s)</p>
    //     }
    // }

    
    
    return (
        <div>
            
   <div className={`item ${image_url}`}>
            <div className='details'>
                <div className='title_price'>
                    <div className='title'>
                        <p>{title}</p>    
                    </div>
                    <p className='price'>{`${price} NXT`}</p>
                </div>
                <p className='number-of-tickets'>
                    <p> You have <span className='movie-color'>{movie}</span> ticket(s)</p>
                </p>
                <button className='purchase' onClick={(e) => purchase()}>
                    {purchasing ? "Purchasing ..." : "Purchase"}
                </button>
            </div>
        </div>

        </div>
     
    )    
}

export default MovieItem