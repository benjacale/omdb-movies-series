import React, {useContext}   from 'react';
import {useState, useEffect} from 'react';
import axios                 from 'axios';
import {useParams, Link}     from 'react-router-dom';
import {UserContext}         from "../index";
import {useHistory}          from "react-router";


const SingleMovie = () => {
    const history           = useHistory();

    const {user}            = useContext(UserContext);
    const {setUser}         = useContext(UserContext);
    const {movieId}         = useParams();
    const [movie, setMovie] = useState({});
    const [fav, setFav]     = useState(false);

    console.log("USEEEEERRRRR", user)
    console.log("MOVIEEEEEEEE", movie)


    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=ac5f1fca&i=${movieId}`)
        .then(res   => res.data)
        .then(movie => setMovie(movie))
    }, []);

    const handleFav = () => {
        console.log("PELISSS", movie.Title)
        if(!fav) {
            setFav(true)
        } 
        else {
            setFav(false)
        }
        axios.put(`/api/users/${user.id}`, {
            favourites: movie
        })
        .then(res => res.data)
        .then(fav => console.log("FAAAV", fav))
        .catch(err => console.log(err))
    }


    return(
        <div>
            <div className='singleMovie container2'>
                <div class="container">
                    <img className='singlePoster' src={movie.Poster} alt='movie poster'/>
                </div>
                <div class="container">
                    <h1 className='row'> {movie.Title} </h1>
                    <p className='row'> {movie.Genre} </p>
                    <p className='row'> {movie.Runtime} </p>


                    <p className='row'> {movie.Plot}   </p>
                        {/* {console.log("USERR", user.id)}
                        {console.log("FAVOS", user.favourites)} */}
                    {!user.id? (
                            <div className='container'>
                                <p> Add to favourites?</p> 
                                <Link to="/sign-in">
                                    <p> Sign in </p>
                                </Link>
                            </div>
                    ) : (
                            fav? (

                                <div className='container'>
                                    <img className='btnAddFav' onClick={handleFav} src="https://cdn1.iconfinder.com/data/icons/linecon/512/tick-256.png" alt="Remove from Favourites" />
                                    <p> My list </p>
                                </div>
                            ) : (
                                <div className='container'>
                                    <img className='btnAddFav' onClick={handleFav} src="https://cdn1.iconfinder.com/data/icons/dashboard-line-style-1/32/dashboard__Add-256.png" alt="Add to Favourites" />
                                    <p> My list </p>
                                </div>
                            )
                        )
                    } 
                </div>
                <div className='container info'>
                    <p className='row'>Rated:    {movie.Rated}      </p>
                    <p className='row'>Year:     {movie.Year}       </p>
                    <p className='row'>Cast:     {movie.Actors}     </p>
                    <p className='row'>Director: {movie.Director}   </p>
                    <p className='row'>Country:  {movie.Country}    </p>
                    <p className='row'>Rating:   {movie.imdbRating} </p>
                    <p className='row'>Language:   {movie.Language} </p>
                </div>
            </div>
        </div>
    ) 
};

export default SingleMovie;