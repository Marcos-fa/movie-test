import React, { useEffect, useState } from 'react'
import MovieForm from './movieForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';



function Movies(props) {

    const initialStateValues = {
        userId: '',
        movieId: '',
        comment: '',
    }

    const [movieId, setMovieId] = useState('');
    const [Movies, setMovies] = useState([]);
    const [idTextComment, setIdTextComment] = useState('');
    const [comment, setComment] = useState(initialStateValues);

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
            toast('Movie Removed Successfully', { type: 'info', autoClose: 2000 })
            getMovies();
        }
    }

    const getMovies = async () => {
        let movies = await axios.get('http://localhost:4000/getmovies');
        // console.log(movies);
        if (movies.data !== '404, page not found') {
            setMovies(movies.data.movies)
        }
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setComment({ ...comment, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!comment.comment) {
            toast(`Please add comment`, {type: 'warning', autoClose: 2000}); 
        }else{
            console.log(comment);
            let result = await axios.post('http://localhost:4000/addComment', comment);
            console.log(result)
            toast('Comment added Successfully', { type: 'success', autoClose: 2000 })
        }
        
    }

    const addCommentSelect = (id) => {
        setIdTextComment(id);
        setComment({...comment, movieId: id})
    }

    useEffect(() => {
        console.log('Entra a useEffect',props.user)
        if (props.user.user) {
            setComment( { ...comment, userId: props.user.user._id});
        }
        getMovies();
    }, [props.user]);

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
                            <div className="d-flex flex-row justify-content-between">
                                <div onClick={() => addCommentSelect(movie._id)}>Add comment</div>
                                <div>show comments</div>   
                            </div>
                            {idTextComment === movie._id?
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label className="form-label">Comment</label>
                                        <textarea name="comment" rows="3" className="form-control" placeholder="Write a comment"
                                            onChange={handleInputChange} value={comment.comment} ></textarea>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger" onClick={() => setIdTextComment('')} >Cancel</button>
                                        <button className="btn btn-primary" type="submit" onSubmit={handleSubmit}>Add</button>
                                    </div>
                                </form>
                                :null
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies
