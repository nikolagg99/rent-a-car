import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { createNewAdmin } from "../core/services/AuthService";
import "./CreateAdmin.css";

export function CreateAdmin(props){

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
        
        createNewAdmin(userData).then(_ => {
            console.log('Success!!!');
            setRedirect(true);
        })
        .catch(err => console.error(err));
   }

    return(
        <>
        {redirect && <Redirect to='/users-list'/>}
        <div className="create-admin-form-wrapper">
            <form className="create-admin-form" onSubmit={onSubmit}>
            <h1>Create Admin</h1>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" id="firstName" name="firstName" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" id="lastName" name="lastName" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" id="phoneNumber" name="phoneNumber" className="form-control" onChange={onInputChange}/>
                </div>
                <button className="btn btn-primary">Register</button><br/>
                <Link to="/login">Login</Link>
            </form>

        </div>
        </>
    );
}