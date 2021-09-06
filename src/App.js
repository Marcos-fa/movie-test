import React, {useState} from 'react'
import './App.css';
import Login from './components/login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Movies from './components/movies';

function App() {
    const [logged, setLogged] = useState(false);
    const [signin, setSignin] = useState(true);
    const [user, setUser] = useState({});

    const isLogged = async (value) => {
        setLogged(value)
    }

    const actualUser = async (userLogged) => {
        setUser(userLogged);
    }

    const logOut = async () => {
        // let result = await axios.get('http://localhost:4000/logout');
        // console.log(result);
    }
    
    return (
        <div className="App">
            <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <small className="navbar-brand" href="#">Marcos Test</small>
                   
                    {logged ? 
                        <div className="d-flex">
                            <small className="nav-link" type="submit" onClick={() => setSignin(true), () => logOut() }>log Out</small>
                        </div>
                        :
                        <div className="d-flex">
                            <small className="nav-link" type="submit" onClick={() => setSignin(true)}>Sign In</small>
                            <small className="nav-link" type="submit" onClick={() => setSignin(false)}>Sign Up</small>
                        </div>
                    }
                    
                </div>
            </nav>

            { !logged ? <Login {...{signin, isLogged, actualUser}}/> :  <Movies {...{user}}/>}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default App;
