<script setup>
import { ref, onUpdated, onMounted } from 'vue';
import Workspace from './nav/Workspace.vue';
import Recent from './nav/Recent.vue';
import More from './nav/More.vue';
import Feature from './nav/Feature.vue';
import Template from './nav/Template.vue';
import Star from './nav/Star.vue';
import Create from './nav/Create.vue';
import Notification from './nav/Notification.vue';
import User from './nav/User.vue';
import UserService from '@/services/UserService';

// get User
// get Notification
// component setup
const showInput = ref(false);
const navNavigator = ref({
    user: {
        display: false,
        right: '0px',
        top: '55px'
    }, notification: {
        display: false,
        right: '0px',
        top: '55px'
    }, create: {
        display: false,
        left: '0px',
        top: '55px'
    }, feature: {
        display: false,
        left: '0px',
        top: '55px'
    }, workspace: {
        display: false,
        left: '0px',
        top: '55px'
    },
    recent: {
        display: false,
        left: '0px',
        top: '55px'
    },
    more: {
        display: false,
        left: '0px',
        top: '55px'
    },
    star: {
        display: false,
        left: '0px',
        top: '55px'
    },
    template: {
        display: false,
        left: '0px',
        top: '55px'
    }
});
const searchWrapperEl = ref(null);

onMounted(() => {
    // Get Notifications
    UserService.getNotifications();
})
onUpdated(() => {
    searchWrapperEl.value = document.getElementsByClassName('search-wrapper')[0];
    window.addEventListener('click', toggleInputSearch);
})
function toggleInputSearch(event) {
    if (searchWrapperEl.value !== undefined && searchWrapperEl.value.contains(event.target)) { /* empty */ }
    else {
        showInput.value = false;
        window.removeEventListener('click', toggleInputSearch)
    }
}

function toggleInput(event) {
    showInput.value = true;

    event.stopPropagation();
}

function displayNavInformation(nav) {
    for (let key in navNavigator.value) {
        if (nav == key) {
            navNavigator.value[key].display = !navNavigator.value[key].display;
        }
        else {
            navNavigator.value[key].display = false;
        }
    }
    let btnRectElement = document.getElementsByName(nav + '-btn')[0].getBoundingClientRect();
    navNavigator.value[nav].left = btnRectElement.left + 'px';
}

function onClickOutSide(isClickOutSide) {
    if (isClickOutSide) {
        for (let key in navNavigator.value) {
            navNavigator.value[key].display = false;
        }
    }
}
</script>
<template>
    <nav>
        <div class="nav-left">
            <button :class="navNavigator.feature.display ? 'selected' : ''" class="feature-btn" name="feature-btn"
                @click="displayNavInformation('feature')">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <button>
                <span class="chart-icon"><font-awesome-icon icon="fa-solid fa-chart-simple" /></span>
                ToDoApp</button>
            <button :class="navNavigator.workspace.display ? 'selected' : ''" class="workspace-btn"
                @click="displayNavInformation('workspace')" name="workspace-btn">Workspace
                <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button :class="navNavigator.recent.display ? 'selected' : ''" @click="displayNavInformation('recent')"
                name="recent-btn" class="recent-btn">Recent <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button :class="navNavigator.more.display ? 'selected' : ''" class="more-btn" name="more-btn"
                @click="displayNavInformation('more')">More <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button :class="navNavigator.star.display ? 'selected' : ''" class="star-btn" name="star-btn"
                @click="displayNavInformation('star')">Starred <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button :class="navNavigator.template.display ? 'selected' : ''" class="template-btn" name="template-btn"
                @click="displayNavInformation('template')">Templates <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button @click="displayNavInformation('create')"
                :class="navNavigator.create.display ? 'create-btn-selected' : ''" name="create-btn"
                class="create-btn"><font-awesome-icon icon="fa-solid fa-plus" /></button>
        </div>
        <div class="nav-right">
            <div class="search-container">
                <Transition name="input">
                    <div v-if="showInput" class="search-wrapper">
                        <div class="icon-wrapper"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        <input type="text" placeholder="Search">
                    </div>
                </Transition>
                <div v-if="!showInput" class="glass-wrapper">
                    <button @click="toggleInput($event)">
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </button>
                </div>


            </div>
            <button @click="displayNavInformation('notification')" class="notification-btn"
                name="notification-btn"><font-awesome-icon icon="fa-solid fa-bell" /></button>
            <button @click="displayNavInformation('user')" name="user-btn" class="user-btn"><font-awesome-icon
                    icon="fa-solid fa-user" /></button>
        </div>

        <Feature v-if="navNavigator.feature.display" :top="navNavigator.feature.top" :left="navNavigator.feature.left"
            @on-click-out-side="onClickOutSide" />
        <Workspace v-if="navNavigator.workspace.display" :top="navNavigator.workspace.top"
            :left="navNavigator.workspace.left" @on-click-out-side="onClickOutSide" />
        <Recent v-if="navNavigator.recent.display" :top="navNavigator.recent.top" :left="navNavigator.recent.left"
            @on-click-out-side="onClickOutSide" />

        <More v-if="navNavigator.more.display" :top="navNavigator.more.top" :left="navNavigator.more.left"
            @on-click-out-side="onClickOutSide" />

        <Template v-if="navNavigator.template.display" :isInMoreNav="false" :top="navNavigator.template.top"
            :left="navNavigator.template.left" @on-click-out-side="onClickOutSide" />

        <Star v-if="navNavigator.star.display" :isInMoreNav="false" :top="navNavigator.star.top"
            :left="navNavigator.star.left" @on-click-out-side="onClickOutSide" />

        <Create v-if="navNavigator.create.display" :top="navNavigator.create.top" :left="navNavigator.create.left"
            @on-click-out-side="onClickOutSide" />

        <Notification v-if="navNavigator.notification.display" :top="navNavigator.notification.top"
            :right="navNavigator.notification.right" @on-click-out-side="onClickOutSide" />
        <User v-if="navNavigator.user.display" :top="navNavigator.user.top" :right="navNavigator.user.right"
            @on-click-out-side="onClickOutSide" />


    </nav>
</template>
<style scoped>
.search-container {
    display: flex;
    align-items: center
}

.input-enter-active {
    transition: all 0.3s ease-out;
}

.input-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.input-enter-from,
.input-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.user-btn-selected,
.create-btn-selected {
    background-color: hsl(240, 61%, 57%);
    border-radius: 5px;
}

.user-btn,
.create-btn {
    background-color: hsl(240, 61%, 57%);
    border-radius: 5px;
}

.user-btn:hover,
.create-btn:hover {
    background-color: hsl(240, 61%, 57%, 0.8);
    cursor: pointer;
}

.selected {
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

.icon-wrapper {
    font-size: 18px;
    text-align: center
}

.search-wrapper {
    padding: 3px;
    width: 100%;
    display: grid;
    gap: 5px;
    grid-auto-columns: auto;
    grid-template-columns: 1fr 10fr;
    background-color: rgb(255, 255, 255, 0.1);
    color: var(--ds-text-subtle);
    border: 1px solid gray;
    border-radius: 5px;
}

.search-wrapper:hover {
    background-color: rgb(255, 255, 255, 0.2)
}

.search-wrapper input {
    height: 30px;
    border: none;
    background-color: transparent;
    color: var(--ds-text-subtle)
}

input[type="text"]:focus {
    outline: none;
    border: 1px solid transparent;
}

::placeholder {
    color: var(--ds-text-subtle)
}

.nav-left {
    display: flex;
    gap: 5px;
}

.nav-right {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 5px;
    min-width: 300px;
}

nav {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    position: fixed;
    width: 100%;
    z-index: 99;
    background-color: var(--vt-c-black);
}

nav button span {
    font-size: 12px;
}

nav button:hover .chart-icon {
    color: white;
}

nav button {
    color: var(--ds-text-subtle);
    font-weight: 600;
    background-color: transparent;
    border: none;
    font-size: 16px;
    padding: 10px;
    height: 45px;
    min-width: 45px;
}

nav button:hover {
    cursor: pointer;
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

@media (max-width: 900px) {

    .template-btn,
    .star-btn {
        display: none;
    }
}

@media(max-width: 791px) {

    .workspace-btn,
    .recent-btn {
        display: none;
    }
}

@media (min-width: 900px) {
    .more-btn {
        display: none;
    }
}
</style>