<script setup>
import { ref, defineProps, onMounted } from 'vue';
import ProjectAbout from './ProjectAbout.vue';
import TodoList from './TodoList.vue';
import TodoEdit from './TodoEdit.vue';
import draggable from "vuedraggable/dist/vuedraggable.common";

const props = defineProps(['hiddenNav']);
const hiddenNav = props.hiddenNav;
const isHovered = ref(false);
const opacityDashBoard = ref(false);
const showEditTextArea = ref(false);
const textAreaRect = ref({
    top: '0px',
    left: '0px',
    width: '0px'
})
const wrapperRect = ref(null);
const editTask = ref(null)
const list = ref([
    {
        id: 1,
        listName: 'Planning',
        todos: [
            { taskId: 1, taskName: 'Project Planning', editMode: false },
            { taskId: 2, taskName: 'Sprint Planning', editMode: false },
            { taskId: 3, taskName: 'Metting Planning', editMode: false },
            { taskId: 4, taskName: 'Deploy Planning', editMode: false }
        ]
    },
    {
        id: 2,
        listName: 'Doing',
        todos: [
            { taskId: 5, taskName: 'Project Doing', editMode: false },
            { taskId: 6, taskName: 'Sprint Doing', editMode: false }
        ]
    }
]);
let todoDashBoardWidth = ref(getReponsiveWidth());

function getReponsiveWidth() {
    if (!hiddenNav) {
        return window.innerWidth - 265;
    }
    return window.innerWidth - 51;
}
function enableEditMode(list, indexTask, taskId) {
    list[indexTask].editMode = true;

    opacityDashBoard.value = true;

    editTask.value = list[indexTask];

    let todoTask = document.getElementById('todo-task-' + taskId);
    let wrapper = document.getElementsByClassName('table-dashboard-wrapper');
    let wrapperDomRect = wrapper[0].getBoundingClientRect();
    let domRect = todoTask.getBoundingClientRect();
    textAreaRect.value.top = domRect.top;
    textAreaRect.value.left = domRect.left;
    textAreaRect.value.width = domRect.width;
    wrapperRect.value = wrapperDomRect;
    showEditTextArea.value = true;

}
function disableEditMode() {
    opacityDashBoard.value = false;
}
onMounted(() => {
    window.addEventListener('resize', () => {
        todoDashBoardWidth.value = getReponsiveWidth();
    })
})

</script>

<template>
    <div class="table-dashboard-wrapper" :class="[!hiddenNav ? 'slide-right slide-right-from' : 'slide-right-to']">
        <TodoEdit :editTask="editTask" :textAreaRect="textAreaRect" :wrapperDomRect="wrapperRect"
            v-if="showEditTextArea" :key="editTask.taskId" />
        <ProjectAbout />
        <div class="todo-dashboard" :style="{ width: todoDashBoardWidth + 'px' }">
            <div v-for="(todoList, listIndex) in list" :key="listIndex" class="todo-list"
                :class="{ 'opacity': opacityDashBoard }">
                <todo-list :todoTitle="todoList.listName">
                    <draggable v-model="todoList.todos" class="list-group" group="list-group" @start="drag = true"
                        @end="drag = false" item-key="taskId">
                        <template #item="{ element, index }">
                            <div class="">
                                <div :id="'todo-task-' + element.taskId" class="todo-task"
                                    @mouseenter="isHovered = true" @mouseleave="isHovered = false">
                                    <slot v-bind="element">
                                        <p>
                                            <span>{{ element.taskName }}</span>
                                            <button @click="enableEditMode(todoList.todos, index, element.taskId)">
                                                <span><font-awesome-icon icon="fa-solid fa-pencil" /></span>
                                            </button>
                                        </p>
                                    </slot>
                                </div>
                            </div>
                        </template>
                    </draggable>
                </todo-list>
            </div>
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
    transition: transform 1s ease;
}

.slide-right-to {
    transform: translateX(30px);
}

.slide-right-from {
    transform: translateX(250px);
}

.todo-dashboard {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: calc(100% - 1rem);
    position: relative;
}

.todo-list {
    padding: 10px;
    height: auto;
}

.table-dashboard-wrapper {
    height: 100vh;
    width: 100%;
    background-color: #37722f;
}
</style>
