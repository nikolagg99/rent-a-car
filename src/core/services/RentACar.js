import axios from 'axios';

const apiUrl = 'http://Localhost:3000';

export async function rent(rentData){
    rentData={
        ...rentData
    }

    return axios.post(`${apiUrl}/rented`, rentData);
}