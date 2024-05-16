import { defineStore } from 'pinia'

export const useFlashMessage = defineStore('flashMessage', {
    state: () => ({
        messages: [],
    }),
    actions: {
        addMessage({ message, type = 'success', isLoading = false, id = null, timeout = 2 }) {
            this.messages.push({ message, type, isLoading, id, timeout });
        },
        resetMessage() {
            this.messages = [];
        },
        updateMessage(idMess, newMess) {
            let index = this.messages.findIndex(el => el.id == idMess);
            this.messages[index].type = newMess.type;
            this.messages[index].message = newMess.message;
        }
    }
})
