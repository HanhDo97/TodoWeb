import { nanoid } from 'nanoid';
import { useProjectStore } from '@/stores/project';
import MessageService from './MessageService';
import HttpService from './HttpService';

export default {
    create(task, todoId) {
        const idMessage = nanoid();
        const data = {
            'title': task.title,
            'todo_id': todoId
        }

        MessageService.addMessageLoading(idMessage);
        HttpService.sendPostRequest('/tasks', data)
            .then((res) => {
                const projectStore = useProjectStore();
                projectStore.updateTaskId(res.data.todo_id, task.id, res.data.id);

                MessageService.updateMessageSuccess(idMessage);
            }).catch(() => {
                MessageService.updateErrorMessage(idMessage)
            });
    },
    update(data, id) {
        const idMessage = nanoid();

        MessageService.addMessageLoading(idMessage);
        HttpService.sendPutRequest(`/tasks/${id}`, data).then(() => {
            MessageService.updateMessageSuccess(idMessage);
        }).catch(() => {
            MessageService.updateErrorMessage(idMessage);
        });
    }
}