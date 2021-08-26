import React, { useEffect, useState } from 'react'

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
        console.log('object')
    }

    return (
        <div className="container">
            <form className="card card-body m-auto col-4" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" onChange={handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                    <input type="text" className="form-control" name="description" onChange={handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Gender</label>
                    <input type="text" className="form-control" name="gender" onChange={handleInputChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <button className="btn btn-primary btn-block">
                    {props.signin ? 'Save' : 'Update'}
                </button>
            </form>
        </div>
    )
}

export default MovieForm
