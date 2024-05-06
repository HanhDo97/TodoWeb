<script setup>
import { ref } from 'vue';
import Workspace from './nav/Workspace.vue';
import Recent from './nav/Recent.vue';
import More from './nav/More.vue';

const navNavigator = ref({
    workspace: {
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

});

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
            <button>
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <button>
                <span class="chart-icon"><font-awesome-icon icon="fa-solid fa-chart-simple" /></span>
                ToDoApp</button>
            <button @click="displayNavInformation('workspace')" name="workspace-btn">Workspace <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button @click="displayNavInformation('recent')" name="recent-btn" class="recent-btn">Recent <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button name="more-btn" @click="displayNavInformation('more')">More <span>
                    <font-awesome-icon icon="fa-solid fa-chevron-down" />
                </span></button>
            <button><font-awesome-icon icon="fa-solid fa-plus" /></button>
        </div>
        <div class="nav-right">
            <div class="search-wrapper">
                <div class="icon-wrapper"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                <input type="text" placeholder="Search">
            </div>
            <button><font-awesome-icon icon="fa-solid fa-bell" /></button>
            <button><font-awesome-icon icon="fa-solid fa-user" /></button>
        </div>

        <Workspace v-if="navNavigator.workspace.display" :top="navNavigator.workspace.top"
            :left="navNavigator.workspace.left" @on-click-out-side="onClickOutSide" />
        <Recent v-if="navNavigator.recent.display" :top="navNavigator.recent.top" :left="navNavigator.recent.left"
            @on-click-out-side="onClickOutSide" />

        <More v-if="navNavigator.more.display" :top="navNavigator.more.top" :left="navNavigator.more.left"
            @on-click-out-side="onClickOutSide" />
    </nav>
</template>
<style scoped>
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
    position: relative;
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
</style>