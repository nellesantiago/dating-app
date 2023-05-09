<template>
  <div class="bg">
    <div>
      <h2 class="container">IT'S COOL<br>TO BE KIND</h2><br>
      <p>Welcome! We're excited to be part of your dating journey.</p>
      <p>Here we treat everyone with kindness and respect, no matter their race, religion, nationality, ethnicity, skin color, ability, size, sex, or gender identity.</p>
    </div>
    <button @click="submit">Find a match</button>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$router.push('/user/feed')
    }
  }
}
</script>

<style scoped>
.bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 100px 30px;
  font-size: 16px;
}


h2 {
    text-align: center;
    font-weight: 800;
    font-size: 50px;
    margin-bottom: 20px;
}

button {
    background-color: black;
    color: white;
    outline: none;
    border: none;
    padding: 10px 40px;
    font-size: 14px;
    border-radius: 20px;
}
</style>
