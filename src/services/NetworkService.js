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
            const flassMessage = useFlashMessage();
            flassMessage.addMessage({ message: 'Session is expired' })
            router.push({ name: 'login' });
        }
    },
}