import './MovieItem.css'
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { getContract } from '../api';

const MovieItem = (props) => {
    const { title, price, image_url, balance } = props

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
            message: `Do you want to swap ${price} nxt for ${title} ticket`,
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
            afterClose: () => {
                if (callSwap) {
                    swap()
                }
            },
        }

        confirmAlert(options)
    }

    return (
        <div className={`item ${image_url}`}>
            <div className='details'>
                <div className='title_price'>
                    <p className='title'>{title}</p>
                    <p className='price'>{`${price} nxt`}</p>
                </div>
                <button className='purchase' onClick={(e) => purchase()}>
                    Purchase
                </button>
            </div>
        </div>
    )    
}

export default MovieItem