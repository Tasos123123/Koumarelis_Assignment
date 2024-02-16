<script setup>
import MainPage from "@/components/pages/MainPage.vue"
</script>

<template>
<div class="card-container">
    <MainPage/>
</div>
</template>

<style scoped>
.card-container {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 550px;
  min-width: 300px;
  height: 95%; 
  overflow-y: auto; 
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
