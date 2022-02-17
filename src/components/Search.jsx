import React                   from 'react';
import { useEffect, useState } from 'react';
import { useContext }          from 'react';
import { useParams }           from 'react-router-dom';
import axios                   from 'axios';
import Movies                  from "./Movies";
import { LastLocationContext } from '../index';

const Search = () => {
    const {lastLocation, setLastLocation} = useContext(LastLocationContext);
    const [movies, setMovies]             = useState([]);
    const { input }                       = useParams();


    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=ac5f1fca&s=${input}`)
        .then(res => {
                res.data.Response === "True" ? setMovies(res.data.Search) : setMovies([]);
            } 
        )
    }, [movies]);
    

    useEffect(() => {
        setLastLocation("");
    }, []);


    return (
        <div>
            <div className="container-fluid d-flex justify-content-center">
                <h4 className='mt-5 mb-3 fst-italic'> Results for "{input}"</h4>
            </div>
           
            <div>
                <Movies movies={movies}/>
            </div>
          
        </div>
    )
}

export default Search;