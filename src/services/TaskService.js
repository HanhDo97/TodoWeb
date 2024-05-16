import axios from 'axios';
import { useFlashMessage } from '@/stores/FlassMessage';
import { nanoid } from 'nanoid';
import { useProjectStore } from '@/stores/project';

const baseURL = import.meta.env.VITE_BASE_URL
const httpClient = axios.create({
    baseURL: `${baseURL}/api/tasks`,
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
function addMessageLoading(idMessage){
    const flashMessage = useFlashMessage();
    flashMessage.addMessage({
        message: 'Synchronizing',
        type: 'loading',
        isLoading: true,
        id: idMessage
    });
}

export default {
    create(task, todoId) {
        const idMessage = nanoid();
        const token = localStorage.getItem('token');
        const data = {
            'title': task.title,
            'todo_id': todoId
        }

        addMessageLoading(idMessage);
        httpClient.post('', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            const projectStore = useProjectStore();
            projectStore.updateTaskId(res.data.data.todo_id, task.id, res.data.data.id);

            updateMessageSuccess(idMessage);
        }).catch(() => {
            updateErrorMessage(idMessage)
        });
    },
    update(data, id) {
        const idMessage = nanoid();
        const token = localStorage.getItem('token');

        addMessageLoading(idMessage);
        httpClient.put(`/${id}`, data, {
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