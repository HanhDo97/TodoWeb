import { useFlashMessage } from '@/stores/FlassMessage';


export default {
    errorConnection(err) {
        const flashMessage = useFlashMessage();
        if (err.code == 'ERR_NETWORK') {
            flashMessage.addMessage({ message: 'Can not connect to the server', type: 'error', timeout: 10 })
        }
    }
}