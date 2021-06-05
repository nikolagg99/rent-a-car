import { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../core/services/AuthService';
import { editAccount, getUserById } from '../core/services/UsersService';
import './EditAccount.css';

export function EditAccount(props){

    const [editedUser, setEditedUser] = useState({});
    const[shouldRedirect, setShouldRedirect] = useState(false);

    const loggedUser = getLoggedUser();

    useEffect(()=>{
        getUserById(loggedUser.id).then((response) => {
            setEditedUser(response.data)
        })
      }, [loggedUser.id])

    const onInputChange = (event) =>{
        setEditedUser((prevState) =>({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onSubmit =(event) => {
        event.preventDefault();

        editAccount(editedUser).then(_=>{
            console.log('SUCCESS');
            setShouldRedirect(true);
        });

    }

    return(
        <>
        {shouldRedirect && <Redirect to ="/rent-page"/>}
        <div className="edit-account-wrapper">
            <form className="user-edit-form" onSubmit={onSubmit}>
                <h1>Edit profile</h1>
                <div className="form-group">
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" id="firstName" name="firstName" defaultValue={editedUser.firstName} onChange={onInputChange}></input>  
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" id="lastNAme" name="lastName" defaultValue={editedUser.lastName} onChange={onInputChange}></input>
                </div>

                <div className="form-group">
                <label htmlFor="lastName">Email: </label>
                    <input type="email" id="pasword" name="password" defaultValue={editedUser.email} onChange={onInputChange}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="text" id="pasword" name="password" defaultValue={editedUser.password} onChange={onInputChange}></input >
                </div>
                <button className="btn btn-primary">Edit</button>
                <Link to="/rent-page"> Back to rent page</Link>
            </form>

        </div>
        </>
    )

}