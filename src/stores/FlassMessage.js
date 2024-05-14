import { defineStore } from 'pinia'

export const useFlashMessage = defineStore('flashMessage', {
    state: () => ({
        messages: [],
        timeout: 5,  // Timeout in seconds
    }),
    actions: {
        addMessage(message) {
            this.messages.push({
                message
            });
        },
        resetMessage() {
            this.messages = [];
        }
    }
})
