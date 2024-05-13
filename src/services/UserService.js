import axios from 'axios';
import TokenService from './TokenService';
import router from '@/router/index'; // Import the router instance

const baseURL = import.meta.env.VITE_BASE_URL

const httpClient = axios.create({
    baseURL: `${baseURL}/api/user`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    async getInfor() {
        try {
            const token = localStorage.getItem('token');
            const response = await httpClient.get('/get', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            this.navigateLoginPage(error); // Call the method to navigate to login page
            throw error; // Re-throw the error for further handling if needed
        }
    },
    logOut() {
        const token = localStorage.getItem('token');
        return TokenService.revokeToken(token);
    },
    navigateLoginPage(err) {
        if (err.response && err.response.status === 401) {
            router.push({ name: 'login' });
        }
    }
}
