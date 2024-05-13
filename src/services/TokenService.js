import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'http://localhost:8888',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    async getToken(credential) {
        return httpClient.get('/sanctum/csrf-cookie').then(() => {
            return httpClient.post('/api/token/get', credential);
        });
    },

    revokeToken(token) {
        return httpClient.get('/api/token/revoke', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
