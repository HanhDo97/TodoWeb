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
    <main :style="{ gridTemplateColumns: hiddenNav ? '10px 1fr' : '' }">
        <NavSlide @toggle-nav-btn="handleToggleNav" />
        <TableDashBoard />
    </main>
</template>
<style>
main {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr 1fr;
}

@media (min-width: 700px) {
    main {
        display: grid;
        grid-template-columns: 250px 1fr;
    }
}

@media (min-width: 900px) {
    main {
        display: grid;
        grid-template-columns: 300px 1fr;
    }
}

header {
    border-bottom: 1px solid gray;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>