<script setup>
import { defineProps, computed, onMounted } from 'vue';

const props = defineProps(['textAreaRect', 'wrapperDomRect', 'editTask']);

const top = computed(() => props.textAreaRect.top - props.wrapperDomRect.top);
const left = computed(() => props.textAreaRect.left - props.wrapperDomRect.left);
const width = props.textAreaRect.width;

console.log(props.editTask);

onMounted(() => {
    let textarea = document.getElementsByName('todo-task-edit')[0];
    textarea.focus();
})
</script>

<template>
    <textarea class="textarea" :style="{ 'width': width + 'px', 'top': top + 'px', 'left': left + 'px' }"
        name="todo-task-edit" id="" cols="26" rows="3" :value="props.editTask.taskName">
        </textarea>
</template>
<style scoped>
textarea {
    resize: none;
    background-color: #22272B;
    border-radius: 10px;
    border: none;
    color: var(--color-text);
    padding: 5px;
    font-size: 15px;
    opacity: 1;
    z-index: 12;
    position: absolute;

}
</style>