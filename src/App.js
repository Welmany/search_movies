import React, { useEffect, useState} from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=6bb74d0f';

const movie1 = {
    "Title": "Fast & Furious 6",
    "Year": "2013",
    "imdbID": "tt1905041",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Fast Furious');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input onChange={(event) => setSearchTerm(event.target.value)} value={searchTerm}placeholder="Search for movies"/>
                <img src={SearchIcon} alt='SearchIcon' onClick={() => searchMovies(searchTerm)}/>
            </div>

            { movies?.length > 0 ? 
                (   <div className='container'>
                        {movies.map((movie, index) => 
                        (<MovieCard key={index} movie={movie} />))}
                    </div>
                ) : ( <div className='empty'> <h1></h1>No movie found</div> ) 
            } 

        </div>
    );
}

export default App;
