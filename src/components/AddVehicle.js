import { useState } from "react";
import { addVehicle } from "../core/services/VehiclesService";
import {Link, Redirect} from 'react-router-dom';
import "./AddVehicle.css";

export function AddVehicle(props){
    const[vehicleData, setVehicleData] = useState(null);
    const[redirect, setRedirect] = useState(false);

    const [valueVehicleType, setVehicleType] = useState('economy');
    const [ValueFuelType, setFuelType] = useState('petrol');
    const [valueNumberOfSeats, setNumberOfSeats] = useState('2');

    const onInputChange = (event) =>{
         event.persist();

         setVehicleData((prevState) =>({
             ...prevState,
             [event.target.name]: event.target.value,
             vehicleType:valueVehicleType,
             fueltype: ValueFuelType,
             numberOfSeats: valueNumberOfSeats
         }));
    }

    const onSubmit = (event) =>{
         event.preventDefault();
         
         addVehicle(vehicleData).then(_ => {
             console.log('Success!!!');
             setRedirect(true);
         })
         .catch(err => console.error(err));
    }

    //select vehicle type
    const selectVehicleType = (e) =>{
        setVehicleType(e.target.value);
    }

    // //select fuel type
     const selectFuelType = (e) =>{
        setFuelType(e.target.value)     
     }

    // //select number of seats
     const selectNumberOfSeats = (e) =>{
        setNumberOfSeats(e.target.value)
     }   

    return(
        <>
        {redirect && <Redirect to='/vehicles-list'/>}
        <div className="add-vehicle-form-wrapper">
            <form className="add-vehicle-form" onSubmit={onSubmit}>
            <h1>Add Vehicle</h1>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input type="text" id="model" name="model" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="constructionYear">Construction Year</label>
                    <input type="text" id="constructionYear" name="constructionYear" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="vehicleType">Type:</label>
                    <select name="vehicleType" className="form-control" defaultValue="vehicleType" onChange={selectVehicleType}>
                        <option value="economy">economy</option>
                        <option value="estate">estate</option>
                         <option value="luxury">luxury</option>
                         <option value="SUV">SUV</option>
                         <option value="cargo">cargo</option>
                     </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fueltype">Fuel Type:</label>
                    <select name="fueltype" className="form-control" defaultValue="petrol" onChange={selectFuelType}>
                         <option value="petrol">petrol</option>
                         <option value="diesel">diesel</option>
                         <option value="hybrid">hybrid</option>
                         <option value="electric">electric</option>
                     </select>
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfSeats">Number of Seats:</label>
                    <select name = "numberOfSeats" className="form-control" defaultValue="2" onChange={selectNumberOfSeats}>
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="5">5</option>
                     </select>
                </div>
                <div className="form-group">
                    <label htmlFor="picture">Picture:</label>
                    <input type="text" id="picture" name="picture" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="pricePerDay">Price per day:</label>
                    <input type="text" id="pricePerDay" name="pricePerDay" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="count">Count:</label>
                    <input type="text" id="count" name="count" className="form-control" onChange={onInputChange}/>
                </div>
                <button className="btn btn-primary">Add</button><br/>
                <Link to="/vehicles-list">Vehicles</Link>
            </form>

        </div>
        </>
    )
}