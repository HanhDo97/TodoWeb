<script setup>
import { ref, onMounted, onUpdated } from 'vue';

const props = defineProps(['top', 'left', 'isInMoreNav']);
const emit = defineEmits(['onClickOutSide']);
const show = ref(true);
const showSlideDown = ref(false);
const showTransition = ref(false);
const navTemplateWrapperEle = ref(null);

onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        showTransition.value = true;
        show.value = true;
    }, 50);
})
onUpdated(() => {
    navTemplateWrapperEle.value = document.getElementsByName('nav-template-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navTemplateWrapperEle.value !== undefined && navTemplateWrapperEle.value.contains(ev.target)) { /* empty */ }
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
    <div :class="{ 'nav-template-wrapper': !props.isInMoreNav, 'slide-down': showSlideDown && !props.isInMoreNav }"
        :style="{ 'top': props.top, 'left': props.left }">
        <Transition :name="!props.isInMoreNav ? 'template' : ''">
            <div v-if="showTransition" class="">
                <h5>Top Templates</h5>
                <div class="templates-container">
                    <div class="content">
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                        <div class="template">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <div class="text-container">
                                <p>Template 01</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="show" class="footer">
                    <div class="icon">
                        <font-awesome-icon icon="fa-solid fa-chart-simple" />
                    </div>
                    <p>See hundreds of templates from the Trello community</p>
                    <button>Explore templates</button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.template-enter-active {
    transition: transform 0.5s ease;
}
.template-enter-from {
    transform: translateY(-5%);
}

.nav-template-wrapper {
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

.footer {
    bottom: 0;
    padding: 10px;
    display: grid;
    grid-template-columns: 40px 1fr;
    align-items: center;
    text-align: center;
}

.footer button {
    width: 100%;
    height: 40px;
    grid-column-start: 1;
    grid-column-end: 3;
    background-color: transparent;
    border: 2px solid var(--color-hover);
    font-size: 16px;
    border-radius: 5px;
}

.footer button:hover {
    background-color: var(--color-hover);
    color: whitesmoke;
    border-radius: 5px;
    cursor: pointer;
}

h5 {
    padding-left: 10px;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
}

.templates-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 30vh;
    overflow: auto;
    border-bottom: 2px solid gray;
    padding: 10px;
}

.template {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    transition: 0.4s;
}
.template:hover{
    background-color: var(--color-hover);
    color: whitesmoke;
    border-radius: 5px;
    cursor: pointer;
}
</style>