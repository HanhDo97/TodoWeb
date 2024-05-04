<script setup>
import { defineProps, computed, onMounted } from 'vue';

const props = defineProps(['textAreaRect', 'wrapperDomRect', 'editTask']);

const top = computed(() => props.textAreaRect.top - props.wrapperDomRect.top);
const left = computed(() => props.textAreaRect.left - props.wrapperDomRect.left);
const width = props.textAreaRect.width;

onMounted(() => {
    let textarea = document.getElementsByName('todo-task-edit')[0];
    textarea.focus();
})
</script>

<template>
    <div class="todo-edit-wrapper" :style="{ 'top': top + 'px', 'left': left + 'px' }">
        <div class="textarea-wrapper">
            <textarea class="textarea" :style="{ 'width': width + 'px' }" name="todo-task-edit" id="" cols="26" rows="3"
                :value="props.editTask.taskName">
        </textarea>
        <button>
            Save
        </button>
        </div>

        <div class="todo-edit-action">
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