import './MovieItems.css'

import MovieItem from './MovieItem';

function MovieItems(props) {
    const { balance, onModalDisplay } = props

    const items = [
        {
            title: "Nestcoin Movie", 
            price: 75,
            image_url: 'movie-1',
        },
        {
            title: "Nestcoin Movie 2", 
            price: 100,
            image_url: 'movie-2',
        },
        {
            title: "Nestcoin Movie 3", 
            price: 125,
            image_url: 'movie-3',
        },
    ]

    return (
      <div className='container'>
          {
              items.map((item) => {
                return <MovieItem title={item.title} price={item.price} image_url={item.image_url} balance={balance} onModalDisplay={onModalDisplay}/>
              })
          }
      </div>
    );
  }
  
  export default MovieItems;