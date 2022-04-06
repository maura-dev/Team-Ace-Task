import './MovieItem.css'

const MovieItem = (props) => {
    const { title, price, image_url } = props

    function purchase() {
        alert(`Do you want to swap ${price} nxt for ${title} ticket`)

        console.log('Swapped')
    }

    return (
        <div className={`item ${image_url}`}>
            <img  alt="img"/>
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