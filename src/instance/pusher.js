import Pusher from 'pusher-js';

const pusher = new Pusher('c0b8119ef4cba6610a39', {
    cluster: 'ap3',
    encrypted: true,
});

pusher.logToConsole = true;

export { pusher };