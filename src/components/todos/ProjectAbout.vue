<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import Share from '../abouts/Share.vue';

const projectStore = useProjectStore();
const { currentProject } = storeToRefs(projectStore);
const display = ref({
    share: false
})

onMounted(() => {

})

function toggleButton(btnClickedType) {
    display.value[btnClickedType] = !display.value[btnClickedType]
}
function onCloseBoard(){
    display.value.share = false;
}
</script>
<template>
    <div class="project-about-wrapper">
        <div class="about-left">
            <button>
                <h3>{{ currentProject !== null ? currentProject.title : '' }}</h3>
            </button>
            <button>
                <font-awesome-icon icon="fa-solid fa-star" />
            </button>
            <button>
                <font-awesome-icon icon="fa-solid fa-users-rays" />
            </button>
            <button class="highlight-btn">
                Board <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </button>
        </div>
        <div class="about-right">
            <button><font-awesome-icon icon="fa-solid fa-rocket" /></button>
            <button><font-awesome-icon icon="fa-solid fa-bolt-lightning" /></button>
            <button><font-awesome-icon icon="fa-solid fa-filter" /></button>
            |
            <button @click="toggleButton('share')" name="share-btn" class="highlight-btn"><font-awesome-icon
                    icon="fa-solid fa-user-plus" /> Share</button>
            <button><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
        </div>
    </div>
    <Share v-if="display.share" @close-board="onCloseBoard" />
</template>
<style scoped>
/* ABOUT CSS */
.about-right {
    text-align: right;
}

.highlight-btn {
    background-color: rgb(255, 255, 255, 0.8) !important;
    color: black !important;
    border-radius: 5px !important;
    font-size: 14px !important;
}

.highlight-btn:hover {
    background-color: whitesmoke !important;
}

.about-left button,
.about-right button {
    color: whitesmoke;
    font-weight: 600;
    background-color: transparent;
    border: none;
    font-size: 16px;
    padding: 5px;
    margin-right: 10px;
    text-wrap: nowrap;
    min-width: 32px;
}

.about-left button:hover,
.about-right button:hover {
    cursor: pointer;
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

.project-about-wrapper {
    min-height: 59px;
    background-color: rgb(255, 255, 255, 0.1);
    padding: 5px;
    display: grid;
    grid-template-columns: auto auto;
    width: calc(100% - 25px);
    position: relative
}

@media (max-width: 350px) {
    .project-about-wrapper {
        grid-template-columns: auto
    }
}
</style>