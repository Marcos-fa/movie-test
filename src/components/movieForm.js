import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2';

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
        try {
            let result = await axios.post('http://localhost:4000/add', values);
            console.log(result);
            Swal.fire( 'Good job!', 'You add the movie!', 'success' );
        } catch (err) {
            console.log(err)
        }

        
    }

    return (
        <div className="container">
            <form className="card card-body m-auto col-4" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={handleInputChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" onChange={handleInputChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender" onChange={handleInputChange} aria-describedby="emailHelp" />
                </div>
                <button className="btn btn-primary btn-block">
                    {!props.movieId ? 'Add Movie' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default MovieForm
