import './Home.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import movieImg from '../assets/nest-img.png';
import MovieItems from './MovieItems'
import React, { useState } from 'react';

import movieTicket1 from '../assets/movie-ticket-1.png'
import movieTicket2 from '../assets/movie-ticket-2.png'
import movieTicket3 from '../assets/movie-ticket-3.png'

const Home = ({currentAccount, connectWallet}) => {
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState(1);
  const [movieTitle, setMovieTitle] = useState('Nestcoin Movie');
  const [moviePrice, setMoviePrice] = useState('75');

  const onOpenModal = (imageUrl, title, price) => {
    setOpen(true);

    if (imageUrl === 'movie-2') {
      setMovie(2)
    } else if (imageUrl === 'movie-3') {
      setMovie(3)
    } else {
      setMovie(1)
    }

    setMovieTitle(title)
    setMoviePrice(price)
  }

  const onCloseModal = () => setOpen(false);

  const handleDisplayModal = (imageUrl, title, price) => {
    onOpenModal(imageUrl, title, price)
  }

  const getMovieImage = () => {
    if (movie === 2) {
      return movieTicket2
    } else if (movie === 3) {
      return movieTicket3
    }

    return movieTicket1
  }

  return (
    <div className="home-container">
        {
          currentAccount?.length === 0 ? 
            <div>
              <div className="hero-section">
                <div className="description">
                  <p className="hero-text">
                  <span className='yellow'>Welcome</span> Human. Trade your NXT coins for backstage passes and other goodies.
                  </p>
                  <p className="center">
                    <button onClick={connectWallet} className="connect-wallet ">
                      Connect wallet 👛
                    </button>
                  </p>
                </div>
                <p><img className="movie-img" src={movieImg} alt="" srcset="" /></p>
              </div>
            </div>
         :
            <div>
              <div className="hero-section">
                <div className="description">
                  <p className="hero-text">
                  <span className='yellow'>Welcome</span> Human. Trade your NXT coins for backstage passes and other goodies.
                  </p>
                </div>
                <p><img className="movie-img" src={movieImg} alt="" srcset="" /></p>
              </div>

              <div className='trade-coins-section'>
                <p className='trade'>Trade your <span className='yellow'>NXT</span> </p>
                <p>You have 0 NXT tokens. Choose how you would like to spend it.</p>

                <Modal open={open} onClose={onCloseModal} center >
                  <span className='yellow'>{`You have succefully swapped your token for ${movieTitle}`}</span>
                  <p><img className="trade-img" src={getMovieImage()} alt="" srcset="" /></p>
                </Modal>

                <MovieItems  onModalDisplay={handleDisplayModal} />
              </div>
            </div>
        }
    </div>
  );
};

export default Home;
