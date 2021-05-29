import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { getLoggedUser } from '../core/services/AuthService';
import { getAllVehicles } from '../core/services/VehiclesService';
import { rent } from '../core/services/RentACar';
import './RentalCard.css';

export function RentalCard(props){
    const [vehicle, setVehicles] = useState([]);//whole info for the vehicles
    const [valueVehicleType, setVehicleType] = useState('economy');
    const [ValueFuelType, setFuelType] = useState('petrol');
    const [valueNumberOfSeats, setNumberOfSeats] = useState('2');
    const [vehicleInfo, setVehicleInfo] = useState([]);
    const [imageLink, setImageLink] = useState();
    const [pricePerDayForACar, setPrice] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [finalPrice, setFinalPrice] = useState(null);
    const [rentData, setRentData] = useState(null);

    const loggedUser = getLoggedUser();

    useEffect(() => {
        getAllVehicles().then(response => {
            setVehicles(response.data);
        })
    }, []);

    const onInputChange = (event) => {
        event.persist();

        setRentData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const rentDataState = () => {
        setRentData((prevState) => ({
            ...prevState,
            customer:loggedUser.id,
            finalPrice: finalPrice
        }));
    }

     //select start date
     const selectStartDate = (e) =>{
        setStartDate(e.target.value);
    }
    //select end date
    const selectEndDate = (e) =>{
        setEndDate(e.target.value);
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

     //select info from dropdown for vehicle
     const selectVehicleInfo = (e) =>{
        setVehicleInfo(e.target.value)
     }   

     //displaying photo and price for the car
      const getLinkPhoto = () =>{
         var splitArray =  vehicleInfo.toString().split(" ");
         var imageLinkCar;
         var price;
         vehicle.map(
             vehicle => {
                if(vehicle.brand === splitArray[0] && vehicle.model === splitArray[1] && vehicle.constructionYear === splitArray[2]){
                    imageLinkCar = vehicle.picture;
                    price = vehicle.pricePerDay;
                }
             }
         )
         setImageLink(imageLinkCar);
         setPrice(price);
      }

      const calculateFinalPrice = (e) =>{
          var price = 0;
          var firstDate, secondDate;

          firstDate = new Date(startDate);
          secondDate = new Date(endDate);

          var numberOfDays = 0;

          numberOfDays = Math.floor((Date.UTC(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate()) - Date.UTC(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate()) ) /(1000 * 60 * 60 * 24));

          if(numberOfDays > 3){
              price = (numberOfDays * parseInt(pricePerDayForACar)) - ((5/100) * numberOfDays * parseInt(pricePerDayForACar));
              return price;
          }else if(numberOfDays > 5){
              price = (numberOfDays * parseInt(pricePerDayForACar)) - ((7/100) * numberOfDays * parseInt(pricePerDayForACar));
              return price;
          }else if(numberOfDays > 10){
              price = (numberOfDays * parseInt(pricePerDayForACar)) - ((7/100) * numberOfDays * parseInt(pricePerDayForACar));
              return price;
          }else{
              price = numberOfDays * parseInt(pricePerDayForACar);
              return price;
          }

      }

      const calc = () => {
          let price = calculateFinalPrice();
          calculateFinalPrice();
          setFinalPrice(price);
          console.log(finalPrice);
      }

      const rentACar = () => {
          calc();
          rentDataState();

          rent(rentData).then(_ => {
              setRedirect(true);
          }).catch(err => console.error(err));
      }

    return(
        <>
        {redirect && <Redirect to='/rent-page'/>}
        <div className="rental-card-container" >
                 <div className="filter-container">
                     <label htmlFor="vehicleTypes"><b>Vehicle types: </b></label>
                     <select className="select-vehicle-types" onChange={selectVehicleType} defaultValue="economy">
                        <option value="economy">economy</option>
                        <option value="estate">estate</option>
                         <option value="luxury">luxury</option>
                         <option value="SUV">SUV</option>
                         <option value="cargo">cargo</option>
                     </select>
                 </div>
                
                 <div className="filter-container">
                     <label htmlFor="fuelType"><b>Fuel type: </b></label>
                     <select onChange={selectFuelType} defaultValue="petrol">
                         <option value="petrol">petrol</option>
                         <option value="diesel">diesel</option>
                         <option value="hybrid">hybrid</option>
                         <option value="electric">electric</option>
                     </select>
                 </div>     

                 <div className="filter-container">
                     <label htmlFor="numberOfSeats"><b>Number of seats: </b></label>
                     <select onChange={selectNumberOfSeats} defaultValue="2">
                         <option value="2">2</option>
                         <option value="3">3</option>
                         <option value="5">5</option>
                     </select>
                 </div>

                 <hr></hr>

                 <div className="vehicle-container">
                     <label htmlFor="vehicle"><b>Vehicle: </b></label>
                     <select className="vehicle-dropdown" name="vehicle" onChange = {e => {selectVehicleInfo(e);getLinkPhoto(e); onInputChange(e)}} onClick={getLinkPhoto}>
                         {
                             vehicle.map(vehicle=>{
                                 if(vehicle.vehicleType === valueVehicleType && vehicle.fueltype === ValueFuelType && vehicle.numberOfSeats === Number(valueNumberOfSeats)){
                                    return <option key={vehicle.brand}>{vehicle.brand} {vehicle.model} {vehicle.constructionYear}</option>
                                 }
                             })
                         }
                         
                     </select>
                 </div>

                 <hr></hr>

                 <div className="vehicle-presentation-container">
                     <div className="image-container">
                         <img 
                         src={imageLink} 
                         className="image-car"
                         alt="Choose a car"/>
                     </div>

                     <div className="price-container">
                         <p className="priceParagraph"><b>Price per day:</b>{pricePerDayForACar} euro</p>
                     </div>
                 </div>
                 <hr></hr>

                 <div className="rental-duration-container">
                    <div className="date-container">
                        <label htmlFor="startDate"><b>Start Date: </b></label>
                        <input type="date" className="input-date" id="startDateAndTime" name="startDateAndTime" onChange={e => {selectStartDate(e); onInputChange(e)}}></input>
                    </div>

                    <div className="date-container">
                        <label htmlFor="endDate"><b>End Date: </b></label>
                        <input type="date" className="input-date" id="endDateAndTime" name="endDateAndTime" onChange={e => {selectEndDate(e);onInputChange(e)}}></input>
                    </div>
                 </div>

                 <hr></hr>

                 <button type="button" className="btn btn-primary" onClick={rentACar} >Rent</button>

             </div>
        </>
    );
}