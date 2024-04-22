import "bootstrap"
import React from 'react';
import MoviesGrid from "./MoviesGrid";
import Navbar from "./Navbar";
import "./Wishlist.css"
const Wishlist = () => {
  return (
    
      <section className='wishlist-section'>
        <Navbar/>
      
      <MoviesGrid onlyWishlist={true} />
      </section>
    
  );
  };
  
  export default Wishlist;