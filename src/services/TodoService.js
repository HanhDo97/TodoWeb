import axios from 'axios';
import { useFlashMessage } from '@/stores/FlassMessage';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/todos`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    create(todo, user) {
        const token = localStorage.getItem('token');
        const data = {
            'title': todo.title,
            'user_id': user.id
        }
        httpClient.post('', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            const flashMessage = useFlashMessage();
            flashMessage.addMessage('Synchronized')
        }).catch(error => {
            console.log(error);
        });
    },
    update(data){
        const token = localStorage.getItem('token');
        httpClient.put(`/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            const flashMessage = useFlashMessage();
            flashMessage.addMessage('Synchronized')
        }).catch(error => {
            console.log(error);
        });
    }
}