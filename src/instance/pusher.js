import Pusher from 'pusher-js';

const pusher = new Pusher('07f659188e5af9a04330', {
    cluster: 'ap3',
    encrypted: true,
});

pusher.logToConsole = true;

export { pusher };