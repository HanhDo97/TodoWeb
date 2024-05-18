<script setup>
import { ref, onMounted, watch } from 'vue';
import ProjectAbout from './todos/ProjectAbout.vue';
import TodoList from './todos/TodoList.vue';
import TaskEdit from './todos/TaskEdit.vue';
import TodoAddNewCard from './todos/TodoAddNewCard.vue';
import TodoAddList from './todos/TodoAddList.vue';
import draggable from "vuedraggable/dist/vuedraggable.common";
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import PositionService from '@/services/PositionService';

const projectStore = useProjectStore();
const { todos, currentProject } = storeToRefs(projectStore);
const totalList = todos.value.length;
const isHovered = ref(false);
const opacityDashBoard = ref(false);
const showEditTextArea = ref(false);
const taskToEdit = ref(null);
const listToEdit = ref(null);
const todoDashBoardHeight = ref(window.innerHeight);

onMounted(() => {
    calculateHeightOfDashboard();

    window.addEventListener('resize', () => {
        calculateHeightOfDashboard();
    })

    window.addEventListener('click', function (event) {
        let todoEditElement = document.getElementsByClassName('todo-edit')[0];
        if (
            todoEditElement !== undefined
            && todoEditElement.contains(event.target) == false
            && showEditTextArea.value
            && opacityDashBoard.value
        ) {
            disableEditMode();
        }
    });

})

// calculate height of todo-dashboard
function calculateHeightOfDashboard() {
    let navRect = document.getElementsByTagName('nav')[0].getBoundingClientRect();
    let projectAboutRect = document.getElementsByClassName('project-about-wrapper')[0].getBoundingClientRect();
    let screenHeight = window.innerHeight;

    todoDashBoardHeight.value = screenHeight - navRect.height - projectAboutRect.height;
}
function enableEditMode(list, task, event) {
    // blur the screen
    opacityDashBoard.value = true;

    // Update data to update
    taskToEdit.value = task;
    listToEdit.value = list;

    // show text area to
    showEditTextArea.value = true;

    event.stopPropagation();
}
function disableEditMode() {
    opacityDashBoard.value = false;
    showEditTextArea.value = false;
}

function isUpdateSuccess(bool) {
    if (bool) {
        disableEditMode();
    }
}
function onUpdateTitle(payload) {
    projectStore.updateList(payload);
}
function onGroupsChange() {
    let newTodos = todos.value.map((el, index) => {
        let ob = {
            id: el.id,
            title: el.title,
            order: index
        }
        return ob;
    });

    let payload = {
        todos: newTodos,
        project_id: currentProject.value.id
    }

    PositionService.updateTodos(payload);
}

function onTaskChange(list, event) {
    const { added } = event;
    
    if (added) {
        PositionService.updateTask(list, added.element);
    }

}
</script>

<template>
    <div class="table-dashboard-wrapper slide-right-to">
        <TaskEdit v-if="showEditTextArea" :taskToEdit="taskToEdit" :listToEdit="listToEdit"
            :todoDashBoardHeight="todoDashBoardHeight" @is-update-success="isUpdateSuccess" :key="taskToEdit.id"
            class="todo-edit" />

        <ProjectAbout />

        <div class="todo-dashboard" :style="{ height: todoDashBoardHeight + 'px' }"
            :class="{ 'opacity': opacityDashBoard }">
            <draggable v-model="todos" group="list" class="todo-list" item-key="id" :animation="300" handle=".handle"
                @change="onGroupsChange">
                <template #item="{ element: list }">
                    <todo-list :todoTitle="list.title" :id="list.id" @update-title="onUpdateTitle">
                        <draggable v-model="list.tasks" class="task-group" :group="{ name: 'tasks' }" item-key="id"
                            :animation="300" @change="onTaskChange(list, $event)">
                            <template #item="{ element: task }">
                                <div class="">
                                    <div :id="'todo-task-' + task.id" class="todo-task" @mouseenter="isHovered = true"
                                        @mouseleave="isHovered = false">
                                        <slot v-bind="task">
                                            <p>
                                                <span>{{ task.title }}</span>
                                                <button @click="enableEditMode(list, task, $event)">
                                                    <span><font-awesome-icon icon="fa-solid fa-pencil" /></span>
                                                </button>
                                            </p>
                                        </slot>
                                    </div>
                                </div>
                            </template>
                        </draggable>

                        <TodoAddNewCard :list="list" />
                    </todo-list>
                </template>
            </draggable>

            <TodoAddList :totalList="totalList" />

        </div>
    </div>
</template>

<style scoped>
.opacity {
    opacity: 0.1;
    z-index: 0;
}

.todo-task {
    position: relative;
}

.todo-task button {
    color: whitesmoke;
    font-weight: 600;
    background-color: transparent;
    border: none;
    font-size: 16px;
    padding: 5px;
    margin-right: 10px;
    text-wrap: nowrap;
    min-width: 32px;
    position: absolute;
    top: 3px;
    right: -5px;
    opacity: 0;
    transition: opacity 0.3s;
}

.todo-task:hover button {
    opacity: 1;
    /* Show button on hover */
}

.todo-task button:hover {
    cursor: pointer;
    background-color: var(--header-button-hovered);
    border-radius: 5px;
}

.slide-right {
    transition: transform 0.3s ease;
}

.slide-right-to {
    transform: translateX(0);
}

.slide-right-from {
    transform: translateX(225px);
}

.todo-dashboard {
    position: relative;
    color: rgb(226, 226, 226);
    display: flex;
    align-items: flex-start;
    overflow-x: auto;
    width: calc(100% - 25px);
}

.todo-list {
    padding: 10px;
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.table-dashboard-wrapper {
    width: 100%;
    background-color: #37722f;
    margin-left: 26px;
    position: fixed
}
</style>
