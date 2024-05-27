import { defineStore } from 'pinia'
import { io } from "socket.io-client";

export const useSocketStore = defineStore('socket', {
    state: () => ({
        socket: null,
        baseUrl: import.meta.env.VITE_BASE_SOCKET_URL,
    }),
    actions: {
        setup(url) {
            this.socket = io(this.baseUrl + url);
        },
        onConnect() {
            this.socket.on('connect', () => {
                console.log('Websocket connected');
            });
        },
        emit(event, data) {
            this.socket.emit(event, data);
        },
        listenEvent(event, callback) {
            this.socket.on(event, callback);
        },
        disconnect() {
            if (this.socket) {
                this.socket.disconnect();
                this.connected = false;
            }
        },
        checkReciver(userId, toUser) {
            return 'UserId_' + userId == toUser;
        }

    }
})
