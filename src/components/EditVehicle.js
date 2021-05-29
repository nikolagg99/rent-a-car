import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { editVehicle, getVehicleById } from '../core/services/VehiclesService';
import "./EditVehicle.css";

export function EditVehicle(props){
    const[vehicleData, setVehicleData] = useState(null);
    const[redirect, setRedirect] = useState(false);

    const [valueVehicleType, setVehicleType] = useState('economy');
    const [ValueFuelType, setFuelType] = useState('petrol');
    const [valueNumberOfSeats, setNumberOfSeats] = useState('2');

    useEffect(()=>{
        getVehicleById(props.location.state).then((response) => {
            setVehicleData(response.data)
        })
      }, [props.location.state])

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
         
        editVehicle(vehicleData).then(_=>{
            console.log('SUCCESSSSSS');
            setRedirect(true);
        })
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

    if(vehicleData !== null){
        return(
            <>
            {redirect && <Redirect to='/vehicles-list'/>}
            <div className="edit-vehicle-form-wrapper">
                <form className="edit-vehicle-form" onSubmit={onSubmit}>
                <h1>Edit Vehicle</h1>
                    <div className="form-group">
                        <label htmlFor="brand">Brand:</label>
                        <input type="text" id="brand" name="brand" defaultValue={vehicleData.brand} className="form-control" onChange={onInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input type="text" id="model" name="model" defaultValue={vehicleData.model} className="form-control" onChange={onInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="constructionYear">Construction Year</label>
                        <input type="text" id="constructionYear" name="constructionYear" defaultValue={vehicleData.constructionYear} className="form-control" onChange={onInputChange}></input>
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
                        <input type="text" id="picture" name="picture" defaultValue={vehicleData.picture} className="form-control" onChange={onInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pricePerDay">Price per day:</label>
                        <input type="text" id="pricePerDay" name="pricePerDay" defaultValue={vehicleData.pricePerDay} className="form-control" onChange={onInputChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="count">Count:</label>
                        <input type="text" id="count" name="count" defaultValue={vehicleData.count} className="form-control" onChange={onInputChange}></input>
                    </div>
                    <button className="btn btn-primary">Edit</button><br/>
                    <Link to="/vehicles-list">Vehicles</Link>
                </form>
    
            </div>
            </>
        );
    }else{
        return null;
    }
    
}