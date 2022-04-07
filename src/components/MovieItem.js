import './MovieItem.css'
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const MovieItem = (props) => {
    const { title, price, image_url } = props

    function swap() {
        props.onModalDisplay(image_url, title, price)
    }

    function purchase() {
        const options = {
            title: 'Swap Token',
            message: `Do you want to swap ${price} nxt for ${title} ticket`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => swap()
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
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