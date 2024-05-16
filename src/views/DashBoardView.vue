<script setup>
import { onMounted } from 'vue';
import NavTop from '../components/NavTop.vue'
import NavSlide from '@/components/NavSlide.vue';
import TableDashBoard from '@/components/TableDashBoard.vue';
import UserService from '@/services/UserService';
import { useUserStore } from '@/stores/user';
import { useLoadingStore } from '@/stores/loading';
import { useProjectStore } from '@/stores/project';
import NetworkService from '@/services/NetworkService';

const projectStore = useProjectStore();
const loadingStore = useLoadingStore();
const userStore = useUserStore();

onMounted(() => {
    // Get user information
    UserService.getInfor()
        .then((res) => {
            projectStore.initProject(res.data.projects);
            userStore.setupUser(res.data);
            loadingStore.disableLoading('page');
        })
        .catch((err) => {
            NetworkService.unAuthorized(err);
            NetworkService.errorConnection(err);
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
</template>
<style>
main {
    position: relative;
    overflow: hidden;
    margin-top: 52px;
}

header {
    border-bottom: 1px solid gray;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>