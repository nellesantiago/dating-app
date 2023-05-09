<template>
  <div class="bg">
    <div>
      <div class="h2">Add your credentials</div>
      <p>Use your email and password to log in later.</p>
      <div class="form">
        <label for="email"
          >Email:
          <input type="email" id="email" v-model="email" placeholder="example@email.com" />
        </label>
        <label for="mobileNumber"
          >Mobile number:
          <input type="text" id="mobileNumber" v-model="mobileNumber" placeholder="xxxxxxxxxxx" />
        </label>
        <label for="password"
          >Password:
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="minimum of 6 characters"
            @input="validatePassword"
        /></label>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
    <button :disabled="!isFormValid" @click.prevent="submit">✓</button>
  </div>
</template>

<script>
import { register } from '../../utilities/register'
import { login } from '../../utilities/login'
export default {
  data() {
    return {
      email: '',
      password: '',
      mobileNumber: '',
      error: ''
    }
  },
  methods: {
    validatePassword() {
      const regex = /^[A-Za-z\d]{6,}$/
      if (!regex.test(this.password)) {
        this.error = 'Minimum of 6 characters'
      } else {
        this.error = ''
      }
    },
    async submit() {
      if (this.error) {
        return
      }
      let user = JSON.parse(localStorage.getItem('user'))
      let interests = JSON.parse(localStorage.getItem('interests'))
      user.email = this.email
      user.password = this.password
      user.mobileNumber = this.mobileNumber
      let newImage = user.image.map((img, index) => {
        let blob = this.dataURItoBlob(img)
        return new File([blob], `${user.firstName}Image${index}`, { type: blob.type })
      })
      user.image = newImage
      console.log(user.image)
      const registered = await register(user, interests)
      if (registered.data.errors) {
        alert(registered.data.errors[0].message)
      } else {
        var data = await login(this.email, this.password)
      }
      if (data && {}.hasOwnProperty.call(data, 'token') && {}.hasOwnProperty.call(data, 'user')) {
        localStorage.clear()
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.$router.push('/register/success')
      }
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }

      return new Blob([ab], { type: mimeString })
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password && this.mobileNumber
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

label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.form {
  width: 320px;
  margin-top: 30px;
}

input {
  width: 220px;
  border: none;
  border-radius: 8px;
  height: 40px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;
}

input::placeholder {
  font-size: 14px;
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
