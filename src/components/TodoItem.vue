<script setup>
import { ref } from 'vue';

const isHovered = ref(false);

defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <p @mouseenter="isHovered = true" @mouseleave="isHovered = false">
        <span>{{ item.taskName }}</span>
        <font-awesome-icon icon="fa-solid fa-pencil" v-if="isHovered" />
    </p>
</template>

<style scoped>
/* Your styles here */
/* Example: */

</style>
