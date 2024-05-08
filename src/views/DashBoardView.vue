<script setup>
import NavTop from '../components/NavTop.vue'
import NavSlide from '@/components/NavSlide.vue';
import TableDashBoard from '@/components/TableDashBoard.vue';
import { ref } from 'vue';

let hiddenNav = ref(true);

function handleToggleNav(hidden) {
    hiddenNav.value = hidden;
}
</script>
<template>
    <header>
        <NavTop />
    </header>
    <main>
        <NavSlide @toggle-nav-btn="handleToggleNav" />
        <TableDashBoard :hiddenNav="hiddenNav" :key="hiddenNav" />
    </main>
</template>
<style>
main {
    position: relative;
    overflow: hidden;
}

header {
    border-bottom: 1px solid gray;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>