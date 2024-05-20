<script setup>
import FlashMessage from './components/cores/FlashMessage.vue';
import Loader from '@/components/cores/Loader.vue';
</script>

<template>
  <RouterView />
  <FlashMessage />
  <Loader />
</template>

<style scoped></style>
