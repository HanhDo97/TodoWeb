<script setup>
</script>
<template>
    <button class="todo-add-list">
        + Add another list
    </button>
</template>
<style scoped>
.todo-add-list {
    margin: 15px;
    height: 50px;
    width: 270px;
    border-radius: 10px;
    border: none;
    background-color: hsl(0, 0%, 0%, 0.3);
    color: whitesmoke;
    font-size: 18px;
    text-align: left;
}

.todo-add-list:hover {
    cursor: pointer;
    background-color: hsl(0, 0%, 0%, 0.5);
}
</style>