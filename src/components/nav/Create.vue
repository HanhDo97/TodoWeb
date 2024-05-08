<script setup>
import { onMounted, ref, onUpdated } from 'vue';

const props = defineProps(['bottom', 'left', 'top']);
const showSlideDown = ref(false);
const navCreateWrapperEle = ref(null);
const emit = defineEmits(['onClickOutSide'])
const show = ref(false);


onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        show.value = true;
    }, 0);
});
onUpdated(() => {
    navCreateWrapperEle.value = document.getElementsByName('nav-recent-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navCreateWrapperEle.value !== undefined && navCreateWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
</script>
<template>
    <div name="nav-create-wrapper" :class="{ 'nav-create-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': props.top, 'left': props.left }">

        <Transition name="create">
            <div v-if="show" class="create-wrapper">
                <div class="create-container">
                    <div class="title">
                        <font-awesome-icon icon="fa-solid fa-chart-simple" />
                        <p>Create board</p>
                    </div>
                    <div class="content">
                        <p>A board is made up of cards ordered on lists. Use it to manage projects, track information,
                            or organize anything.</p>
                    </div>
                </div>
                <div class="create-container">
                    <div class="title">
                        <font-awesome-icon icon="fa-solid fa-image" />
                        <p>Start with a template</p>
                    </div>
                    <div class="content">
                        <p>Get started faster with a board template.</p>
                    </div>
                </div>
                <div class="create-container">
                    <div class="title">
                        <font-awesome-icon icon="fa-solid fa-user" />
                        <p>Create Workspace</p>
                    </div>
                    <div class="content">
                        <p>A Workspace is a group of boards and people. Use it to organize your company, side hustle,
                            family, or friends.</p>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.create-container .content{
    font-size: 13px;
    color: gray;
}
.create-container .title{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
}
.create-container:hover {
    background-color: rgb(213, 211, 211);
    cursor: pointer;
}

.create-container {
    padding: 5px;
}


.create-enter-active {
    transition: transform 0.5s ease;
}

.create-enter-from {
    transform: translateY(-20%);
}

.nav-create-wrapper {
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