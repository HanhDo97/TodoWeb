import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL

const httpClient = axios.create({
    baseURL: baseURL,
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
