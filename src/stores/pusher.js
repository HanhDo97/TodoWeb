import { pusher } from '@/instance/pusher';
import { defineStore } from 'pinia';
import { useUserStore } from './user';
import { storeToRefs } from 'pinia';
import UserService from '@/services/UserService';

export const usePusherStore = defineStore('pusher', {
    state: () => ({
        messages: [],
        channel: null
    }),
    actions: {
        addMessage(message) {
            this.messages.push(message);
        },
        shouldGetNotifications() {
            const userStore = useUserStore();
            const { infor } = storeToRefs(userStore);
            this.channel = pusher.subscribe('notifications-stored')
            this.channel.bind('NotificationStored', (payload) => {
                if (infor.value.id == payload.data.userId && payload.data.getNotifications) {
                    UserService.getNotifications();
                }
            });
        },
    }
});