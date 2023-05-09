<template>
  <div class="bg">
    <div>
      <div class="h2">What's your gender?</div>
      <p>Pick what's best describes you.</p>
      <form>
      <label>
        Man
        <input type="radio" value="man" v-model="gender" />
      </label>
      <label>
        Woman
        <input type="radio" value="woman" v-model="gender" />
      </label>
      <label>
        Nonbinary
        <input type="radio" value="nonbinary" v-model="gender" />
      </label>
      </form>
    </div>
    <button :disabled="!isFormValid" @click="navigateToNextPage">></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gender: ''
    }
  },
  methods: {
    storeGender() {
      let user = JSON.parse(localStorage.getItem('user'))
      user.gender = this.gender
      localStorage.setItem('user', JSON.stringify(user))
    },
    navigateToNextPage() {
      this.storeGender()
      if (this.gender === '') {
        return
      }
      this.$router.push('/register/location')
    }
  },
  computed: {
    isFormValid() {
      return this.gender
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

form {
  display: flex;
  flex-direction: column;
  width: 320px;
}

label {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  background-color: white;
  border-radius: 8px;
  height: 50px;
  padding: 0 20px;
}

input {
  box-shadow: none;
  width: 20px;
  color: grey;
  accent-color: black;
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
