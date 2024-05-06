<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps(['bottom', 'left', 'top']);
const top = props.top;
const left = props.left;
const navMoreWrapperEle = ref(null);
const showSlideDown = ref(false);
const emit = defineEmits(['onClickOutSide']);
const displayActions = ref(false);
const actions = ref({
    star: {
        title: 'Starred boards',
        displayChildren: false
    },
    template: {
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
        console.log('out side')
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
function displayChildren(action, event) {
    action.displayChildren = true;

    displayActions.value = false;

    event.stopPropagation();
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
        <Transition name="starred-boards">
            <div v-if="!displayActions && actions.star.displayChildren" class="more-board">
                <div class="title-boards">
                    <button><font-awesome-icon icon="fa-solid fa-chevron-left" /></button>
                    <p>{{ actions.star.title }}</p>
                    <button><font-awesome-icon icon="fa-solid fa-xmark" /></button>
                </div>
                <div class="content-boards">

                </div>
                <div class="footer-boards">
                    <p>Star important boards to access them quickly and easily.</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.more-board .content-boards{
    min-height: 150px;
}
.more-board .footer-boards,
.more-board .title-boards,
.more-board .content-boards {
    padding: 10px;
}
.more-board .title-boards button {
    border: none;
    width: 32px;
    height: 32px;
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
.starred-boards-leave-active {
    transition: transform 0s
}

.actions-leave-to,
.starred-boards-leave-to {
    opacity: 0;
}

.actions-enter-active,
.starred-boards-enter-active {
    transition: transform 0.5s ease;
}

.actions-enter-from,
.starred-boards-enter-from {
    transform: translateY(-20%);
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