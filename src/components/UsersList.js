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
            <div className="user-table-header">
                <h1>Users List</h1>
                <Link to="/rent-page">Rent page</Link> | 
                <Link to="/create-new-admin">Create new admin</Link>   
            </div>   
            <table className = "users-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Admin</th>
                    <th>Del</th>
                </tr>
                </thead>
                <tbody>
                {
                 users.map(users => {
                     return <tr key={users.id}>
                         <td className="userCell">{users.firstName}</td>
                         <td className="userCell">{users.lastName}</td>
                         <td className="userCell">{users.email}</td>
                         <td className="userCell">{users.phoneNumber}</td>
                         <td className="userCell">{users.isAdmin.toString()}</td>
                         <td className="userCell"><button className="btn btn-primary" onClick={()=>{onDelete(users.id)}}>Delete</button></td>
                    </tr>
                      
                    })
                }
                </tbody>    
            </table>
        </div>
        
    );
}