<script setup>
import { onMounted, ref, onUpdated } from 'vue';

const props = defineProps(['bottom', 'left', 'top']);
const top = props.top;
const left = props.left;
const showSlideDown = ref(false);
const navRecentWrapperEle = ref(null);
const emit = defineEmits(['onClickOutSide'])

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
    }, 0);
});
onUpdated(() => {
    navRecentWrapperEle.value = document.getElementsByName('nav-recent-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navRecentWrapperEle.value !== undefined && navRecentWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}

function clickProject(){
    console.log(123);
}
</script>

<template>
    <div name="nav-recent-wrapper" :class="{ 'nav-recent-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': top, 'left': left }">
        <div class="recent-wrapper">
            <div @click="clickProject" class="recent-content">
                <div class="image-container">
                    <img src="/src/assets/logo.svg" alt="">
                </div>
                <div class="recent-text">
                    <p>Your Project <br><small>Todo Workspace</small></p>
                </div>
            </div>
            <div class="recent-content">
                <div class="image-container">
                    <img src="/src/assets/logo.svg" alt="">
                </div>
                <div class="recent-text">
                    <p>Your Project <br><small>Todo Workspace</small></p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.recent-content {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    padding: 10px;

}
.recent-content p {
    line-height: 14px;
}
.recent-content:hover{
    cursor: pointer;
    background-color: #5b8d53;
    border-radius: 5px;
}
.recent-wrapper {
    padding: 10px;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
    display: flex;
    align-items: center;
}

.nav-recent-wrapper {
    width: 300px;
    position: absolute;
    z-index: 10;
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
