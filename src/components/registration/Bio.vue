<template>
  <div class="bg">
    <div>
      <div class="h2">Add more about you</div>
      <p>Other people looking for a relationship love to see a bio that shows who you are.</p>
      <textarea v-model="bio" @input="checkInput" placeholder="Type here..."></textarea>
    </div>
    <button :disabled="!isFormValid" @click="submit">></button>
  </div>
</template>

<script>
export default {
  computed: {
    isFormValid() {
      return this.bio
    }
  },
  data() {
    return {
      bio: ''
    }
  },
  methods: {
    submit() {
      let user = JSON.parse(localStorage.getItem('user'))
      user.bio = this.bio
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/register/credentials')
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
}

textarea {
  width: 330px;
  outline: none;
  border: none;
  border-radius: 8px;
  height: 200px;
  padding: 20px;

}

button {
  border: none;
  outline: none;
  background-color: black;
  color: white;
  height: 50px;
  width: 50px;
  text-align: center;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
}
</style>
