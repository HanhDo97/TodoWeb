<script setup>
import { onMounted, ref, onUpdated } from 'vue';

const props = defineProps(['bottom', 'left', 'top']);
const showSlideDown = ref(false);
const navFeatureWrapperEle = ref(null);
const emit = defineEmits(['onClickOutSide'])
const show = ref(false);
const recommendApps = ref([
    { title: 'Some App 01' },
    { title: 'Some App 02' }
])


onMounted(() => {
    setTimeout(() => {
        showSlideDown.value = true;
        show.value = true;
    }, 0);
});
onUpdated(() => {
    navFeatureWrapperEle.value = document.getElementsByName('nav-feature-wrapper')[0];
    window.addEventListener('click', handleClick);
})

function handleClick(ev) {
    if (navFeatureWrapperEle.value !== undefined && navFeatureWrapperEle.value.contains(ev.target)) { /* empty */ }
    else {
        emit('onClickOutSide', true);
        window.removeEventListener('click', handleClick)
    }
}
</script>

<template>
    <div name="nav-feature-wrapper" :class="{ 'nav-feature-wrapper': true, 'slide-down': showSlideDown }"
        :style="{ 'top': props.top, 'left': props.left }">
        <Transition name="feature">
            <div v-if="show" class="feature-wrapper">
                <div class="your-apps">
                    <h5>YOUR APPS</h5>
                    <div class="wrapper">
                        <div class="image-container">
                            <img src="/src/assets/logo.svg" alt="">
                        </div>
                        <p>Todo App</p>
                    </div>
                </div>

                <div class="recommend">
                    <h5>RECOMMENDED FOR YOUR TEAM</h5>
                    <div v-for="(el, index) in recommendApps" :key="index" class="recommend-container">
                        <div class="wrapper">
                            <div class="image-container">
                                <img src="/src/assets/logo.svg" alt="">
                            </div>
                            <p>{{ el.title }}</p>
                        </div>
                        <button>
                            <font-awesome-icon icon="fa-solid fa-ellipsis" />
                        </button>
                    </div>

                </div>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.recommend-container {
    margin-bottom: 10px;
}

.recommend-container .wrapper {
    display: flex;
    width: 85%;
    padding: 10px;
}

.recommend-container button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    background-color: transparent;
    border: none;

}

.recommend-container:hover .wrapper {
    background-color: rgb(177, 177, 177);
    color: whitesmoke;
    cursor: pointer;
    border-radius: 5px;
}

.recommend-container .wrapper:hover {
    background-color: var(--color-hover);
}

.recommend-container:hover button {
    background-color: rgb(177, 177, 177);
    color: whitesmoke;
    cursor: pointer;
    border-radius: 5px;
}

.recommend-container button:hover {
    background-color: var(--color-hover);
}

.recommend-container {
    display: flex;
    align-items: center;
}

.recommend-container button {
    margin-left: auto;
}

h5 {
    margin-bottom: .5rem;
}

.your-apps {
    margin-bottom: 1rem;
}

.your-apps .wrapper {
    display: flex;
    margin-bottom: 5px;
    padding: 5px;
    align-items: center;
    width: 90%;
}

.your-apps .wrapper:hover {
    background-color: var(--color-hover);
    color: whitesmoke;
    cursor: pointer;
    border-radius: 5px;
}

.image-container {
    width: 35px;
    height: auto;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    background-color: rgb(183, 180, 180);
    padding: 5px;
    border-radius: 5px;
}

.feature-enter-active {
    transition: transform 0.5s ease;
}

.feature-enter-from {
    transform: translateY(-10%);
}

.nav-feature-wrapper {
    width: 400px;
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
