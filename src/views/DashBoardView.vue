<script setup>
import NavTop from '../components/NavTop.vue'
import NavSlide from '@/components/NavSlide.vue';
import TableDashBoard from '@/components/TableDashBoard.vue';

function handleToggleNav(hidden) {
    let tableDashBoardWrapperEl = document.getElementsByClassName('table-dashboard-wrapper')[0];
    console.log(hidden);
    
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
    <main>
        <NavSlide @toggle-nav-btn="handleToggleNav" />
        <TableDashBoard/>
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