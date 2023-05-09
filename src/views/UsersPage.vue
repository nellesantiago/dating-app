<template>
  <h1>All Users</h1>
  <div v-for="(user, index) in users" :key="index" class="container">
    <p>ID: {{ user.id }}</p>
    <p>Name: {{ `${user.firstName} ${user.lastName}` }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Mobile Number: {{ user.mobileNumber }}</p>
    <p>Gender: {{ user.gender }}</p>
    <p>Gender Interest: {{ user.genderInterest }}</p>
    <p>Age: {{ calculateAge(user.birthdate) }}</p>
    <p>Location: {{ `${user.city}, ${user.region} ${user.country}` }}</p>
    <p>Role: {{ user.role }}</p>
  </div>
  <button @click.prevent="logout">Logout</button>
</template>

<script>
import { getUsers } from '../utilities/users'

export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.getData()
    // console.log(JSON.parse(localStorage.getItem('user')));
  },
  methods: {
    async getData() {
      this.users = await getUsers()
      console.log(this.users)
    },
    logout() {
      localStorage.clear()
      this.$router.push('/')
    },
    calculateAge(birthdate) {
      const today = new Date()
      const birthDate = new Date(birthdate)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>
