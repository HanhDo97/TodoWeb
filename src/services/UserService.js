import HttpService from './HttpService';
import MessageService from './MessageService';
import TokenService from './TokenService';
import { useFlashMessage } from '@/stores/FlassMessage';
import { useNotificationStore } from '@/stores/notification';

export default {
    async getNotifications() {
        const useNotiStore = useNotificationStore();
        let url = `/user/notifications`
        await HttpService.sendGetRequest(url)
            .then(res => {
                useNotiStore.updateReadMess(res.data.readMess);
                useNotiStore.updateUnReadMess(res.data.unReadMess);
            })
            .catch(error => MessageService.addErrorMessage(error))

    },
    async getInfor() {
        const response = await HttpService.sendGetRequest('/user/get')
        return response.data;

    },
    async searchEmailOrName(emailOrName) {
        const response = await HttpService.sendGetRequest('/user/s_e_n?qrTxt=' + emailOrName);

        return response;
    },

    async inviteUserToBoard(rol, user, project) {

        let url = `/user/i_u?uI=${user.id}&rC=${rol.code}&pI=${project.id}`
        await HttpService.sendGetRequest(url)
            .then(res => MessageService.addSuccessMessage(res.data.message, 10))
            .catch(() => MessageService.addErrorMessage('Error occurred'));
    },

    logOut() {
        const token = localStorage.getItem('token');
        return TokenService.revokeToken(token);
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
