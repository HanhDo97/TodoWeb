import axios from 'axios';
import { nanoid } from 'nanoid';
import MessageService from './MessageService';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/todos`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

function sendPostRequest(url, data, idMessage) {
    const token = localStorage.getItem('token');

    httpClient.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        MessageService.updateMessageSuccess(idMessage);
    }).catch(() => {
        MessageService.updateErrorMessage(idMessage);
    });
}
export default {
    create(todo, project) {
        const idMessage = nanoid();

        MessageService.addMessageLoading(idMessage)
        const data = {
            'title': todo.title,
            'project_id': project.id,
            'order': todo.order
        }
        sendPostRequest('', data, idMessage);
    },
    update(data) {
        const idMessage = nanoid();
        const token = localStorage.getItem('token');

        MessageService.addMessageLoading(idMessage)
        httpClient.put(`/${data.id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            MessageService.updateMessageSuccess(idMessage);
        }).catch(() => {
            MessageService.updateErrorMessage(idMessage);
        });
    }
}