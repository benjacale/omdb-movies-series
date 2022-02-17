import React                   from "react";
import { useState, useEffect } from "react";
import { useContext }          from "react";
import { Link }                from "react-router-dom";
import axios                   from "axios";
import { LastLocationContext } from "../index";


const Home = () => {
    const {lastLocation, setLastLocation} = useContext(LastLocationContext);
    const [movies, setMovies]             = useState([]);  
    const apiKey                          = "ac5f1fca";  

    useEffect(() => {
        const movies1 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=borgen`)
        .then(res => res.data)
        const movies2 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=walking`)
        .then(res => res.data)
        const movies3 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=stranger&things`)
        .then(res => res.data)
        const movies4 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=peaky`)
        .then(res => res.data)
        const movies5 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=superman`)
        .then(res => res.data)
        const movies6 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=ironman`)
        .then(res => res.data)
        const movies7 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=men`)
        .then(res => res.data)
        const movies8 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=bad`)
        .then(res => res.data)
        const movies9 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=spider`)
        .then(res => res.data)
        const movies10 = axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=peaky`)
        .then(res => res.data)

        Promise.all([movies1, movies2, movies3, movies4, movies5, movies6, movies7, movies8, movies9, movies10])
        .then(movies => setMovies(movies))

    }, []);


    useEffect(() => {
        setLastLocation("");
    }, []);
    
    
    return(
        <div className="container-fluid">
            <div className="container-fluid">
                <div className="container-fluid text-warning p-5">
                    <div className="container2">
                        <h1 className="d-flex justify-content-center text-light" style={{color:"#F5F5F5", fontSize:"35px"}}> LET'S START! </h1>
                    </div>
                    <h3 className="mb-4 mt-5 d-flex justify-content-center border-top border-bottom border-5 border-primary pt-2 pb-2"> Series </h3>
                    <div className="d-flex flex-wrap justify-content-center">
                        {movies? movies.map((element, i) => {
                            return (
                                <div key={i}>
                                    {element.Search.map((movie, i) => {
                                        return (
                                            <div key={i}>
                                                {movie.Type === "series"? (
                                                    <Link to={`/search/${movie.Title}/${movie.imdbID}`}>
                                                        <img className='posters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='Movie poster' />
                                                    </Link>
                                                    ) : null
                                                }
                                            </div>
                                        )}) 
                                    }
                                </div>
                            )}) : <p className='text-white'>No matches found.</p>
                        }
                    </div>
                </div>
            
                <div className="container-fluid text-warning p-5">
                    <h3 className="mb-5 d-flex justify-content-center border-top border-bottom border-5 border-primary pt-2 pb-2"> Movies </h3>
                    <div className="d-flex flex-wrap justify-content-center">
                        {movies? movies.map((element, i) => {
                            return (
                                <div key={i}>
                                    {element.Search.map((movie, i) => {
                                        return (
                                            <div key={i}>
                                                {movie.Type === "movie"? (
                                                    <Link to={`/search/${movie.Title}/${movie.imdbID}`}>
                                                        <img className='posters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='Movie poster' />
                                                    </Link>
                                                    ) : null
                                                }
                                            </div>
                                        )}) 
                                    }
                                </div>
                            )}) : <p className='text-white'>No matches found.</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;
