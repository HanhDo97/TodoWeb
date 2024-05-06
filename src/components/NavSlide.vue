<template>
    <div class="nav-slide-warrper" :class="[hidden ? 'slide-leave slide-leave-to slide-leave-from' :
        'slide-enter slide-enter-to slide-enter-from']">
        <button v-if="!hidden" class="expand-nav-left" @click="handleToggleNav">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>
        <button v-else class="expand-nav-right" @click="handleToggleNav">
            <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </button>
        <div v-if="!hidden">
            <div class="user-workspace">
                <div class="image-container">
                    <img src="/src/assets/logo.svg" alt="">
                </div>
                <div class="workspace-text">
                    <p>Workspace Project</p>
                    <p>Free</p>
                </div>
            </div>
            <ul class="function-workspace">
                <li>
                    <a href="">
                        <span><font-awesome-icon icon="fa-solid fa-chart-column" /></span>
                        Boards</a>
                </li>
                <li>
                    <a href="">
                        <span><font-awesome-icon icon="fa-solid fa-user-plus" /></span>
                        Members</a>
                </li>
                <li>
                    <a href="">
                        <span><font-awesome-icon icon="fa-solid fa-gear" />
                        </span>
                        Workpace setting
                    </a>
                </li>
            </ul>
            <ul class="view-workspace">
                <p>Workspace Views</p>
                <li><a href="">
                        <span><font-awesome-icon icon="fa-solid fa-table" /></span>
                        <i>Table</i>
                    </a></li>
                <li><a href="">
                        <span><font-awesome-icon icon="fa-solid fa-calendar-days" /></span>
                        <i>Calendar</i></a>
                </li>
            </ul>
            <ul class="user-boards">
                <p>Your broads</p>
                <li><a href="">Project 1</a></li>
                <li><a href="">Project 2</a></li>
                <li><a href="">Project 3</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.nav-slide-warrper p{
    color: rgb(226, 226, 226);
}

.slide-leave,
.slide-enter {
    transition: transform 1s ease;
}

.slide-leave-to {
    transform: translateX(0);
}

.slide-leave-from {
    transform: translateX(-90%);
}

.slide-enter-from {
    transform: translateX(-90%);
}

.slide-enter-to {
    transform: translateX(0);
}

ul p {
    margin-left: .5rem;
}

.function-workspace,
.user-boards,
.view-workspace {
    margin-top: 10px;
}

a span {
    margin-right: .5rem;
}

ul {
    list-style-type: none;
    padding: 0;
    line-height: 2rem;
}

li {
    padding-left: 1rem;
    cursor: pointer;
}

li:hover {
    background-color: gray;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
}

.user-workspace {
    display: flex;
    align-items: center;
    border-bottom: 1px solid gray;
    padding: 5px;
}

.nav-slide-warrper {
    height: 100%;
    width: 250px;
    position: absolute;
    transition: 0.5s;
    /* background-color: blue; */
    z-index: 10;
}

.expand-nav-left {
    position: absolute;
    right: 10px;
    top: 20px;
    background-color: transparent;
    border: none;
    color: whitesmoke;
    width: 30px;
    height: 30px;
}

.expand-nav-left:hover {
    background-color: gray;
    cursor: pointer;
    border-radius: 5px;
}

.expand-nav-right {
    color: var(--ds-text-subtle);
    font-weight: 600;
    background-color: black;
    border-radius: 50%;
    border: none;
    font-size: 13px;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 45px;
    right: -20px;
}

.expand-nav-right:hover {
    cursor: pointer;
    background-color: gray;
    border-radius: 50%;
}
</style>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['toggleNavBtn']);

let hidden = ref(true);

function handleToggleNav() {
    hidden.value = !hidden.value;

    if (hidden.value == false) {
        emit('toggleNavBtn', hidden.value);
    } else {
        setTimeout(() => {
            emit('toggleNavBtn', hidden.value);
        }, 200);
    }
}
</script>
