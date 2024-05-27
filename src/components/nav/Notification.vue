<script setup>
import { onMounted, ref, onUpdated } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import { storeToRefs } from 'pinia';
import Card from './notification/card.vue';

const useNotification = useNotificationStore();
const { unReadMess, readMess } = storeToRefs(useNotification);
const props = defineProps(['bottom', 'right', 'top']);
const showSlideDown = ref(false);
const navNotificationWrapperEle = ref(null);
const emit = defineEmits(['onClickOutSide'])
const show = ref(false);
const unread = ref(false);

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        show.value = true;
    }, 0);
});
onUpdated(() => {
    navNotificationWrapperEle.value = document.getElementsByName('nav-notification-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navNotificationWrapperEle.value !== undefined && navNotificationWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
function toggleNotification(ev) {
    unread.value = !unread.value;

    ev.stopPropagation();
}
</script>
<template>
    <div name="nav-notification-wrapper" :class="{ 'nav-notification-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': props.top, 'right': props.right }">
        <Transition name="notification">
            <div v-if="show" class="notification-container">
                <div class="nav">
                    <div class="title">
                        <h3>Notifications</h3>
                    </div>
                    <div class="action">
                        <small>Only show unread</small>
                        <div class="toggle-wrapper">
                            <div @click="toggleNotification($event)" class="toggle">
                                <div class="icon-01" :class="{ 'unread': unread }">
                                    <font-awesome-icon v-if="unread" icon="fa-solid fa-xmark" />
                                    <font-awesome-icon v-else icon="fa-solid fa-check" />
                                </div>
                                <div class="icon-02" :class="{ 'read': unread }">
                                </div>
                            </div>
                        </div>
                        <button>
                            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
                        </button>
                    </div>
                </div>
                <div class="content">
                    <div class="notification">
                        <div v-if="!unread" class="unread-wrapper">
                            <div v-if="unReadMess.length == 0" class="empty-notification">
                                <img src="/src/assets/sleep.png" alt="">
                                <h2>No unread notifications</h2>
                            </div>
                            <p v-else v-for="message in unReadMess" :key="message.userId">
                                <Card :message="message" />
                            </p>
                        </div>
                        <div v-else class="read-wrapper">
                            <div v-if="readMess.length == 0" class="empty-notification">
                                <img src="/src/assets/sleep.png" alt="">
                                <h2>No notifications</h2>
                            </div>
                            <p v-else v-for="message in readMess" :key="message.userId">
                                {{ message.data.message }}
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </Transition>
    </div>
</template>

<style>
.notification-container .content img {
    width: 100%;
}

.notification-container .content {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    overflow: auto;
    overflow-x: hidden;
    height: 85%;
}

.notification-container .content .empty-notification {
    width: 300px;
    height: 300px;
    margin-top: .5rem;
    text-align: center;
}

.notification-container {
    height: 400px;
}

.nav {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    align-items: center;
    height: 50px;
}

.action button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 5px;
    border: none;
}

.action button:hover {
    background-color: var(--color-hover);
    cursor: pointer;
    color: whitesmoke;
}

.action {
    display: flex;
    gap: 10px;
    align-items: center;
}

.action .toggle {
    display: flex;
    width: 50px;
    height: 20px;
    background-color: #4BCE97;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    border: 2px solid rgb(112, 116, 118);
}

.unread {
    transform: translateX(250%);
}

.read {
    transform: translateX(-200%);
}

.action .toggle:hover {
    cursor: pointer;
    background-color: hsl(155, 57%, 55%, 0.8);
}

.action .toggle .icon-01 {
    font-size: 14px;
    text-align: center;
    height: 20px;
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    transition: transform 0.3s ease;
}

.action .toggle .icon-02 {
    width: 15px;
    background-color: black;
    border-radius: 50%;
    height: 15px;
    transition: transform 0.3s ease;
    margin-right: 1px;
}

.notification-enter-active {
    transition: transform 0.5s ease;
}

.notification-enter-from {
    transform: translateY(-20%);
}

.nav-notification-wrapper {
    width: 450px;
    position: absolute;
    z-index: 100;
    background-color: whitesmoke;
    color: black;
    box-shadow: 0px 2px 6px 0 rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    transform-origin: top;
    transform: scale(1, 0.1);
    opacity: 0;
    transition: 300ms cubic-bezier(0.25, 0.8, 0.25, 1);
    padding: 10px;
}

.slide-down {
    transform: scale(1, 1);
    opacity: 1;
}
</style>