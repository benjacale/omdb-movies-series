import React  from 'react';
import {Link} from 'react-router-dom'

function Movies({movies}) {
    return (
        <div className="movies">
            {movies? movies.map((movie,i) => {
                return (
                    <div key={i}>
                        <Link to={`/search/${movie.Title}/${movie.imdbID}`}>
                            <img className='posters' src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png' : movie.Poster} alt='movie poster' />
                        </Link>
                    </div>
                )
            }) : <h5>No matches found</h5>}
        </div>
    )
}

export default Movies;