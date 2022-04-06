import './Home.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import movieImg from '../assets/nest-img.png';
import MovieItems from './MovieItems'
import React, { useState } from 'react';
const Home = ({currentAccount, connectWallet}) => {
 
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handle_display_modal=(image_url,title,price)=>{
    
onOpenModal()
  }


  return (

    <div className="home-container">
        {currentAccount?.length === 0 ? 
    <div>

    <div className="hero-section">
      <div className="description">
        <p className="hero-text">
         <span className='yellow'>Welcome</span> Human. Trade your NST coins for backstage passes and other goodies.
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
     <span className='yellow'>Welcome</span> Human. Trade your NST coins for backstage passes and other goodies.
    </p>
  </div>
  <p><img handle_display_modale="movie-img" src={movieImg} alt="" srcset="" /></p>
</div>

<div className='trade-coins-section'>
  <p className='trade'>Trade your <span className='yellow'>NST</span> </p>
  <p>You have 0 NST tokens. Choose how you would like to spend it.</p>

  <Modal open={open} onClose={onCloseModal} center >
        
        <span className='yellow'>You have succefully swapped your token</span>
        <p><img className="movie-img" src={movieImg} alt="" srcset="" /></p>
        
        
        
     
      </Modal>

  <MovieItems  onModalDisplay={handle_display_modal} />
  </div>
</div>

        }
  


    </div>
  );
};

export default Home;
