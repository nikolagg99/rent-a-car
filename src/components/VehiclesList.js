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
            <div className="vehicles-table-header">
                <h1>Vehicles List</h1>
                <Link to="/add-vehicle">Add new</Link>|
                <Link to="/rent-page">Rent page</Link>
            </div>
           
            <table className = "vehicles-table">
                <thead>
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
                </thead>
                <tbody>
                {
                 vehicles.map(vehicles => {
                     return <tr key={vehicles.id}>
                         <td><img className="vehicle-img" alt="Not found" src={vehicles.picture}/></td>
                         <td>{vehicles.brand}</td>
                         <td>{vehicles.model}</td>
                         <td>{vehicles.constructionYear}</td>
                         <td>{vehicles.vehicleType}</td>
                         <td>{vehicles.fueltype}</td>
                         <td>{vehicles.numberOfSeats}</td>
                         <td>{vehicles.pricePerDay} &euro;</td>
                         <td>{vehicles.count}</td>
                         <td>
                         <button className="btn btn-primary" onClick={()=>{onDelete(vehicles.id)}}>Delete</button>
                         <Link to={{
                             pathname: `edit-vehicle`,
                             state: vehicles.id
                         }}
                         >Edit Vehicle</Link>
                         </td>
                    </tr>
                      
                    })
                }
                </tbody>
               
            </table>
        </div>
        
    );
}