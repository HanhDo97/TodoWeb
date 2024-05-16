import { useFlashMessage } from '@/stores/FlassMessage';

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
    updateMessageSuccess, updateErrorMessage, addMessageLoading
}