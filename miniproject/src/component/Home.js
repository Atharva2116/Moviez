import React from 'react';
import "bootstrap"; 
import SimpleImageSlider from "react-simple-image-slider";
import "./Home.css"
import Navbar from "./Navbar";
import MoviesGrid from './MoviesGrid';
import home1 from './images/home1.jpeg';
import home2 from './images/home2.jpeg';
import home3 from './images/home3.jpeg';
import home4 from './images/home4.jpeg';
const movies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    image: 'https://example.com/shawshank_redemption.jpg',
  },
  {
    id: 2,
    title: 'The Godfather',
    image: 'https://example.com/godfather.jpg',
  },
  // Add more movie objects as needed
];


function Home() {

  const image_slider = [

      { url: home1 },
      { url: home2 },
      { url: home3 },
      { url: home4 },
    
  ];

  return (
    <>
      <section className='home-section'>
        <Navbar/>
        <div className='cont'>
          <SimpleImageSlider
            width={1500}
            height={730}

            images={image_slider}
            showNavs={true}
            className="sliding-container" // Add the class name here
            imageClass="slider-image" // Add the image class here
            showBullets={true}
            loop={true}
            autoPlay={true}
            autoPlayDelay={true}

          />
        </div>
        <hr style={{color:"white", height:"5px"}} ></hr>
        <MoviesGrid onlyWishlist={false} />
      </section>
      {/* <section id="grid">
      <MoviesGrid onlyWishlist={false} />
      </section> */}
    </>
  );
}

export default Home;
