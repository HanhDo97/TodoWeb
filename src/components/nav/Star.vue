<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps(['top', 'left', 'isInMoreNav']);
const emit = defineEmits(['onClickOutSide']);
const show = ref(true);
const showSlideDown = ref(false);
const showTransition = ref(false);
const navStarWrapperEle = ref(null);

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        showTransition.value = true;
        show.value = true;
    }, 50);
})
onUpdated(() => {
    navStarWrapperEle.value = document.getElementsByName('nav-star-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navStarWrapperEle.value !== undefined && navStarWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        closeNavInformation();
    }
}
function closeNavInformation() {
    emit('onClickOutSide', true);
    window.removeEventListener('click', handleClick)
}
</script>
<template>
    <div :class="{ 'nav-star-wrapper': !props.isInMoreNav, 'slide-down': showSlideDown && !props.isInMoreNav }"
        :style="{ 'top': props.top, 'left': props.left }">
        <Transition :name="!props.isInMoreNav ? 'template' : ''">
            <div v-if="showTransition" class="">
                <div class="content-boards">
                    <img src="/src/assets/no-starred.png" alt="">
                </div>
                <div class="footer-boards">
                    <p>Star important boards to access them quickly and easily.</p>
                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.footer-boards p {
    text-align: center;
}
.content-boards img {
    width: 100%;
}
.template-enter-active {
    transition: transform 0.5s ease;
}

.template-enter-from {
    transform: translateY(-10%);
}

.nav-star-wrapper {
    padding: 10px;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.slide-down {
    transform: scale(1, 1);
    opacity: 1;
}
</style>