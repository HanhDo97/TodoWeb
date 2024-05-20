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
function addErrorMessage(message) {
    const flashMessage = useFlashMessage();
    flashMessage.addMessage({
        message: message,
        type: 'error'
    });
}
function addSuccessMessage(message, timeout = 5) {
    const flashMessage = useFlashMessage();
    flashMessage.addMessage({
        message: message,
        type: 'success',
        timeout: timeout
    });
}

export default {
    updateMessageSuccess, updateErrorMessage, addMessageLoading, addErrorMessage, addSuccessMessage
}