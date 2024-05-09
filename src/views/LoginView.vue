<script setup>
import { computed } from 'vue';

const width = computed(()=>{
    return window.innerWidth;
})
</script>
<template>
    <div class="login-wrapper" :style="{width: width}">
        <h1>Login</h1>
    </div>
</template>
<style scoped>
.login-wrapper{
    height: 200px;
    background-color: hsl(0, 0%, 100%,0.1);
    

}
</style>
