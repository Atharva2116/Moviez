import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const omdbApi = 'http://www.omdbapi.com/?apikey=9835f5f1';
    const res = await fetch(`${omdbApi}&s=${searchTerm}`);
    const data = await res.json();
    if (data && data.Search) {
      setSearchResults(data.Search);
      setShowPopup(true); // Show popup when search results are available
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            MovieZ
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/home" className={'nav-link'}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/wishlist" className={'nav-link'}>
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/plan" className={'nav-link'}>
                  Plan
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                id="navsearch"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-success" id="navbtn" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      {showPopup && (
        <div className="search-results-popup">
          <ul>
            {searchResults.map((result) => (
              <li style={{color:'white'}}  key={result.imdbID}>{result.Title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
