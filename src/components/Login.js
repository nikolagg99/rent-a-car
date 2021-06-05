import { useState } from "react"
import { login } from "../core/services/AuthService";
import "./Login.css";
import {Link, Redirect} from 'react-router-dom';

export function Login(props){

    const[userData, setUserData] = useState(null);
    const[redirect, setRedirect] = useState(false);
    const onInputChange = (event) =>{
        event.persist();

        setUserData((prevState) =>({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onSubmit = (event) =>{
        event.preventDefault();

        login(userData).then(_ => {
            console.log('Success!!!');
            setRedirect(true);
        })
        .catch(err => console.error(err));
    }

    return(
        <>
        {redirect && <Redirect to='/rent-page'/>}
        <div className="login-form-wrapper">
        <h1>Login</h1>
            <form className="login-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="email" id="email" name="email" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="email">Email:</label>

                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="password">Password:</label>

                </div>
                <button className="btn">Login</button>
                <p>You don't have an account yet? <Link className="register-link" to ="/register">Register now!</Link></p>
            </form>

        </div>
        </>
    )
}