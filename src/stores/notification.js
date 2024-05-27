import { defineStore } from "pinia";

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        unReadMess: [],
        readMess: []
    }),
    actions: {
        updateUnReadMess(notifications) {
            this.unReadMess = notifications
            
        },
        updateReadMess(notifications) {
            this.readMess = notifications;
        }
    }
})