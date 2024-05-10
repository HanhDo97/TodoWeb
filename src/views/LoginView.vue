<script setup>
import { computed, onMounted } from 'vue';

const width = computed(() => {
    return window.innerWidth / 2 + 'px';
})
const left = computed(() => {
    return window.innerWidth / 4 + 'px';
})

onMounted(()=>{
    // refresh component
    window.addEventListener('resize', reloadPage)
})

function reloadPage(){
    window.location.reload();
}
</script>
<template>
    <div class="login-wrapper" :style="{ width: width, left: left }">
        <h1><font-awesome-icon icon="fa-solid fa-chart-simple" /> TodoApp</h1>
        <h3>Log in to continue</h3>
        <input type="text"><br>
        <button>Continue</button>
        <h4>Or continue with:</h4>
        <div class="login-method">
            <button>Google</button>
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
.login-wrapper a:hover{
    color: rgb(98, 98, 255);
}
.login-wrapper .register{
    margin-top: 1rem;
}

.login-wrapper .login-method button{
    width: 200px;
    height: 35px;
}
.login-wrapper .login-method{
    display: grid;
    place-items: center;
    gap: 10px
}
.login-wrapper input {
    margin-top: 15px;
    margin-bottom: 5px;
}

.login-wrapper {
    min-height: 200px;
    text-align: center;
    padding: 20px;
    position: absolute;
    top: 50px;
}
</style>
