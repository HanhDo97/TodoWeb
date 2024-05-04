<script setup>
import { ref, onUpdated } from 'vue';
const props = defineProps(['list']);
const list = props.list;
const textVal = ref('');
const textareaElement = ref(undefined);
const addNewCardWrapperName = 'add-new-card-wrapper-' + list.id;
onUpdated(() => {
    textareaElement.value = document.getElementsByName('todo-add-card')[0];
    if (textareaElement.value !== undefined) {
        textareaElement.value.focus();

        window.addEventListener('click', clickHandler)
        // textareaElement.addEventListener('blur', hideAddNewCardTemplate);
    }
    else {
        window.removeEventListener('click', clickHandler);
    }
});

// event using hide text area when user click outside of div
function clickHandler(event) {
    let newCardWrapper = document.getElementsByName(addNewCardWrapperName)[0];
    if (
        newCardWrapper !== undefined && !newCardWrapper.contains(event.target)
    ) {
        hideAddNewCardTemplate();
    }
}
function displayAddNewCardTemplate(ev) {
    list.addNewCardStatus = true;

    ev.stopPropagation();
}
function hideAddNewCardTemplate() {
    list.addNewCardStatus = false;
}
function saveTextVal() {
    console.log(textVal);
};

</script>
<template>
    <div :name="addNewCardWrapperName">
        <div v-if="list.addNewCardStatus" class="textarea-add-card">
            <textarea v-bind="textVal" class="textarea" name="todo-add-card" id="" cols="30" rows="2"></textarea>
        </div>

        <div class="todo-action">
            <button v-if="!list.addNewCardStatus" @click="displayAddNewCardTemplate($event)"><font-awesome-icon
                    icon="fa-solid fa-plus" />
                Add
                a card</button>
            <button v-if="!list.addNewCardStatus"><font-awesome-icon icon="fa-solid fa-image" /></button>

            <button v-if="list.addNewCardStatus" @click="saveTextVal">Save</button>
            <button v-if="list.addNewCardStatus" @click="() => list.addNewCardStatus = false"><font-awesome-icon
                    icon="fa-solid fa-xmark" /></button>
        </div>
    </div>
</template>
<style scoped>
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

.todo-action {
    display: flex;
    justify-content: space-between;
}

.todo-action button {
    color: whitesmoke;
    font-weight: 600;
    background-color: transparent;
    border: none;
    font-size: 16px;
    padding: 5px;
    margin-right: 10px;
    text-wrap: nowrap;
    min-width: 32px;
    border-radius: 5px;
}

.todo-action button:hover {
    cursor: pointer;
    background-color: #22272B;
}
</style>