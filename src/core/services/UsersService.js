import axios from 'axios';

const apiUrl = 'https://my-json-server.typicode.com/nikolagg99/json-server-rent-a-car';

export function getAllUsers(){
    return axios.get(`${apiUrl}/user`)
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/user/${id}`);
}

/**
 * 
 * @param {userData} userData => holds the info about the user we are going to edit
 */
export function editAccount(userData){
    return axios.put(`${apiUrl}/user/${userData.id}`, userData)
}

/**
 * 
 * @param {id} id = > the id of the user that should be deleted
 */
 export function deleteUser(id){
    return axios.delete(`${apiUrl}/user/${id}`);
}