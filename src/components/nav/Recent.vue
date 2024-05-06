<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['bottom', 'left', 'top']);
const top = props.top;
const left = props.left;
const showSlideDown = ref(false);

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
    }, 0);
});
</script>

<template>
    <div :class="{ 'recent-wrapper': true, 'slide-down': showSlideDown }" :style="{ 'top': top, 'left': left }">
        <h3>Current workspace</h3>
    </div>
</template>

<style scoped>
.recent-wrapper {
    position: absolute;
    z-index: 10;
    background-color: whitesmoke;
    color: black;
    font-size: 16px;
    padding: 10px;
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
