import './MovieItem.css'
import React from 'react';
const MovieItem = (props) => {
    const { title, price, image_url } = props

    // function swap(){
    //     // alert(`you recieved image ${image_url}  ${price} nst for ${title} ticket`)
    // }

    function purchase() {
        alert(`Do you want to swap ${price} nst for ${title} ticket`)
        props.onModalDisplay(image_url,title,price)
        // console.log('Swapped')
        // swap()
    }
// console.log("props",props.onModalDisplay)
    return (
        <div className={`item ${image_url}`}>
            <img  alt="img"/>
            <div className='details'>
                <div className='title_price'>
                    <p className='title'>{title}</p>
                    <p className='price'>{`${price} nst`}</p>
                </div>
                <button className='purchase' onClick={(e) => purchase()}>
                    Purchase
                </button>
            </div>
</div>
    )    
}

export default MovieItem