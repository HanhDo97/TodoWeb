import { nanoid } from 'nanoid';
import MessageService from './MessageService';
import HttpService from './HttpService';
import { useProjectStore } from '@/stores/project';

export default {
    create(todo, project) {
        const projectStore = useProjectStore();
        const idMessage = nanoid();

        MessageService.addMessageLoading(idMessage)
        const data = {
            'title': todo.title,
            'project_id': project.id,
            'order': todo.order
        }
        HttpService.sendPostRequest('/todos', data, idMessage)
            .then(res => {
                projectStore.updateTodoId(todo.id, res.data.id)
            }).catch(() => {

            });
    },
    update(data) {
        const idMessage = nanoid();
        const token = localStorage.getItem('token');

        MessageService.addMessageLoading(idMessage)
        HttpService.sendPutRequest(`/todos/${data.id}`, data, {
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