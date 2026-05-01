<template>
  <router-view />
</template>

<script>
import router from './router/index.js';
</script>

<style>
/* Reset & base style biar konsisten */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
}
</style>