import {useEffect, useState} from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { getLoggedUser, logout } from '../core/services/AuthService';
import { getUserById } from '../core/services/UsersService';
import './UserCard.css';

export function UserCard(user) {

    const[redirect, setRedirect] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const loggedUser = getLoggedUser(null);

    useEffect(()=>{
        getUserById(loggedUser.id).then((response) => {
            setUserInfo(response.data)
        })
      }, [loggedUser.id])

    const Logout = () => {
        logout();
        setRedirect(true);
    }

            return(
                <>
                {redirect && <Redirect to ="/login" />}
                <div className="user-card-container">
                    <p className="menu-item"><b>Name: </b>{userInfo.firstName} {userInfo.lastName}</p>
                    <p className="menu-item"><b>Email:</b> {userInfo.email}</p>
                    <p className="menu-item"><b>Phone Number:</b>{userInfo.phoneNumber}</p>
                    <div className="dropdown menu-item">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <p className="menu-button" onClick={Logout}><Link to ="/login"><b>Logout</b></Link></p>
                            <p className="menu-button" ><Link to ="/edit-account"><b>Edit account</b></Link></p>
                            {loggedUser.isAdmin && <p className="menu-button" ><Link to ="/users-list"><b>Users List</b></Link></p>}
                            {loggedUser.isAdmin && <p className="menu-button" ><Link to ="/vehicles-list"><b>Vehicles List</b></Link></p>}
                            <p className="menu-button" ><Link to ="/my-rents"><b>My rents</b></Link></p>
                        </div>
                    </div>
                </div>
                </>
            );
}
