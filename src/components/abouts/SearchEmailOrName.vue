<script setup>
import UserService from '@/services/UserService';
import { onMounted, ref } from 'vue';
import Loader from '../cores/Loader.vue';

const inputModel = defineModel();
const emits = defineEmits(['selectedUser']);
const users = ref([])
const display = ref({
    result: false,
    searchLoader: false
})

onMounted(() => {
    setTimeout(() => {
        window.addEventListener('click', setEventOutSideClick);
        window.addEventListener('click', setEventInputFocus);
    });

})
function setEventInputFocus(event) {
    let inputEl = document.getElementsByTagName('input')[0];
    if (inputEl !== undefined
        && inputEl.contains(event.target) == false) {
        display.value.result = false;
    }
    else {
        display.value.result = true;
    }
}
function setEventOutSideClick(event) {
    let wrapperEl = document.getElementsByClassName('wrapper')[0];
    if (wrapperEl !== undefined
        && wrapperEl.contains(event.target) == false) {

        window.removeEventListener('click', setEventOutSideClick)

    }
}
function searchEmailOrName() {
    if (inputModel.value == '') return;

    display.value.searchLoader = true;

    UserService.searchEmailOrName(inputModel.value)
        .then(res => {
            display.value.searchLoader = false;
            users.value = res.data;
        });
}
function getFirstCharaterOfName(user) {
    if (user.name)
        return user.name.charAt(0);
    if(user.email)
        return user.email.charAt(0);
}
function selectUser(ev,user){
    inputModel.value = user.email;
    display.value.result = false;

    emits('selectedUser', user);

    ev.stopPropagation();
}
</script>
<template>
    <div class="wrapper">
        <div class="">
            <input v-model="inputModel" @input="searchEmailOrName" type="text" placeholder="Enter address or name">
        </div>
        <div v-if="display.result" class="container">
            <Loader v-if="display.searchLoader" :display="true" />
            <div v-for="(user, index) in users" :key="index" class="user"
            @click="selectUser($event,user)"
            >
                <div class="image"><b>{{ getFirstCharaterOfName(user) }}</b></div>
                <div class="info">
                    <p>{{ user.name }}</p>
                    <p>{{ user.email }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.info {
    font-size: 12px;
}

.image {
    width: 30px;
    height: 30px;
    background-color: gray;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
}

.user {
    display: flex;
    align-items: center;
    padding: 5px;
    height: 50px;
    border-radius: 10px;
}

.user:hover {
    background-color: rgb(30, 34, 37);
    cursor: pointer;
}

input {
    height: 40px;
    border: none;
    background-color: #22272B;
    color: var(--ds-text-subtle);
    width: 100%;
    font-size: 16px;
    padding-left: 5px;
    border-radius: 3px;
}

input[type="text"]:focus {
    border: 2px solid #B6C2CF;
    outline: none;
}

.container {
    color: rgb(222, 219, 219);
    position: absolute;
    width: 100%;
    height: 200px;
    background-color: #282E33;
    border: 2px solid #B6C2CF;
    border-radius: 5px;
    padding: 10px;
    top: 50px;
}

.wrapper {
    position: relative;
}
</style>