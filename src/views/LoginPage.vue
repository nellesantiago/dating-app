<template>
  <div class="bg">
    <div>
      <div class="h2">Log in</div>
      <form class="form">
        <label for="exampleInputEmail1"
          >Email address
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.</small
          ></label
        >

        <label for="exampleInputPassword1"
          >Password
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </label>

        <button @click.prevent="submit" type="submit" class="btn btn-primary">Submit</button>
        <span>Don't have an account?<br /><RouterLink to="/register">Register</RouterLink></span>
      </form>
    </div>
    <RouterLink to="/">Back to home</RouterLink>
  </div>
  <Spinner v-if="isLoading" />
</template>

<script>
import Spinner from '../components/Spinner.vue'
import { login } from '../utilities/login'
export default {
  components: {
    Spinner
  },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      const data = await login(this.email, this.password)
      if (
        data &&
        {}.hasOwnProperty.call(data, 'token') &&
        {}.hasOwnProperty.call(data, 'user') &&
        data.user.role == 'user'
      ) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.$router.push('/user/feed')
      } else {
        alert('Invalid email or password')
      }
      this.isLoading = false
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

.form {
  display: flex;
  flex-direction: column;
  width: 320px;
  margin-top: 40px;
}

.h2 {
  text-align: center;
  font-weight: 700;
}

input {
  height: 40px;
  border-radius: 8px;
  outline: none;
  border: none;
  box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -webkit-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -moz-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  font-size: 14px;
  margin-top: 3px;
}

label {
  font-size: 14px;
}

button {
  padding: 10px 80px;
  border: none;
  background-color: black;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  margin-top: 20px;
}

button:hover {
  background-color: black;
}

span {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
}

a {
  color: black;
  font-size: 14px;
}
</style>
