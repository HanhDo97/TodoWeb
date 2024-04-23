<script setup>
import NavTop from '../components/NavTop.vue'
import ProjectAbout from '@/components/ProjectAbout.vue';
import NavSlide from '@/components/NavSlide.vue'
</script>
<template>
    <header>
        <NavTop />
    </header>
    <main>
        <NavSlide />
        <ProjectAbout />
    </main>
</template>
<style>
main{
    display: grid;
    grid-template-columns: 1fr 1fr;
}
header {
    border-bottom: 1px solid gray;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}
</style>