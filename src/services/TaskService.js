import axios from 'axios';
import { useFlashMessage } from '@/stores/FlassMessage';
import { useUserStore } from '@/stores/user';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/tasks`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    create(task, todoId) {
        const token = localStorage.getItem('token');
        const data = {
            'title': task.title,
            'todo_id': todoId
        }
        httpClient.post('', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            const userStore = useUserStore();
            userStore.updateTaskId(res.data.data.todo_id, task.id, res.data.data.id);

            const flashMessage = useFlashMessage();
            flashMessage.addMessage('Synchronized')
        }).catch(error => {
            console.log(error);
        });
    },
    update(data, id){
        const token = localStorage.getItem('token');
        httpClient.put(`/${id}`, data, {
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