import React                  from 'react';
import {useEffect, useState}  from 'react';
import {useParams}            from 'react-router-dom';
import axios                  from 'axios';
import Movies                 from "./Movies";

const Search = () => {
    const [movies, setMovies] = useState([])
    const {input} = useParams();

    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=ac5f1fca&s=${input}`)
        .then(res => res.data)
        .then(moviesList => setMovies(moviesList.Search))
    }, [movies]);


    return (
        <div>
            <div className="container2">
                <h3> Results for "{input}"</h3>
            </div>
            <div className="container2">
                <Movies movies={movies}/>
            </div>
        </div>
    )
}

export default Search;