<script setup>
import { onMounted, ref } from 'vue';
import TokenService from '@/services/TokenService';
import { useRouter } from 'vue-router';
import { useFlashMessage } from '@/stores/FlassMessage';
import UserService from '@/services/UserService';

const email = ref('');
const password = ref('');
const isLogging = ref(false);
const showPasswordInput = ref(false);
const showPassword = ref(false);
const router = useRouter();
const flashMessage = useFlashMessage();

const errors = ref({
    email: '',
    password: ''
})

onMounted(() => {
    window.addEventListener('resize', reloadPage);

    let inputEl = document.getElementsByName('email')[0];
    inputEl.addEventListener('focus', handleInputFocus)
    inputEl.focus();
})

function handleInputFocus() {
    errors.value.email = '';
    errors.value.password = '';
}
function reloadPage() {
    window.location.reload();
}
function checkEmail() {
    if (email.value == '') {
        errors.value.email = 'Email can not be blank'
        return;
    }
    showPasswordInput.value = true;
    setTimeout(() => {
        let passwordInputEl = document.getElementsByName('password')[0];
        passwordInputEl.addEventListener('focus', handleInputFocus)
        passwordInputEl.focus();
    }, 0);

}
function continueLogin() {
    if (password.value == '') {
        errors.value.password = 'Enter your password'
        return;
    }

    let credential = {
        email: email.value,
        password: password.value
    }

    isLogging.value = true;
    TokenService.getToken(credential)
        .then((res) => {
            isLogging.value = false;
            if (res.data.data.token != undefined &&
                res.data.data.token != ''
            ) {
                localStorage.setItem('token', res.data.data.token);

                setTimeout(() => {
                    router.push({
                        name: 'dashboard'
                    });
                }, 0);

                flashMessage.addMessage({ message: 'Login Success' })
            }
        }).catch((error) => {
            UserService.isIncorrectCredential(error);
            isLogging.value = false;
        })
}
function editEmail() {
    showPasswordInput.value = false;
    password.value = '';
}
function togglePassword() {
    showPassword.value = !showPassword.value;
}
</script>
<template>
    <div class="login-form">
        <div class="email-wrapper">
            <input name="email" placeholder="Enter your email" type="email" v-model="email"> <br>
            <div @click="editEmail" class="email-edit-ic"><font-awesome-icon icon="fa-solid fa-pencil" /></div>
            <span class="error" v-if="errors.email !== ''">{{ errors.email }}</span>
        </div>
        <div v-if="showPasswordInput" class="password-wrapper">
            <input @keyup.enter="continueLogin()" name="password" placeholder="Enter your password"
                :type="!showPassword ? 'password' : 'text'" v-model="password">
            <div @click="togglePassword" class="password-show-ic">
                <font-awesome-icon v-if="showPassword" icon="fa-solid fa-eye" />
                <font-awesome-icon v-else icon="fa-solid fa-eye-slash" />
            </div>
            <span class="error" v-if="errors.password !== ''">{{ errors.password }}</span>
        </div>
        <button v-if="!showPasswordInput" @click="checkEmail()">Continue</button>
        <button v-else @click="continueLogin()" :style="{ 'background-color': isLogging ? '#424141' : '' }">
            <span v-if="!isLogging">Log in</span>
            <div v-else class="loader"></div>
        </button>
        <small><i>(Demo account: user@mail.com/test321)</i></small>
    </div>
</template>
<style scoped>
.error {
    display: flex;
    color: rgb(249, 84, 84);
}

.login-wrapper .login-form button:hover {
    cursor: pointer;
    background-color: hsl(0, 0%, 0%, 0.6)
}

.login-wrapper .login-form {
    margin-bottom: 10px;
}

.login-wrapper .login-form button {
    width: 100%;
    height: 40px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
}

.login-wrapper input {
    width: 100%;
    height: 40px;
    border: 2px solid black;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 5px;
}

.email-wrapper,
.password-wrapper {
    position: relative;
}

.email-edit-ic,
.password-show-ic {
    position: absolute;
    top: 5px;
    right: 5px;
    color: black;
    width: 30px;
    height: 30px;
    font-size: 18px;
    border-radius: 3px;
    align-items: flex-start;
}

.email-edit-ic:hover,
.password-show-ic:hover {
    cursor: pointer;
    background-color: rgb(216, 217, 217, 0.5);
}

input[type="password"]::-ms-reveal {
    display: none;
}

/* HTML: <div class="loader"></div> */
.loader {
    width: 20px;
    aspect-ratio: 1;
    --c: no-repeat linear-gradient(#ffffff 0 0);
    background:
        var(--c) 0% 50%,
        var(--c) 50% 50%,
        var(--c) 100% 50%;
    background-size: 20% 100%;
    animation: l1 1s infinite linear;
}

@keyframes l1 {
    0% {
        background-size: 20% 100%, 20% 100%, 20% 100%
    }

    33% {
        background-size: 20% 10%, 20% 100%, 20% 100%
    }

    50% {
        background-size: 20% 100%, 20% 10%, 20% 100%
    }

    66% {
        background-size: 20% 100%, 20% 100%, 20% 10%
    }

    100% {
        background-size: 20% 100%, 20% 100%, 20% 100%
    }
}
</style>