import React, {useState} from 'react'
import MovieForm from './movieForm';

function Movies() {
    const [movieId, setMovieId] = useState('');
    return (
        <div>
            Hello world
            <MovieForm {...{movieId}}/>
        </div>
    )
}

export default Movies
