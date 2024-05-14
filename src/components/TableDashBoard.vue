<script setup>
import { ref, onMounted } from 'vue';
import ProjectAbout from './todos/ProjectAbout.vue';
import TodoList from './todos/TodoList.vue';
import TodoEdit from './todos/TodoEdit.vue';
import TodoAddNewCard from './todos/TodoAddNewCard.vue';
import TodoAddList from './todos/TodoAddList.vue';
import draggable from "vuedraggable/dist/vuedraggable.common";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { todos } = storeToRefs(userStore);
const isHovered = ref(false);
const opacityDashBoard = ref(false);
const showEditTextArea = ref(false);
const textAreaRect = ref(null)
const wrapperRect = ref(null);
const editTask = ref(null);
const idList = ref(null);
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
    opacityDashBoard.value = true;

    editTask.value = task;
    idList.value = list.id;

    let wrapperDomRect = document.getElementsByClassName('table-dashboard-wrapper')[0].getBoundingClientRect();
    textAreaRect.value = document.getElementById('todo-task-' + task.taskId).getBoundingClientRect();

    wrapperRect.value = wrapperDomRect;
    showEditTextArea.value = true;

    event.stopPropagation();
}
function disableEditMode() {
    opacityDashBoard.value = false;
    showEditTextArea.value = false;

}

// function determine which list is on add new card
function onAddNewCardId(id) {
    todos.value.forEach((el) => {
        if (el.id == id) {
            el.addNewCardStatus = true;
        } else {
            el.addNewCardStatus = false;
        }
    })
}

function onUpdateTitle(payload) {
    let listEleIndex = todos.value.findIndex((el) => el.id == payload.id)
    todos.value[listEleIndex].listName = payload.title;
}

function onUpdateTask(payload) {
    let listEleIndex = todos.value.findIndex((el) => el.id == payload.idList)
    let taskEleIndex = todos.value[listEleIndex].todos.findIndex((el) => el.taskId == payload.id)

    todos.value[listEleIndex].todos[taskEleIndex].taskName = payload.title
    disableEditMode();
}

function onCreateList(payload) {
    todos.value.push(payload);
}
</script>

<template>
    <div class="table-dashboard-wrapper slide-right-to">
        <TodoEdit :editTask="editTask" :textAreaRect="textAreaRect" :wrapperDomRect="wrapperRect" :idList="idList"
            :todoDashBoardHeight="todoDashBoardHeight" @update-task="onUpdateTask" v-if="showEditTextArea"
            :key="editTask.taskId" class="todo-edit" />

        <ProjectAbout />

        <div class="todo-dashboard" :style="{ height: todoDashBoardHeight + 'px' }"
            :class="{ 'opacity': opacityDashBoard }">
            <draggable v-model="todos" group="list" class="todo-list" item-key="id" :animation="300" handle=".handle">
                <template #item="{ element: list }">
                    <todo-list :todoTitle="list.title" :id="list.id" @update-title="onUpdateTitle">
                        <draggable v-model="list.tasks" class="task-group" :group="{ name: 'tasks' }" item-key="id"
                            :animation="300">
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

                        <TodoAddNewCard :list="list" @add-new-card-id="onAddNewCardId" />
                    </todo-list>
                </template>
            </draggable>

            <TodoAddList @create-list="onCreateList" />

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
