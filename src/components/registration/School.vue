<template>
  <div class="bg">
    <div>
      <div class="h2">If school's your thing...</div>
      <input id="school" type="text" v-model="school" @input="validateSchool" placeholder="Enter school name, past or current"/>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <div class="buttons">
      <RouterLink to="/register/gender-interest">Skip</RouterLink>
      <button :disabled="!isFormValid" @click="saveSchool">></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      school: '',
      error: ''
    }
  },
  methods: {
    validateSchool() {
      const regex = /^[a-zA-Z ]+$/
      if (!regex.test(this.school)) {
        this.error = 'Please enter only letters'
      } else {
        this.error = ''
      }
    },

    saveSchool() {
      if (this.error) {
        return
      }

      const formattedschool = this.school.toLowerCase().replace(/\b\w/g)
      let user = JSON.parse(localStorage.getItem('user'))
      user.school = this.school.toLowerCase()
      localStorage.setItem('user', JSON.stringify(user))

      this.$router.push('/register/gender-interest')
    }
  },
  computed: {
    isFormValid() {
      return this.school
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 100px 30px;
}

input {
  width: 320px;
  border: none;
  border-radius: 8px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  margin-top: 10px;
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

.buttons {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
}

a {
  color: black;
}

a:hover {
  color: black;
}
</style>
