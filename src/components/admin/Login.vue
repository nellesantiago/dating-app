<template>
  <div class="container">
    <nav class="navbar" style="background-color: #fed045; padding: 0 30px">
      <a class="navbar-brand" href="#">
        <img src="../../assets/IMG_1005.jpg" width="152" height="70" alt="" />
      </a>
    </nav>
    <form class="container" style="padding: 50px">
      <div class="h2">Admin</div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-dark" @click.prevent="submit">Submit</button>
    </form>
  </div>
  <Spinner v-if="isLoading" />
</template>

<script>
import { login } from '../../utilities/login'
import Spinner from '../admin/Spinner.vue'
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
        data.user.role == 'admin'
      ) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        this.isLoading = false
        this.$router.push('/admin/dashboard')
      } else {
        alert('Invalid email or password')
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>



button {
  text-align: center;
  font-size: 14px;
}

.h2 {
  margin-bottom: 20px;
}
input {
  margin-bottom: 20px;
}
</style>
