<script setup>
import UserService from '@/services/UserService';
import { onMounted, ref, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const props = defineProps(['bottom', 'right', 'top']);
const showSlideDown = ref(false);
const navUserWrapperEle = ref(null);
const emit = defineEmits(['onClickOutSide'])
const show = ref(false);
const router = useRouter();

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        show.value = true;
    }, 0);
});
onUpdated(() => {
    navUserWrapperEle.value = document.getElementsByName('nav-user-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navUserWrapperEle.value !== undefined && navUserWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
function logOut() {
    loadingStore.enableLoading('http');

    UserService.logOut()
        .then(() => {
            loadingStore.disableLoading('http');
            localStorage.removeItem('token');
            
            router.push({
                name: "login"
            });
        }).catch((err) => {
            UserService.navigateLoginPage(err);
            loadingStore.disableLoading('http');
        })

}
</script>
<template>
    <div name="nav-user-wrapper" :class="{ 'nav-user-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': props.top, 'right': props.right }">

        <Transition name="user">
            <div v-if="show" class="user-container">
                <div class="account">
                    <h3>Account</h3>
                    <div class="name-image">
                        <div class="image-container">
                            <img src="/src/assets/logo.svg" alt="">
                        </div>
                        <div class="name-container">
                            <p>Account Name</p>
                            <p>example@gmail.com</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <a href="">Switch Account</a>
                        </li>
                        <li>
                            <a href="">Manage Account <font-awesome-icon icon="fa-solid fa-right-from-bracket" /></a>

                        </li>
                    </ul>
                </div>
                <div class="todo-app">
                    <h3>Todo</h3>
                    <ul>
                        <li><a href="">Profile and visibility</a></li>
                        <li><a href="">Activity</a></li>
                        <li><a href="">Cards</a></li>
                        <li><a href="">Settings</a></li>
                        <li><a href="">Theme <font-awesome-icon icon="fa-solid fa-chevron-right" /></a></li>
                    </ul>
                </div>
                <div class="others">
                    <ul>
                        <li><a href="">Help</a></li>
                        <li><a href="">Shortcuts</a></li>
                    </ul>
                </div>
                <div class="log-out">
                    <ul>
                        <li><a @click="logOut">Log out</a></li>
                    </ul>
                </div>

            </div>
        </Transition>
    </div>
</template>
<style scoped>
.account,
.todo-app,
.others,
.log-out {
    border-bottom: 1px solid gray;
    margin-bottom: .3rem;
    margin-top: .1rem;
    padding-bottom: .2rem;
}

.log-out {
    border: none
}

ul {
    list-style-type: none;
    padding: 0;
    line-height: 1rem;
}

a {
    color: black !important;
    width: 100% !important;
    display: flex;
    padding: 10px;
    justify-content: space-between;
}

a:hover {
    background-color: var(--color-hover);
    color: whitesmoke !important;
    border-radius: 5px;
    cursor: pointer;
}

.name-image {
    display: flex;
    padding: 5px;
}

.name-image .image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
    display: flex;
    align-items: center;
}

.name-container p {
    font-size: 12px;
}

.account {
    width: 100%;
}

.user-enter-active {
    transition: transform 0.5s ease;
}

.user-enter-from {
    transform: translateY(-20%);
}

.nav-user-wrapper {
    width: 300px;
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