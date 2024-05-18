<script setup>
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const props = defineProps(['display'], {
    display: false
});
</script>

<template>
    <div v-if="loadingStore.loading.page || loadingStore.loading.http || props.display" class="loading">
        <div class="loader"></div>
    </div>
</template>
<style scoped>
.loading {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    z-index: 99;
    justify-content: center;
    align-items: center;
}

.loader {
    width: 20px;
    aspect-ratio: 1;
    --c: no-repeat linear-gradient(#ffffff 0 0);
    background:
        var(--c) 0% 50%,
        var(--c) 50% 50%,
        var(--c) 100% 50%;
    background-size: 20% 100%;
    animation: l1 1s infinite linear;
}

@keyframes l1 {
    0% {
        background-size: 20% 100%, 20% 100%, 20% 100%
    }

    33% {
        background-size: 20% 10%, 20% 100%, 20% 100%
    }

    50% {
        background-size: 20% 100%, 20% 10%, 20% 100%
    }

    66% {
        background-size: 20% 100%, 20% 100%, 20% 10%
    }

    100% {
        background-size: 20% 100%, 20% 100%, 20% 100%
    }
}
</style>