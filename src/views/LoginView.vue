<script setup>
import { onMounted } from 'vue';
import Form from '@/components/login/Form.vue';
import { googleOneTap, decodeCredential } from "vue3-google-login"


onMounted(() => {
    googleOneTap()
        .then((response) => {
            // This promise is resolved when user selects an account from the the One Tap prompt
            const userData = decodeCredential(response.credential)
            console.log("Handle the userData", userData)
        })
        .catch((error) => {
            console.log("Handle the error", error)
        })
})
</script>
<template>
    <div class="login-wrapper">
        <h1><font-awesome-icon icon="fa-solid fa-chart-simple" /> TodoApp</h1>
        <h3>Log in to continue</h3>
        <Form />
        <h4>Or continue with:</h4>
        <div class="login-method">
            <button>Microsoft</button>
            <button>Apple</button>
            <button>Slack</button>
        </div>
        <div class="register">
            <a href="">Can't log in ?</a>
            <a href="">Create an account</a>
        </div>
    </div>
</template>
<style scoped>
h3 {
    margin-bottom: 1rem
}

.login-wrapper a:hover {
    color: rgb(98, 98, 255);
}

.login-wrapper .register {
    margin-top: 1rem;
}

.login-wrapper button {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    border: none;
    font-size: 16px;
}

.login-wrapper .login-method {
    display: grid;
    place-items: center;
    gap: 10px
}

.login-wrapper {
    min-height: 200px;
    max-width: 350px;
    text-align: center;
    padding: 20px;
    top: 50px;
    color: whitesmoke;
    margin: 0px auto;
}
</style>
