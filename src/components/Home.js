import './Home.css';

import movieImg from '../assets/nest-img.png';
import MovieItems from './MovieItems'
const Home = ({currentAccount, connectWallet}) => {
    
  return (

    <div className="home-container">
        {currentAccount?.length === 0 ? 
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
  <MovieItems />
  </div>
</div>

        }
  


    </div>
  );
};

export default Home;
