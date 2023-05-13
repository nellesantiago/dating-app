<template>
  <h1>Register</h1>
  <RouterView/>
</template>

<script>
import { login } from '../utilities/login';
import { register } from '@/utilities/register';
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      const registered = await register(
        this.firstName,
        this.lastName,
        this.email,
        this.password
      );
      if (registered) {
        var data = await login(this.email, this.password);
      }
      if (
        data &&
        {}.hasOwnProperty.call(data, 'token') &&
        {}.hasOwnProperty.call(data, 'user')
      ) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.$router.push('/user/feed');
      }
    },
  },
};
</script>
