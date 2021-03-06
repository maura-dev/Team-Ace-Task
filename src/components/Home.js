/* eslint-disable react-hooks/exhaustive-deps */
import './Home.css';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import movieImg from '../assets/nest-img.png';
import MovieItems from './MovieItems'
import React, { useState, useEffect } from 'react';

import movieTicket1 from '../assets/movie-ticket-1.png'
import movieTicket2 from '../assets/movie-ticket-2.png'
import movieTicket3 from '../assets/movie-ticket-3.png'

import { ethers } from "ethers";
import abi from '../contracts/abi.json'
import contractAddress from '../contracts/contract_address.json'

const Home = ({currentAccount, connectWallet, connected, isAdmin}) => {
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

  const contractAddr = contractAddress.contractAddress
  const [bal, setBal] = useState("0");

  const refreshBal = async(bal) => {
    setBal(bal);
  }

  useEffect(() => {
    const getCurrentBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const erc20 = new ethers.Contract(contractAddr,abi, signer);
      const balance = await erc20.userBalance();
      setBal(balance);
    };
    getCurrentBalance();
  }, [bal])

  return (
    <div className="home-container">
        {
          currentAccount.length === 0 ? 
            <div>
              <div className="hero-section">
                <div className="description">
                  <p className="hero-text">
                  <span className='yellow'>Welcome</span> Human. Trade your NXT coins for backstage passes and other goodies.
                  </p>
                </div>
                <p><img className="movie-img" src={movieImg} alt="img"  /></p>
              </div>
            </div>
         :
            isAdmin ? null : (<div>
              <div className="hero-section">
                <div className="description">
                  <p className="hero-text">
                  <span className='yellow'>Welcome</span> Human. Trade your NXT coins for backstage passes and other goodies.
                  </p>
                </div>
                <p><img className="movie-img" src={movieImg} alt="img" /></p>
              </div>

              <div className='trade-coins-section'>
                <p className='trade'>Trade your <span className='yellow'>NXT </span> for perks</p>
                <p className='balance-txt'>You have <strong> {`${parseInt(bal*10**-18)}`} NXT </strong>tokens. Choose how you would like to spend it.</p>

                <Modal open={open} onClose={onCloseModal} center >
                  <span className='yellow'>{`You have succefully swapped your token for ${movieTitle}`}</span>
                  <br></br>
                  <span className='yellow'>{`${moviePrice} NXT has been deducted from you`}</span>
                  <p><img className="trade-img" src={getMovieImage()} alt="img" /></p>
                </Modal>

                <MovieItems  balance={`${parseInt(bal*10**-18)}`} onModalDisplay={handleDisplayModal} handleRefresh={refreshBal}/>
              </div>
            </div>)
        }
    </div>
  );
};

export default Home;
