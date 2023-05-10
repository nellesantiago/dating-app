<template>
    <div class="d-flex justify-content-center spinner">
      <div class="spinner-bg">
        <div class="spinner-border text-light" style="width: 3rem; height: 3rem" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .spinner {
    position: absolute;
    left: 0;
    top: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200vh;
  }
  
  .spinner-bg {
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
  