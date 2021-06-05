import axios from 'axios';
import {getAllUsers} from './UsersService.js';

const apiUrl = 'https://my-json-server.typicode.com/nikolagg99/json-server-rent-a-car';

/**
 * @returns the logged user or undefined
 */
export function getLoggedUser(){
    return JSON.parse(localStorage.getItem('loggedUser'));
}

/**
 * 
 * @param userData => {username. password}
 */
export async function login(userData){
    const users = await (await getAllUsers()).data;

    const loggedUser = users.find(u => u.username === userData.username && u.password.toString() === userData.password)

    if(loggedUser){
        localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
        return;
    }

    throw new Error('Invalid username/password');
}

/**
 * 
 * @param {userData} userData => holds all of the info for the user
 */
export async function register(userData){
    const user = (await (await getAllUsers()).data)

    if(user.find(u => u.email) === userData.email){
        throw new Error('Email already exists!!!!!!');
    }

    userData = {
        ...userData,
        isAdmin: false
    };

    return axios.post(`${apiUrl}/user`, userData);
}

/**
 * 
 * @param {userData} userData => holds all of the info for the user
 */
 export async function createNewAdmin(userData){
    const user = (await (await getAllUsers()).data)

    if(user.find(u => u.email) === userData.email){
        throw new Error('Email already exists!!!!!!');
    }

    userData = {
        ...userData,
        isAdmin: true
    };

    return axios.post(`${apiUrl}/user`, userData);
}

export function logout(){
    localStorage.removeItem('loggedUser');
}