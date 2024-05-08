<script setup>
import { onMounted, ref, onUpdated } from 'vue';
const props = defineProps(['bottom', 'left', 'top']);
const emit = defineEmits(['onClickOutSide']);
const top = props.top;
const left = props.left;
const showSlideDown = ref(false);
const show = ref(false);
const navWorkSpaceWrapperEle = ref(null);

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        show.value = true;
    }, 0);
});
onUpdated(() => {
    navWorkSpaceWrapperEle.value = document.getElementsByName('nav-workspace-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navWorkSpaceWrapperEle.value !== undefined && navWorkSpaceWrapperEle.value.contains(ev.target)) {
        console.log('in side');
    }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
</script>
<template>
    <div name="nav-workspace-wrapper" :class="{ 'nav-workspace-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': top, 'left': left }">
        <Transition name="workspace">
            <div v-if="show" class="">
                <div class="workspace-title">Workspaces</div>
                <div class="workspace-wrapper">
                    <h5>Current Workspace</h5>
                    <div class="workspace-content">
                        <div class="image-container">
                            <img src="/src/assets/logo.svg" alt="">
                        </div>
                        <div class="workspace-text">
                            <p>Todo Workspace</p>
                        </div>
                    </div>
                </div>
                <div class="workspace-wrapper">
                    <h5>Your Workspaces</h5>
                    <button class="workspace-btn-content">
                        <div class="image-container">
                            <img src="/src/assets/logo.svg" alt="">
                        </div>
                        <div class="workspace-text">
                            <p>Todo Workspace</p>
                        </div>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.workspace-enter-active {
    transition: transform 0.5s ease;
}

.workspace-enter-from {
    transform: translateY(-10%);
}
.workspace-content {
    display: flex;
    margin-top: 5px;
    padding: 5px;
}

.workspace-btn-content {
    display: flex;
    margin-top: 5px;
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 5px;
    font-size: 15px;
    align-items: center;
}

.workspace-btn-content:hover {
    cursor: pointer;
    background-color: #5b8d53;
    border-radius: 5px;
    color: whitesmoke;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
    display: flex;
    align-items: center;
}

.workspace-wrapper {
    border-bottom: 1px solid gray;
    padding: 13px;
}

.workspace-wrapper:last-child {
    border-bottom: none;
}

.workspace-title {
    text-align: center;
    margin-bottom: 5px;
    font-size: 18px;
    padding: 5px;
}

.nav-workspace-wrapper {
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