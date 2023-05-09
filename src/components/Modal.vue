<template>
    <div class="modal">
      <div class="modal-overlay" @click="$emit('close')"></div>
      <div class="modal-container">
        
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    props: {
      title: String,
      confirmButtonText: String,
    },
  };
  </script>
  
  <style scoped>
  /* Style for Modal */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  
  .modal-container {
    width: 60%;
    max-width: 300px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    z-index: 1;
  }
  
  .modal-header {
    padding: 20px;
    background-color: #f6f6f6;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h2 {
    margin: 0;
  }
  
  .modal-close-btn {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-close-btn i {
    color: #000;
    font-size: 20px;
  }
  
  .modal-close-btn:hover i {
    color: #000;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 20px;
    background-color: #f6f6f6;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: flex-end;
  }
  
  .modal-confirm-btn {
    background-color: #333;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .modal-confirm-btn:hover {
    background-color: #000;
  }
  </style>
  