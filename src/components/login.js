import React, { useState } from 'react';
import { toast } from 'react-toastify';
const axios = require('axios');

function Login(props) {

    const initialStateValues = {
        username: '',
        password: '',
        confirmPassword: '',
    }
    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    };

    const handleSubmit = async e => {
        console.log(props.signin)
        e.preventDefault();
        if (!values.username || !values.password) {
            toast('Please complete form', { type: 'info', autoClose: 2000 });
            return;
        }
        if (props.signin) {
            try {
                let result = await axios.post('http://localhost:4000/signin', values);
                toast('WELCOME BACK ' + result.data.user.username.toUpperCase(), {type: 'success', autoClose: 2000});
                console.log('result : ', result.data.user._id); 
                props.isLogged(true);
                props.actualUser(result.data);
            } catch (err) {
                console.log(err)
                toast('Password or username incorrect', { type: 'error', autoClose: 2000 });
            }
        } else {
            if (values.password != values.confirmPassword) {
                console.log('object')
                toast('Passwords must match', { type: 'error', autoClose: 2000 });
                return;
            }
            try {
                let result = await axios.post('http://localhost:4000/signup', values);
                toast(result.data, { type: 'success', autoClose: 2000 });
                console.log(result);
                props.isLogged(true);
            } catch (err) {
                console.log(err)
                toast('username already taken', { type: 'warning', autoClose: 2000 });
            }
        }
    }

    return (
        <div className="container">
            <form className="card card-body m-auto col-4" onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" onChange={handleInputChange} id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={handleInputChange} id="exampleInputEmail1"/>
                </div>
                {!props.signin ?
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" onChange={handleInputChange} id="exampleInputEmail1"/>
                    </div>
                    : null
                }
                <button className="btn btn-primary btn-block">
                    {props.signin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    )
}

export default Login
