<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="body">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.bg {
  max-width: 390px;
  min-width: 390px;
  max-height: 844px;
  min-height: 844px;
  background-color: #fed045;
  padding: 10px;
}

.h2 {
  font-weight: 700 !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
