import axios from 'axios';

const apiUrl = 'https://my-json-server.typicode.com/nikolagg99/json-server-rent-a-car';

export async function rent(rentData){
    rentData={
        ...rentData
    }

    return axios.post(`${apiUrl}/rented`, rentData);
}
