import axios from 'axios';
import { useFlashMessage } from '@/stores/FlassMessage';
import { nanoid } from 'nanoid';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/todos`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

function updateMessageSuccess(idMessage) {
    const flashMessage = useFlashMessage();
    flashMessage.updateMessage(idMessage, {
        message: 'Synchronized',
        type: 'success'
    });
}
function updateErrorMessage(idMessage) {
    const flashMessage = useFlashMessage();
    flashMessage.updateMessage(idMessage, {
        message: 'Error occurred, your changes wil not be saved',
        type: 'error'
    });
}
function addMessageLoading(idMessage) {
    const flashMessage = useFlashMessage();
    flashMessage.addMessage({
        message: 'Synchronizing',
        type: 'loading',
        isLoading: true,
        id: idMessage
    });
}

export default {
    create(todo, user) {
        const idMessage = nanoid();

        addMessageLoading(idMessage)
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
            updateMessageSuccess(idMessage);
        }).catch(() => {
            updateErrorMessage(idMessage);
        });
    },
    update(data) {
        const idMessage = nanoid();
        const token = localStorage.getItem('token');

        addMessageLoading(idMessage)
        httpClient.put(`/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            updateMessageSuccess(idMessage);
        }).catch(() => {
            updateErrorMessage(idMessage);
        });
    }
}