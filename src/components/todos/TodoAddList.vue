<script setup>
import TodoList from './TodoList.vue';
import { nanoid } from 'nanoid';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const id = ref(nanoid());
const hideAddList = ref(true);

function onUpdateTitle(payload) {
    console.log(payload);
    if (payload.title == '') {
        onCloseAddList();
    }
    else {
        let data = {
            id: payload.id,
            title: payload.title,
            tasks: [],
        }
        
        userStore.pushNewList(data);

        onCloseAddList();
    }
}
function onCloseAddList() {
    hideAddList.value = true;
}
function showAddList() {
    hideAddList.value = false;
}
</script>
<template>

    <div v-if="!hideAddList" class="card-wrapper">
        <TodoList :todoTitle="''" :id="id" @update-title="onUpdateTitle" @close-add-list="onCloseAddList" />
    </div>

    <div @click="showAddList()" class="todo-add-list">
        + Add another list
    </div>
</template>
<style scoped>
.card-wrapper {
    margin: 12px;
}

.todo-add-list {
    white-space: nowrap;
    margin: 15px;
    height: 50px;
    width: 270px;
    border-radius: 10px;
    border: none;
    background-color: hsl(0, 0%, 0%, 0.3);
    color: whitesmoke;
    font-size: 18px;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 5px;
}

.todo-add-list:hover {
    cursor: pointer;
    background-color: hsl(0, 0%, 0%, 0.5);
}
</style>