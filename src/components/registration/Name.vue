<template>
  <div class="bg">
    <div>
      <div class="h2">What's your name?</div>
      <p>This will be shown on your profile.</p>
      <label for="firstName">First Name</label>
      <input
        v-model="firstName"
        type="text"
        class="form-control"
        id="firstName"
        placeholder="Enter first name"
        required
      />
      <label for="lastName">Last Name</label>
      <input
        v-model="lastName"
        type="text"
        class="form-control"
        id="lastName"
        placeholder="Enter last name"
        required
      />
    </div>
    <button :disabled="!isFormValid" @click.prevent="submit">></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    submit() {
      if (this.firstName == '' || this.lastName == '') {
        alert('Enter valid name')
        return
      }
      let array = [this.firstName, this.lastName]
      let [fName, lName] = array.map((item) =>
        item
          .toLowerCase()
          .replace(/[^a-zA-Z ]/g, '')
          .trim()
      )
      if (fName == '' || lName == '') {
        alert('Enter valid name')
        return
      }
      let user = {
        firstName: fName,
        lastName: lName
      }
      //   localStorage.setItem('firstName', fName)
      //   localStorage.setItem('lastName', lName)
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/register/image')
    }
  },
  computed: {
    isFormValid() {
      return this.firstName && this.lastName
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
  padding: 100px 0px;
}

h2 {
  font-size: 30px;
  font-weight: 700;
}

p {
  margin-bottom: 30px;

}

label {
  margin-bottom: 5px;
}
input {
  margin-bottom: 20px;
  outline: none;
  border: none;
  height: 40px;
  width: 320px;
  border-radius: 8px;
  font-size: 14px;
  box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -webkit-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -moz-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
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
