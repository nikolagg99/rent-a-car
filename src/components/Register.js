import { useState } from "react"
import { register } from "../core/services/AuthService";
import "./Register.css";
import {Link, Redirect} from 'react-router-dom';

export function Register(props){

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
         
         register(userData).then(_ => {
             console.log('Success!!!');
             setRedirect(true);
         })
         .catch(err => console.error(err));
    }

    return(
        <>
        {redirect && <Redirect to='/login'/>}
        <div className="register-form-wrapper">
            <form className="register-form" onSubmit={onSubmit}>
            <h1>Register</h1>
                <div className="form-group">
                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="firstName">First Name:</label>
                </div>
                <div className="form-group">
                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="lastName">Last Name:</label>
                </div>
                <div className="form-group">
                    <input type="email" id="email" name="email" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="email">Email:</label>
                </div>
                <div className="form-group">
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="password">Password:</label>
                </div>
                <div className="form-group">
                    <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" onChange={onInputChange}/>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                </div>
                <button className="btn btn-primary">Register</button><br/>
                <Link className="login-link" to="/login">Login</Link>
            </form>

        </div>
        </>
    )
}