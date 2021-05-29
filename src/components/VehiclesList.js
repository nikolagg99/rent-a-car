import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { deleteVehicle, getAllVehicles } from "../core/services/VehiclesService";
import './VehiclesList.css';

export function VehiclesList(props){

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
        })
    }, []);

    const onDelete = (id) => {
         deleteVehicle(id).then(() => {
            setVehicles((prevState) => {
                 return prevState.filter(u => u.id !== id);
             })
         });
    }

    return(
        <div className="vehicles-container">
           <h1>Vehicles List</h1>
           <Link to="/add-vehicle">Add new</Link>|
           <Link to="/rent-page">Rent page</Link>
            <table className = "vehicles-table">
                <tr>
                    <th>Picture</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Construction Year</th>
                    <th>Type</th>
                    <th>Fuel</th>
                    <th>Number of seats</th>
                    <th>Price</th>
                    <th>Count</th>
                    <th></th>
                </tr>
                {
                 vehicles.map(vehicles => {
                     return <tr>
                         <td><img alt="Not found" src={vehicles.picture}/></td>
                         <td>{vehicles.brand}</td>
                         <td>{vehicles.model}</td>
                         <td>{vehicles.constructionYear}</td>
                         <td>{vehicles.vehicleType}</td>
                         <td>{vehicles.fueltype}</td>
                         <td>{vehicles.numberOfSeats}</td>
                         <td>{vehicles.pricePerDay}</td>
                         <td>{vehicles.count}</td>
                         <td>
                         <button className="btn btn-primary" onClick={()=>{onDelete(vehicles.id)}}>Delete</button>
                         {/* <Link to="/edit-vehicle">Edit Vehicle</Link> */}
                         <Link to={{
                             pathname: `edit-vehicle`,
                             state: vehicles.id
                         }}
                         >Edit Vehicle</Link>
                         </td>
                    </tr>
                      
                    })
                }
            </table>
        </div>
        
    );
}