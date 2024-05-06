<script setup>
const props = defineProps(['hiddenNav']);
const hiddenNav = props.hiddenNav;
</script>

<template>
    <div class="project-about-wrapper" :style="{ width: hiddenNav ? '98%' : 'calc(100% - 250px)' }">
        <div class="about-left">
            <button>
                <h3>Todo Project</h3>
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
            <button class="highlight-btn"><font-awesome-icon icon="fa-solid fa-user-plus" /> Share</button>
            <button><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
        </div>
    </div>
</template>
<style scoped>
.about-right {
    float: right;
}

.about-left {
    display: inline-block
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

}

@media (max-width: 630px) {
    .project-about-wrapper {
        min-height: 110px;
    }
}
</style>