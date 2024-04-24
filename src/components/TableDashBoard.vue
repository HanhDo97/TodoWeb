<script setup>
import { ref } from 'vue';
import ProjectAbout from './ProjectAbout.vue';

const hoveredIndex = ref(null);

const todos = [
    {
        taskId: 1,
        taskName: 'Project Planning'
    }, {
        taskId: 2,
        taskName: 'Sprint Planning'
    }, {
        taskId: 3,
        taskName: 'Deploy Planning'
    }
]

function setHovered(index) {
    hoveredIndex.value = index;
}
</script>

<template>
    <div class="table-dashboard-wrapper">
        <ProjectAbout />

        <div class="todo-list">
            <div class="todo-card">
                <div class="todo-header">
                    <p>Planning</p>
                    <button><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
                </div>
                <div class="todo-body">
                    <p v-for="(todo, index) in todos" :key="index" @mouseenter="setHovered(index)"
                        @mouseleave="setHovered(null)">
                        <span>{{ todo.taskName }}</span>
                        <font-awesome-icon icon="fa-solid fa-pencil" v-if="hoveredIndex === index" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.todo-body p {
    display: flex;
    justify-content: space-between;
    position: relative;
}

.todo-body p font-awesome-icon {
    display: none;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

.todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    min-height: 100px;
    width: 270px;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
}

.todo-list {
    width: 100%;
    padding: 10px;
    display: flex;
}

.table-dashboard-wrapper {
    height: 100%;
    width: 100%;
    background-color: #37722f;
}
</style>
