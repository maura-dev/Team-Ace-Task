import './MovieItem.css'
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getContract } from '../api';

const MovieItem = (props) => {
    const { title, price, image_url, balance } = props
    const [movie1, setMovie1] = useState(0)
    const [movie2, setMovie2] = useState(0)
    const [movie3, setMovie3] = useState(0)


    async function swap() {
        if (parseInt(balance) >= parseInt(price)) {
            const contract = await getContract(window.ethereum)

            const swap = await contract.swapToken(parseInt(price), title)
            swap.wait(3)

            await contract.on("SwapToken", (from, value, item) => {
                if (swap) {
                    props.onModalDisplay(image_url, item, value)
                }
            })

            return
        }

        const options = {
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

        return confirmAlert(options)

    }

    async function purchase() {
        let callSwap = false

        const options = {
            title: 'Swap Token',
            message: `Do you want to swap your ${price} nxt for ${title} ticket`,

            buttons: [
                {
                    label: 'Yes',
                    onClick: () => callSwap = true,
                    
                },
                {
                    label: 'No',
                    onClick: () => callSwap = false
                }
            ],

            closeOnEscape: true,
            closeOnClickOutside: true,
            afterClose: () => {
                if (callSwap) {
                    swap()
                    if(title === "Nestcoin Movie"){
                        setMovie1(prev => prev += 1)
                    }
                    else if(title === "Nestcoin Movie 2"){
                        setMovie2(prev => prev += 1)
                        
                    }
                    else {
                        setMovie3(prev => prev += 1)

                    }
                }
            },
        }

        confirmAlert(options)
    }

    const movies = () => {
        if(title === 'Nestcoin Movie'){
            return <p> You have <span className='movie-color'>{movie1}</span> ticket(s)</p>
        }else if (title === 'Nestcoin Movive 2') {
            return <p> You have <span className='movie-color'>{movie2}</span> ticket(s)</p>
        }else {
            return <p> You have <span className='movie-color'>{movie3}</span> ticket(s)</p>
        }
    }
    return (
        <div>
            
   <div className={`item ${image_url}`}>
            <div className='details'>
                <div className='title_price'>
                    <div className='title'>
                        <p>{title}</p>
                
                        
                    </div>
                    <p className='price'>{`${price} nxt`}</p>
                </div>
                <p className='number-of-tickets'>
                        {movies()}
                        </p>
                <button className='purchase' onClick={(e) => purchase()}>
                    Purchase
                </button>
            </div>
        </div>

        </div>
     
    )    
}

export default MovieItem