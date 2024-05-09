<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps(['textAreaRect', 'wrapperDomRect', 'editTask', 'idList', 'todoDashBoardHeight']);
const emit = defineEmits(['updateTask']);

const top = computed(() => props.textAreaRect.top - props.wrapperDomRect.top);
const left = computed(() => props.textAreaRect.left - props.wrapperDomRect.left);
const width = props.textAreaRect.width;
const title = ref(props.editTask.taskName)

const topOfEditActionDiv = ref(0)

onMounted(() => {
    let textarea = document.getElementsByName('todo-task-edit')[0];
    textarea.focus();

    let rectOfEditActionDiv = document.getElementsByClassName('todo-edit-action')[0].getBoundingClientRect();

    topOfEditActionDiv.value = (props.todoDashBoardHeight - top.value - rectOfEditActionDiv.height > 0) ? '0px' : props.todoDashBoardHeight - top.value - rectOfEditActionDiv.height + 'px';
})

function updateTask() {
    if (title.value !== '') {
        let payload = {
            id: props.editTask.taskId,
            idList: props.idList,
            title: title.value,
        }
        emit('updateTask', payload);
    }
}
</script>

<template>
    <div class="todo-edit-wrapper" :style="{ 'top': top + 'px', 'left': left + 'px' }">
        <div class="textarea-wrapper">
            <textarea class="textarea" :style="{ 'width': width + 'px' }" name="todo-task-edit" id="" cols="26" rows="3"
                v-model="title">
        </textarea>
            <br>
            <button @click="updateTask">
                Save
            </button>
        </div>

        <div class="todo-edit-action" :style="{ top: topOfEditActionDiv }">
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-address-card" /></span>
                    Open card
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-tag" /></span>
                    Edit labels
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-user" /></span>
                    Change members
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-image" /></span>
                    Change cover
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-clock" /></span>
                    Edit dates
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-right-long" /></span>
                    Move
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-copy" /></span>
                    Copy
                </button>
            </div>
            <div class="todo-edit-but">
                <button>
                    <span><font-awesome-icon icon="fa-solid fa-box" /></span>
                    Archive
                </button>
            </div>
        </div>
    </div>

</template>
<style scoped>
.todo-edit-action {
    display: flex;
    gap: .1rem;
    flex-wrap: wrap;
    flex-direction: column;
    position: absolute;
    right: 0;
}

.todo-edit-wrapper button {
    color: whitesmoke;
    font-weight: 600;
    background-color: #22272B;
    border: none;
    font-size: 14px;
    padding: 10px;
    text-wrap: nowrap;
    min-height: 40px;
    border-radius: 10px;
    width: auto;
    margin: 0.1rem;
}

.todo-edit-wrapper button:hover {
    cursor: pointer;
    background-color: #353738;
}

.todo-edit-wrapper button span {
    margin-right: .5rem
}

.todo-edit-wrapper {
    position: absolute;
    opacity: 1;
    color: whitesmoke;
    z-index: 12;
    display: flex;
    width: 410px;
    justify-content: space-between
}

textarea {
    font-family: var(--font-family);
    resize: none;
    background-color: #22272B;
    color: whitesmoke;
    border-radius: 10px;
    padding: 5px;
    font-size: 15px;
    outline: none !important;
    border: 1px solid inherit;
    box-shadow: 0 0 5px #719ECE;
}
</style>