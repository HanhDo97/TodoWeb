import { defineStore } from 'pinia'

export const useFlashMessage = defineStore('flashMessage', {
    state: () => ({
        messages: [],
        timeout: 5,  // Timeout in seconds
    }),
    actions: {
        addMessage(message, type = 'success') {
            this.messages.push({
                message, type
            });
        },
        resetMessage() {
            this.messages = [];
        }
    }
})
