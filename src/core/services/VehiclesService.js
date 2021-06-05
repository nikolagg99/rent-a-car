import axios from 'axios';

const apiUrl = 'https://my-json-server.typicode.com/nikolagg99/json-server-rent-a-car';

export function getAllVehicles(){
    return axios.get(`${apiUrl}/vehicle`)
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/vehicle/${id}`);
}


/**
 * 
 * @param {id} id = > the id of the user that should be deleted
 */
 export function deleteVehicle(id){
    return axios.delete(`${apiUrl}/vehicle/${id}`);
}

/**
 * 
 * @param {vehicleData} vehicleData => holds all of the info for the vehicle
 */
export async function addVehicle(vehicleData){
    vehicleData = {
        ...vehicleData
    };

    return axios.post(`${apiUrl}/vehicle`, vehicleData);
}

/**
 * 
 * @param {vehicleData} vehicleData => holds the info about the vehicle we are going to edit
 */
 export function editVehicle(vehicleData){
    return axios.put(`${apiUrl}/vehicle/${vehicleData.id}`, vehicleData)
}