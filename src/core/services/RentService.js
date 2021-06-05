import axios from 'axios';

const apiUrl = 'https://my-json-server.typicode.com/nikolagg99/json-server-rent-a-car';

export function getAllRented(){
    return axios.get(`${apiUrl}/rented`)
}
