<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const props = defineProps({
    todoTitle: {
        type: String,
        required: true
    }, id: {
        type: [Number, String],
        required: true
    }
})
const emit = defineEmits(['updateTitle', 'closeAddList'])
const editStatus = ref(false)
const title = ref(props.todoTitle)
const inputEl = ref(null)

onMounted(() => {
    if (props.todoTitle == '') {
        editTitleEnable()
    }
})

function editTitleEnable() {
    editStatus.value = true

    setTimeout(() => {
        inputEl.value = document.getElementsByTagName('input')[0];
        inputEl.value.focus();

        // Add event listener for the blur event
        inputEl.value.addEventListener('blur', onBlurCallback);
        // Add event listener for the Enter key press event
        inputEl.value.addEventListener('keypress', onEnterKeyPress);
    }, 0)
}
function onBlurCallback() {
    editStatus.value = false;

    // Update Title
    if (title.value !== props.todoTitle || title.value !== '') {
        let payload = {
            id: props.id,
            title: title.value
        }
        emit('updateTitle', payload)
    } else {
        emit('closeAddList', true)
    }

    inputEl.value.removeEventListener('blur', onBlurCallback);
}
function onEnterKeyPress(event) {
    if (event.key === "Enter") {
        onBlurCallback();
    }
}
</script>
<template>
    <div class="todo-card">
        <div class="todo-header">
            <div class="handle"><font-awesome-icon icon="fa-solid fa-grip-vertical" /></div>
            <Transition name="edit-status">
                <p :key="1" v-if="!editStatus" class="title" @click="editTitleEnable">{{ todoTitle }}</p>
                <input :key="2" v-else type="text" v-model="title">
            </Transition>
            <button><font-awesome-icon icon="fa-solid fa-ellipsis" /></button>
        </div>
        <div class="todo-body">
            <slot></slot>
        </div>
    </div>
</template>
<style>
.edit-status-enter-active,
.edit-status-leave-active {
    transition: all 0.3s ease;
}

.edit-status-enter-from,
.edit-status-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.todo-card .title:hover {
    cursor: pointer;
}

.handle:hover {
    cursor: grab;
}

.handle:active {
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
