import React, { useEffect, useState } from 'react'
import MovieForm from './movieForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';



function Movies() {
    const [movieId, setMovieId] = useState('');
    const [Movies, setMovies] = useState([]);

    const addOrEditMovie = async (values) => {
        try {
            let typeRequest, message;
            if (movieId === '') {
                typeRequest = 'add';
                message = 'You add the movie';
            } else {
                typeRequest = 'update';
                message = 'Movie Updated Successfully';
            }
            let result = await axios.post(`http://localhost:4000/${typeRequest}`, {...values, _id: movieId});
            console.log(result);
            Swal.fire( 'Good job!', message, 'success' );    
            getMovies(); setMovieId('');
        } catch (error) {
            console.error(error);
        }
    }

    const onDeleteMovie = async id => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            await axios.delete(`http://localhost:4000/delete/${id}`);
            toast('Movie Removed Successfully', { type: 'success', autoClose: 2000 })
            getMovies();
        }
    }

    const getMovies = async () => {
        let movies = await axios.get('http://localhost:4000/getmovies');
        console.log(movies);
        if (movies.data != '404, page not found') {
            setMovies(movies.data.movies)
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className="container">
            <MovieForm {...{ addOrEditMovie, movieId }} />
            <div className="container col-md-4 p-2">
                {Movies.map(movie => (
                    <div className="card mb-1" key={movie._id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{movie.title}</h4>
                                <div>
                                    <i className="btn btn-danger" onClick={() => onDeleteMovie(movie._id)} >Delete</i>
                                    <i className="btn btn-primary" onClick={() => setMovieId(movie._id)}>Edit</i>
                                </div>
                            </div>
                            <p>Gender: {movie.gender}</p>
                            <p>Description: {movie.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies
