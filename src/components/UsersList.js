import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteUser } from "../core/services/UsersService";
import { getAllUsers } from "../core/services/UsersService"
import './UsersList.css';

export function UsersList(props){

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(response => {
            setUsers(response.data);
        })
    }, []);

    const onDelete = (id) => {
         deleteUser(id).then(() => {
             setUsers((prevState) => {
                 return prevState.filter(u => u.id !== id);
             })
         });
    }

    return(
        <div className="users-container">
            <h1>Users List</h1>
            <Link to="/rent-page">Rent page</Link> | 
            <Link to="/create-new-admin">Create new admin</Link>   
            <table className = "users-table">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Admin</th>
                    <th>Del</th>
                </tr>
                {
                 users.map(users => {
                     return <tr>
                         <td>{users.firstName}</td>
                         <td>{users.lastName}</td>
                         <td>{users.email}</td>
                         <td>{users.phoneNumber}</td>
                         <td>{users.isAdmin.toString()}</td>
                         <td><button className="btn btn-primary" onClick={()=>{onDelete(users.id)}}>Delete</button></td>
                    </tr>
                      
                    })
                }
            </table>
        </div>
        
    );
}