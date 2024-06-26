<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import Template from './Template.vue'
import Star from './Star.vue'

const props = defineProps(['bottom', 'left', 'top']);
const top = props.top;
const left = props.left;
const navMoreWrapperEle = ref(null);
const showSlideDown = ref(false);
const emit = defineEmits(['onClickOutSide']);
const displayActions = ref(false);
const actions = ref({
    star: {
        code: 'star',
        title: 'Starred boards',
        displayChildren: false
    },
    template: {
        code: 'template',
        title: 'Templates',
        displayChildren: false
    }
})

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        displayActions.value = true;
    }, 0);
});

onUpdated(() => {
    navMoreWrapperEle.value = document.getElementsByName('nav-more-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navMoreWrapperEle.value !== undefined && navMoreWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        closeNavInformation();
    }
}
function displayChildren(action, event) {
    action.displayChildren = true;

    displayActions.value = false;

    event.stopPropagation();
}

function backToActionMenu(action) {
    displayActions.value = true;

    action.displayChildren = false;

    event.stopPropagation();

}
function closeNavInformation() {
    emit('onClickOutSide', true);
    window.removeEventListener('click', handleClick)
}
</script>
<template>
    <div name="nav-more-wrapper" :class="{ 'nav-more-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': top, 'left': left }">
        <Transition name="actions">
            <div v-if="displayActions" class="more-menu">
                <div v-for="(action, index) in actions" :key="index" @click="displayChildren(action, $event)"
                    class="more-action">
                    <p>{{ action.title }}</p>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                </div>
            </div>
        </Transition>
        <Transition name="child-boards" v-for="(action, index) in actions" :key="index">
            <div v-if="!displayActions && action.displayChildren" class="more-board">
                <div class="title-boards">
                    <button @click="backToActionMenu(action)"><font-awesome-icon
                            icon="fa-solid fa-chevron-left" /></button>
                    <p><b>{{ actions.star.title }}</b></p>
                    <button @click="closeNavInformation"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                </div>

                <div class="" v-if="action.code == 'template'">
                    <Template :isInMoreNav="true" />
                </div>
                <div class="" v-if="action.code == 'star'">
                    <Star :isInMoreNav="true" />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.more-board .title-boards {
    padding: 10px;
}

.more-board .title-boards button {
    border: none;
    width: 32px;
    height: 32px;
    background-color: transparent
}

.more-board .title-boards button:hover {
    cursor: pointer;
    background-color: #5b8d53;
    color: whitesmoke;
    border-radius: 10px;
}

.more-board .title-boards {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.actions-leave-active,
.child-boards-leave-active {
    transition: transform 0s
}

.actions-leave-to,
.child-boards-leave-to {
    opacity: 0;
}

.actions-enter-active,
.child-boards-enter-active {
    transition: transform 0.5s ease;
}

.actions-enter-from {
    transform: translateY(-20%);
}

.child-boards-enter-from {
    transform: translateY(-5%);
}

.more-menu {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.more-action {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    padding: 10px;
}

.more-action:hover {
    background-color: #5b8d53;
    cursor: pointer;
    border-radius: 5px;
    color: whitesmoke
}

.nav-more-wrapper {
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
}

.slide-down {
    transform: scale(1, 1);
    opacity: 1;
}
</style>