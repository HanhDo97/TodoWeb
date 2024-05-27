<script setup>
import moment from 'moment';
import { computed, ref } from 'vue';
const props = defineProps(['message'], {
    message: {
        require: true
    }
})
const message = ref(props.message)
function formattedDate(value) {
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY hh:mm')
    }
    return value;

}
</script>
<template>
    <div class="card-wrapper">
        <div class="header">
            <p>{{ message.data.project.title }}</p>
        </div>
        <div class="body">
            <div class="image">
                <img style="width: 24px;" src="/src/assets/logo.svg" alt="">
            </div>
            <div class="text">
                <p><b>{{ message.data.userFrom.name }}</b></p>
                <p>{{ message.data.message }} <a href="">{{ message.data.project.title }}</a> <small>{{
                    formattedDate(message.created_at) }}</small></p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.body {
    background-color: #2C333A;
    display: flex;
    padding: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.image {
    padding: 5px;
}

.header {
    height: 40px;
    padding: 10px;
    background-color: #1D2125;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
}

p {
    color: #B6C2CF;
}

a {
    color: #5b5bfa;
}

.card-wrapper {
    min-width: 400px;
    border-radius: 10px;
    margin-bottom: 1rem;
}
</style>