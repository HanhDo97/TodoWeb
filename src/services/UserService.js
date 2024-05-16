import axios from 'axios';
import TokenService from './TokenService';
import router from '@/router/index';
import { useFlashMessage } from '@/stores/FlassMessage';

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
        const token = localStorage.getItem('token');
        const response = await httpClient.get('/get', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;

    },
    logOut() {
        const token = localStorage.getItem('token');
        return TokenService.revokeToken(token);
    },
    navigateLoginPage(err) {
        if (err.response && err.response.status === 401) {
            const flassMessage = useFlashMessage();
            flassMessage.addMessage({ message: 'Session is expired' })
            router.push({ name: 'login' });
        }
    },
    isIncorrectCredential(err) {
        const flassMessage = useFlashMessage();
        if (err.response && err.response.status === 500) {
            if (err.response.data.success == false && err.response.error !== '') {
                flassMessage.addMessage({ message: err.response.data.error, type: 'error' });
            }
        }
    }
}
