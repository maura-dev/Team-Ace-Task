import './MovieItems.css'

import MovieItem from './MovieItem';
import { useEffect, useState } from 'react';

function MovieItems(props) {
    const { balance, onModalDisplay, handleRefresh } = props
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem("purchases"));
        if(res?.length > 0 && res !== undefined && res !== null){
               setPurchases(res);
            //setMovie((res.filter(x=> x = price)).length)
        } else{
           setPurchases([]);
            
        }
   
   }, [])

    const items = [
        {
            title: "Nestcoin Movie", 
            price: 75,
            image_url: 'movie-1',
            number: (purchases.filter(x=> x === 75)).length
        },
        {
            title: "Nestcoin Movie 2", 
            price: 100,
            image_url: 'movie-2',
            number: (purchases.filter(x=> x === 100)).length
        },
        {
            title: "Nestcoin Movie 3", 
            price: 125,
            image_url: 'movie-3',
            number: (purchases.filter(x=> x === 125)).length
        },
    ]

    return (
      <div className='container'>
          {
              items.map((item) => {
                return <MovieItem 
                            key={item.price}
                            title={item.title} 
                            price={item.price} 
                            image_url={item.image_url} 
                            balance={balance} 
                            number={item.number}
                            handleRefresh={handleRefresh}
                            onModalDisplay={onModalDisplay}/>
                            
              })
          }

          
      </div>
    );
  }
  
  export default MovieItems;