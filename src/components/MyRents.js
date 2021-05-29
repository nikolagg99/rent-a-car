import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLoggedUser } from "../core/services/AuthService";
import { getAllRented } from "../core/services/RentService";
import './MyRents.css';

export function MyRents(props){

    const [rented, setRented] = useState([]);

    const loggedUser = getLoggedUser();

    useEffect(() => {
        getAllRented().then(response => {
                setRented(response.data);                   
        })
    }, []);

    return(
        <div className="rent-container">
            <Link to="/rent-page">Back to rent page</Link>
            <table className="rent-table">
                <tr>
                    <th>Picture</th>
                    <th>Vehicle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Rent days</th>
                    <th>Final price</th>
                </tr>
                {
                    rented.map(rented =>{
                        if(loggedUser.id === rented.customer){
                            return(
                                <tr>
                                <td><img src={rented.picture}/></td>
                                <td>{rented.vehicle}</td>
                                <td>{rented.startDateAndTime}</td>
                                <td>{rented.endDateAndTime}</td>
                                <td>{rented.rentDays}</td>
                                <td>{rented.price}</td>
                            </tr>
                            ) 
                        }    
                    })
                }

            </table>
        </div>
    );
}