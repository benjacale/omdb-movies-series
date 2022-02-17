import React, { useContext }   from 'react';
import { useState, useEffect } from 'react';
import { useHistory }          from 'react-router';
import { useParams, Link }     from 'react-router-dom';
import axios                   from 'axios';
import { UserContext }         from "../index";
import { LastLocationContext } from "../index";


const SingleMovie = () => {
    const {user, setUser}                 = useContext(UserContext);
    const {lastLocation, setLastLocation} = useContext(LastLocationContext);
    const history                         = useHistory();
    const {movieId}                       = useParams();
    const [movie, setMovie]               = useState({});
    const apiKey                          = "ac5f1fca";
   

    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`)
        .then(res   => res.data)
        .then(movie => setMovie(movie))
        .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        setLastLocation(history.location.pathname)
    }, []);


    const addFav = () => {
        axios.put(`/api/users/${user.id}`, {
            favourites: [...user.favourites, movie]
        })
        .catch(err => console.log(err));
        setUser({...user, favourites: [...user.favourites, movie]});
    };

    const removeFav = () => {
        const favourites = [...user.favourites];
        const index = favourites.findIndex(index => index.imdbID === movie.imdbID);
        favourites.splice(index, 1);
        axios.put(`/api/users/${user.id}`, {favourites: favourites})
        .catch(err => console.log(err));
        setUser({...user, favourites: favourites});
    };


    return(
        <div className="container" style={{marginTop:"100px"}}>
            <div className="row">
                <div className="col-md-3 text-center">
                    <img className='mt-4' style={{width:"100%"}} src={movie.Poster} alt='Movie poster'/>
                </div>

                <div className="col-md-6">
                    <div className='ms-4 me-4'>
                        <div className='d-flex justify-content-start'>
                            <p 
                                className='row mb-0 mt-4 me-4 border bg-light justify-content-center text-dark text-uppercase' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Type} 
                            </p>
                            <p 
                                className='row mb-0 mt-4 me-4 border bg-light justify-content-center text-dark text-uppercase' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Rated} 
                            </p>
                            <p 
                                className='row mb-0 mt-4 border bg-light justify-content-center text-dark text-uppercase' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Runtime} 
                            </p>
                        </div>
                        
                        <h1 className='row text-warning mt-3' style={{fontSize:"35px"}}> {movie.Title} </h1>
                        <p className='row mb-4'  style={{fontSize:"17px"}}> {movie.Genre}</p>
                        <p className='row'> {movie.Plot} </p>
                        <p className='row'> Cast: {movie.Actors} </p>
                        {movie.Type === "series" &&  <p className='row mb-0'> Total seasons: {movie.totalSeasons} </p>}
                        <p className='row'> Language: {movie.Language} </p>

                        {!user.id && (
                            <p className='row mt-4 mb-5 text-primary'> Add to favourites?
                                <Link to="/sign-in" className='ps-0'>
                                    <button type="submit" className="btn btn-sm btn-outline-primary mt-2 ms-0">Log in <i className="fa-solid fa-arrow-right-to-bracket ps-1"></i></button>
                                </Link>
                            </p> 
                        )}

                        {user.id && !user.favourites?.some(element => element.imdbID === movie.imdbID) && (
                            <p className='mt-4'>
                                <i className="bi bi-plus-circle fs-3 favouriteIcon" onClick={addFav} style={{color:"#0d6efd"}}></i>
                                <i className='ms-2 text-primary' style={{fontSize:"17px"}}> Add to favourites </i>
                            </p>
                        )} 

                        {user.id && user.favourites?.some(element => element.imdbID === movie.imdbID) && (
                            <div className='mt-4 mb-3'>
                                <i className="bi bi-check-circle fs-3 favouriteIcon" onClick={removeFav} style={{color:"#198754"}}></i>
                                <i className='ms-2 text-success' style={{fontSize:"17px"}}> Click to remove </i>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-lg-3 text-center ps-5">
                    <div className='border border-3 border-secondary d-flex justify-content-around pt-2 mt-3' style={{borderRadius:"20px", width:"80%", height:"100px"}}>
                        <div style={{width:"100%"}}>
                            <i className="bi bi-calendar p-1" style={{fontSize:"40px"}}></i>
                        </div>
                        <div className='d-flex flex-column pe-2' style={{width:"100%"}}>
                            <p 
                                className='text-secondary fw-bold' 
                                style={{borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                            >   
                                Year 
                            </p>
                            <p 
                                className='text-light w-100' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Year} 
                            </p>
                        </div>
                    </div>
                    <div className='border border-3 border-secondary d-flex justify-content-around pt-2 mt-3' style={{borderRadius:"20px", width:"80%", height:"100px"}}>
                        <div>
                            <i className="bi bi-flag" style={{fontSize:"40px"}}></i>
                        </div>
                        <div className='d-flex flex-column'>
                            <p 
                                className='text-secondary fw-bold' 
                                style={{borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                            >   
                                Country 
                            </p>
                            <p 
                                className='text-light w-100' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Country} 
                            </p>
                        </div>
                    </div>
                    <div className='border border-3 border-secondary d-flex justify-content-around pt-2 mt-3' style={{borderRadius:"20px", width:"80%", height:"100px"}}>
                        <div>
                            <i className="bi bi-camera-reels" style={{fontSize:"40px"}}></i>
                        </div>
                        <div className='d-flex flex-column'>
                            <p 
                                className='text-secondary fw-bold' 
                                style={{borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                            >   
                                Director 
                            </p>
                            <p 
                                className='text-light w-100' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.Director} 
                            </p>
                        </div>
                    </div>
                    <div className='border border-3 border-secondary d-flex justify-content-around pt-2 mt-3' style={{borderRadius:"20px", width:"80%", height:"100px"}}>
                        <div className='p-2'>
                            <i className="bi bi-star" style={{fontSize:"40px"}}></i>
                        </div>
                        <div className='d-flex flex-column p-2'>
                            <p 
                                className='text-secondary fw-bold' 
                                style={{borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                            >   
                                Rating 
                            </p>
                            <p 
                                className='text-light w-100' 
                                style={{width:"75px", borderRadius:"15px", opacity:"0.90", fontSize:"15px"}}
                                >   
                                {movie.imdbRating} 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
};

export default SingleMovie;