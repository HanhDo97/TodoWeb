<script setup>
defineProps({
    todoTitle: {
        type: String,
        required: true
    }
})
</script>
<template>
    <div class="todo-card">
        <div class="todo-header">
            <div class="handle"><font-awesome-icon icon="fa-solid fa-grip-vertical" /></div>
            <p>{{ todoTitle }}</p>
            <button><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
        </div>
        <div class="todo-body">
            <slot></slot>
        </div>
    </div>
</template>
<style>
.handle:hover{
    cursor: grab;
}
.handle:active{
    cursor: grabbing;
}
.todo-header button {
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

.todo-header button:hover {
    cursor: pointer;
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

.todo-card .todo-header p {
    font-weight: 600;
}

.todo-card {
    background-color: black;
    width: 270px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.todo-body p {
    display: flex;
    justify-content: space-between;
    margin-bottom: .5rem;
    min-height: 35px;
    align-items: center;
    border-radius: 10px;
    background-color: #22272B;
    padding: 5px;
}

.todo-body p:hover {
    cursor: pointer;
    border: 2px solid purple
}
</style>
