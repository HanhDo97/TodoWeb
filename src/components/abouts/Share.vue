<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '@/stores/project';
import { useFlashMessage } from '@/stores/FlassMessage';
import Loader from '../cores/Loader.vue';
import ProjectService from '@/services/ProjectService';

const emits = defineEmits('closeBoard');
const projectStore = useProjectStore();
const flashMessage = useFlashMessage();
const { currentProject } = storeToRefs(projectStore);
const users = ref(null);
const btnClickedType = ref('');
const changeRoleBag = ref([])
const display = ref({
    selectRole: false,
    changeRole: false,
    loader: false,
});

onMounted(() => {
    // Get users for this project
    display.value.loader = true;
    ProjectService.getUsers(currentProject.value.id).then(res => {
        changeRoleBag.value = res.data.users.map(el => {
            return {
                id: el.id,
                changeRole: false
            }
        });
        console.log("🚀 ~ ProjectService.getUsers ~ changeRoleBag:", changeRoleBag)

        users.value = res.data.users;
        display.value.loader = false;
    }).catch(() => {
        flashMessage.addMessage({
            message: 'Error occurred',
            type: 'error'
        });
    })

    setTimeout(() => {
        window.addEventListener('click', handleShareContainerOutSideClick)
    }, 0);
})
onUnmounted(() => {
    window.addEventListener('click', handleShareContainerOutSideClick);
    window.addEventListener('click', handleSelectRoleOutSideClick);
    window.addEventListener('click', handleChangeRoleOutSideClick);
})


function toggleButton(event, type, changeRoleIndex) {
    setTimeout(() => {

        display.value[type] = !display.value[type];

        btnClickedType.value = type;

        generateEventOutClick();

        displayChangeRoleByIndex(changeRoleIndex);

        event.stopPropagation()
    }, 0);
}
function displayChangeRoleByIndex(changeRoleIndex) {
    changeRoleBag.value.forEach((el, i) => {
        if (changeRoleIndex == i) el.changeRole = true;
        else el.changeRole = false
    })
}
function generateEventOutClick() {
    if (btnClickedType.value == 'selectRole') {
        display.value.changeRole = false;
        window.addEventListener('click', handleSelectRoleOutSideClick);
    }
    else {
        display.value.selectRole = false;
        window.addEventListener('click', handleChangeRoleOutSideClick);
    }
}
function handleShareContainerOutSideClick(event) {
    let shareEl = document.getElementsByName('share')[0];

    if (shareEl !== undefined
        && shareEl.contains(event.target) == false) {
        display.value.changeRole = false;
        display.value.selectRole = false;

        emits('closeBoard', true);

        window.removeEventListener('click', handleShareContainerOutSideClick)
    }
}
function handleSelectRoleOutSideClick(event) {
    let selectRoleEl = document.getElementsByName('select-role')[0];

    if (selectRoleEl !== undefined
        && selectRoleEl.contains(event.target) == false) {

        display.value.selectRole = false;

        window.removeEventListener('click', handleSelectRoleOutSideClick)

    }
}
function handleChangeRoleOutSideClick(event) {
    display.value.changeRole = false;

    let changeRoleEl = document.getElementsByName('change-role')[0];

    if (changeRoleEl !== undefined
        && changeRoleEl.contains(event.target) == false) {

        display.value.changeRole = false;

        window.removeEventListener('click', handleChangeRoleOutSideClick)

    }
}
</script>

<template>
    <div name="share" class="share" :style="{ padding: !display.loader ? '10px' : '' }">
        <Loader v-if="display.loader" :display="true" />
        <div v-else class="wrapper">
            <div class="title">
                <h2>Share board</h2>
                <h2><button><font-awesome-icon icon="fa-solid fa-xmark" /></button></h2>
            </div>
            <div class="body">
                <div class="action">
                    <div class="input-wrapp">
                        <input type="text" placeholder="Enter address or name">
                    </div>
                    <div class="rol-con">
                        <button @click="toggleButton($event, 'selectRole')" class="select-button"
                            :class="{ 'button-selected': display.selectRole }">
                            <p>Member</p><font-awesome-icon icon="fa-solid fa-chevron-down" />
                        </button>
                        <div v-if="display.selectRole" class="select-role" name="select-role">
                            <p>Member</p>
                            <p>Observer <br> <small>Add people with limited permissions to this board</small></p>
                        </div>
                    </div>
                    <button name="exec-share-btn">
                        Share
                    </button>
                </div>


            </div>
            <div class="footer">
                <div class="link">
                    <div class="ic">
                        <font-awesome-icon icon="fa-solid fa-link" />
                    </div>
                    <div class="text">
                        <p>Anyone with the board share link</p>
                        <p><a href="">Copy link</a></p>
                    </div>
                </div>
                <div class="list-user">
                    <div v-for="(user, index) in users" :key="index" class="container">
                        <div class="info">
                            <div class="ic">
                                <font-awesome-icon icon="fa-solid fa-user" />
                            </div>
                            <div class="text">
                                <p>{{ user.name }}</p>
                                <p style="color: gray;">{{ user.email }}</p>
                            </div>
                        </div>
                        <div class="action">
                            <button @click="toggleButton($event, 'changeRole', index)" class="select-button" :class="{
                                'button-selected': display.changeRole && changeRoleBag[index].changeRole
                            }">Admin
                                <font-awesome-icon icon="fa-solid fa-chevron-down" /></button>
                            <div v-if="display.changeRole && changeRoleBag[index].changeRole" class="change-role"
                                name="change-role">
                                <p>Admin</p>
                                <p>Membecr <br> <small>Boards must have at least one admin</small></p>
                                <p>Observer <br> <small>Add people with limited permissions to this board</small>
                                </p>
                                <p>Leave board</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
/* COMMON CSS */
.select-button {
    height: 40px;
    width: 100% !important;
    color: rgb(222, 219, 219);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #22272B;
    font-size: 14px;
}

.select-button:hover {
    background-color: rgb(30, 34, 37);
    cursor: pointer;
}

.button-selected {
    background-color: #09326C !important;
    color: #579DFF !important;
}

/* SHARE CSS */
.share .action {
    position: relative;
}

.info .ic {
    width: 25px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(222, 219, 219);
}

.container .info {
    display: flex;
    gap: 10px;
    color: rgb(222, 219, 219);
}

.list-user .container {
    display: grid;
    grid-template-columns: 5fr 1fr;
    margin-bottom: 1rem;
}

.link .ic {
    width: 50px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(222, 219, 219);
    border: 1px solid gray;
    margin-right: 0.3rem;
    border-radius: 5px;
}

.share .footer .link {
    display: flex;
    color: rgb(222, 219, 219);
    margin-bottom: 1rem
}

.share .footer {
    margin-top: 1rem;
}

.rol-con {
    position: relative;
}

.change-role p,
.select-role p {
    height: auto;
    min-height: 30px;
    float: left;
    width: 100%;
    text-align: start;
    color: rgb(222, 219, 219);
    padding: 5px
}

.change-role p:hover,
.select-role p:hover {
    background-color: #09326C;
    color: #579DFF;
    cursor: pointer;
}

.action .change-role,
.share .select-role {
    position: absolute;
    top: 50px;
    left: -210px;
    width: 300px;
    background-color: #282E33;
    border: 1px solid rgb(130, 130, 130, 0.3);
    padding: 10px;
    height: auto;
    border-radius: 5px;
    z-index: 9;
}

.share .title button {
    background-color: transparent;
    border: none;
    color: var(--ds-text-subtle);
    width: 30px;
    height: 30px;
}

.share .title button:hover {
    background-color: rgb(157, 157, 157, 0.3);
    cursor: pointer;
    color: var(--ds-text-subtle);

}

.share .body button[name=exec-share-btn] {
    height: 42px;
    background-color: hsl(240, 61%, 57%) !important;
}

.share .body button[name=exec-share-btn]:hover {
    cursor: pointer;
    background-color: hsl(240, 61%, 57%, 0.8) !important;
}

.share .input-wrapp {
    border: 1px solid #B6C2CF;
    border-radius: 3px;
}

.share input {
    height: 40px;
    border: none;
    background-color: #22272B;
    color: var(--ds-text-subtle);
    width: 100%;
    font-size: 16px;
    padding-left: 5px;
    border-radius: 3px;
}

.share input[type="text"]:focus {
    border: 2px solid #B6C2CF;
    outline: none;
}

.share .body .action {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr;
}

.share .member-select {
    background-color: #22272B;
    height: 40px;
    color: var(--ds-text-subtle);
    border: 1px solid #B6C2CF;
    border-radius: 3px;
}

.share .body .action button[name=exec-share-btn] {
    color: rgb(222, 219, 219);
    background-color: #22272B;
    width: auto;
}

.share .title {
    display: flex;
    justify-content: space-between;
    color: rgb(222, 219, 219);
    margin-bottom: 1rem;
}

.share {
    position: absolute;
    background-color: #282E33;
    top: 60px;
    right: 25px;
    z-index: 99;
    min-height: 250px;
    width: 500px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
</style>