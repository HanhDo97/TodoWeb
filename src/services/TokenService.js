import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8888/api/token',
    withCredentials:false,
    headers:{
        'Content-Type':'application/json'
    }
});

export default {
    getToken(credential){
        return httpClient.post('/get', credential);
    }
}