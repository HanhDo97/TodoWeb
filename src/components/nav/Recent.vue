<script setup>
const props = defineProps(['bottom', 'left']);
const bottom = props.bottom;
const left = props.left;
</script>
<template>
    <div class="workspace-wrapper" :style="{ 'bottom': bottom, 'left': left }">
        <h1>Something</h1>
    </div>
</template>
<style scoped>
.workspace-wrapper {
    position: absolute;
    z-index: 10
}
</style>