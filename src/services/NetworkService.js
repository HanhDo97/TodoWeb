import { useFlashMessage } from '@/stores/FlassMessage';
import router from '@/router/index';

export default {
    errorConnection(err) {
        const flashMessage = useFlashMessage();
        if (err.code == 'ERR_NETWORK') {
            flashMessage.addMessage({ message: 'Can not connect to the server', type: 'error', timeout: 10 })
        }
    },
    unAuthorized(err) {
        if (err.response && err.response.status === 401) {
            const flashMessage = useFlashMessage();
            flashMessage.addMessage({ message: 'Session is expired', type: 'error', timeout: 5 });
            router.push({ name: 'login' });
        }
    },
}