import axios from 'axios';

const apiUrl = 'http://Localhost:3000';

export function getAllRented(){
    return axios.get(`${apiUrl}/rented`)
}
