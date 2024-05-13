<script setup>
import { onMounted } from 'vue';
import NavTop from '../components/NavTop.vue'
import NavSlide from '@/components/NavSlide.vue';
import TableDashBoard from '@/components/TableDashBoard.vue';
import UserService from '@/services/UserService';
import { useRouter } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';

const loadingStore = useLoadingStore();
const router = useRouter();

onMounted(() => {
    // Get user information
    UserService.getInfor()
        .then((res) => {
            loadingStore.disableLoading('page');
        })
        .catch((err) => {
            UserService.navigateLoginPage(err);
            loadingStore.disableLoading('page');
        })
})

function handleToggleNav(hidden) {
    let tableDashBoardWrapperEl = document.getElementsByClassName('table-dashboard-wrapper')[0];

    if (hidden) {
        tableDashBoardWrapperEl.classList.remove('slide-right-from');
        tableDashBoardWrapperEl.classList.add('slide-right-to');
    } else {
        tableDashBoardWrapperEl.classList.remove('slide-right-to');
        tableDashBoardWrapperEl.classList.add('slide-right', 'slide-right-from');
    }
}
</script>
<template>
    <header>
        <NavTop />
    </header>
    <main v-if="loadingStore.loading.page == false">
        <NavSlide @toggle-nav-btn="handleToggleNav" />
        <TableDashBoard />
    </main>
    <div v-if="loadingStore.loading.page || loadingStore.loading.http" class="loading">
        <div class="loader"></div>
    </div>

</template>
<style>
.loading {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.3);
    z-index: 99;
    justify-content: center;
    align-items: center;
}

main {
    position: relative;
    overflow: hidden;
    margin-top: 52px;
}

header {
    border-bottom: 1px solid gray;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

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