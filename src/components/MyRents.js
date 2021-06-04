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
            <div className="rents-header">
                <h1>Rented cars</h1>
                <Link to="/rent-page">Back to rent page</Link>
            </div>
            <table className="rent-table">
                <thead>
                <tr>
                    <th>Picture</th>
                    <th>Vehicle</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Rent days</th>
                    <th>Final price</th>
                </tr>
                </thead>
                <tbody>
                {
                    rented.map(rented =>{
                        if(loggedUser.id === rented.customer){
                            return(
                                <tr key={rented.id}>
                                <td className="my-rents-td"><img alt="not found" src={rented.picture}/></td>
                                <td className="my-rents-td">{rented.vehicle}</td>
                                <td className="my-rents-td">{rented.startDateAndTime}</td>
                                <td className="my-rents-td">{rented.endDateAndTime}</td>
                                <td className="my-rents-td">{rented.rentDays}</td>
                                <td className="my-rents-td">{rented.finalPrice} euro</td>
                            </tr>
                            ) 
                        }else{
                            return null;
                        }    
                    })
                }
                </tbody>

            </table>
        </div>
    );
}