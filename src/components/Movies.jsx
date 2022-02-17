import React    from 'react';
import { Link } from 'react-router-dom'

function Movies( {movies} ) {

    return (
        <div className="container-fluid">
            <div className="container-fluid text-warning p-4">
                <h3 className="mb-5 mt-3 d-flex justify-content-center border-top border-bottom border-5 border-warning pt-2 pb-2"> Series </h3>
                <div className="d-flex flex-wrap justify-content-center">
                    {movies.length >= 1 ? movies.map((movie, i) => {
                        return (
                            <div key={i}>
                                {movie.Type === "series"? (
                                    <Link to={`/search/${movie.Title}/${movie.imdbID}`}>
                                        <img className='posters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='Movie poster' />
                                    </Link>
                                ) : null

                                }  
                            </div>
                        )
                    }) : null
                    }
                    
                    {movies.find(movie => movie.Type === "series") ? null : <i className='text-danger'>No matches found.</i>}
                </div>
            </div>
            
            <div className="container-fluid text-warning p-5">
                <h3 className="mb-5 mt-3 d-flex justify-content-center border-top border-bottom border-5 border-warning pt-2 pb-2"> Movies </h3>
                <div className="d-flex flex-wrap justify-content-center">
                    {movies.length >= 1? movies.map((movie, i) => {
                        return (
                            <div key={i}>
                                {movie.Type === "movie"? (
                                    <Link to={`/search/${movie.Title}/${movie.imdbID}`}>
                                        <img className='posters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='Movie poster' />
                                    </Link>
                                ) : null
                                }
                            </div>
                        )
                    }) : null
                    }
                     {movies.find(movie => movie.Type === "movie") ? null : <i className='text-danger'>No matches found.</i>}
                </div>
            </div>
        </div>
    )
}

export default Movies;