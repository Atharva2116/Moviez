import { useState, useEffect } from 'react';
import "./MoviesGrid.css";
const api_url = 'http://localhost:2000/wishlist';
// import "./MoviesGrid.css"
const MovieCard = ({ movie, toggleWishlist, isInWishlist }) => {
  return (

    <div key={movie.imdbID} className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <h2>{movie.imdbID}</h2>
      <button id='btn-mgc' classname="btn-4" onClick={() => toggleWishlist(movie.imdbID)} className={isInWishlist ? 'heart active' : 'heart'}>
      <span>  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist '}</span>
      </button>
    </div>

  );
};

// MoviesGrid component
const MoviesGrid = ({ onlyWishlist }) => {
const searchTerms = ["kill", "master"];
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const fetchWishlist = async () => {
    const res = await fetch(api_url, {

    });
    const data = await res.json();
    setWishlist(data.map(d => d.imdbID));
  }

  useEffect(() => { fetchWishlist() }, []);

  const fetchMovies = async () => {
    var omdbApi, res, data;
    if (onlyWishlist) {
      var results = []
      for (var w of wishlist) {
        omdbApi = 'http://www.omdbapi.com/?apikey=9835f5f1&i=' + w;
        res = await fetch(omdbApi);
        data = await res.json();
        results.push(data);
      }
      setMovies(results);
      console.log(results);
    }
    else {

      for (var s of searchTerms) {
        omdbApi = 'http://www.omdbapi.com/?apikey=9835f5f1&s='+s ;

        res = await fetch(omdbApi);
        data = await res.json();
        setMovies(d=> [...d, ... data.Search]);
      }
    }



  };


  useEffect(() => {
    fetchMovies();
  }, [wishlist]);



  const toggleWishlist = async (imdbID) => {

    await fetch(`${api_url}/${imdbID}`, {
      method: "POST",

    });
    await fetchWishlist();
  }

  return (
    <section className="movies-section">
      <div className="movies-grid row" id='movie-card'>
        {movies.map((movie) => (
          <div className="col-md-3 mb-5" key={movie.imdbID}>
            <MovieCard
              toggleWishlist={toggleWishlist}
              movie={movie}
              isInWishlist={wishlist.includes(movie.imdbID)}
            />
          </div>
        ))}
      </div>
    </section>

  );
};

export default MoviesGrid;
