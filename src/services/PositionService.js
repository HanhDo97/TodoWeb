import MessageService from "./MessageService";
import axios from 'axios';
import { nanoid } from 'nanoid';
import HttpService from "./HttpService";
import NetworkService from "./NetworkService";

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/position`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

function updateTask(list,task) {
    const idMessage = nanoid();
    MessageService.addMessageLoading(idMessage);

    let data= {
        taskId: task.id,
        list
    }


    HttpService.sendPostRequest('/position/tasks', data)
        .then(() => {
            MessageService.updateMessageSuccess(idMessage);
        }).catch((err) => {
            NetworkService.unAuthorized(err);
            MessageService.updateErrorMessage(idMessage)
        });
}
function updateTodos(data) {
    const idMessage = nanoid();
    MessageService.addMessageLoading(idMessage);
    const token = localStorage.getItem('token');

    httpClient.post('/todos', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(() => {
        MessageService.updateMessageSuccess(idMessage);
    }).catch((err) => {
        NetworkService.unAuthorized(err)
        MessageService.updateErrorMessage(idMessage);
    });
}

export default {
    updateTodos, updateTask
}