import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

function MovieForm(props) {

    const initialStateValues = {
        title: '',
        description: '',
        gender: '',
    }
    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        for (const property in values) {
            if (!values[property]) {
                toast(`Please add ${property}`, {type: 'warning', autoClose: 2000}); return;
            }
        }
        props.addOrEditMovie(values);
        setValues(initialStateValues)
    }

    const getMovieById = async (id) => {
        let movie = await axios.get(`http://localhost:4000/getMovieById/${id}`);
        movie = movie.data.movie[0];
        let movieSelected = {title: movie.title, gender: movie.gender, description: movie.description}
        setValues(movieSelected);
        console.log(values);
    }

    useEffect(() => {
        props.movieId ? getMovieById(props.movieId) : setValues({...initialStateValues});
    }, [props.movieId]);

    return (
        <div className="container">
            <form className="card card-body m-auto col-4" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={handleInputChange} value={values.title}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" onChange={handleInputChange} value={values.description}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender" onChange={handleInputChange} value={values.gender}/>
                </div>
                <button className="btn btn-primary btn-block">
                    {!props.movieId ? 'Add Movie' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default MovieForm
