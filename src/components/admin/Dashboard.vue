<template>
  <div class="container">
    <nav class="navbar" style="background-color: #fed045; padding: 0 30px">
      <a class="navbar-brand" href="#">
        <img src="../../assets/IMG_1005.jpg" width="152" height="70" alt="" />
      </a>
      <button @click="logOut">Log out</button>
    </nav>
    <div class="user-box">
      <div class="h2">All Users</div>
      <div v-for="(user, index) in users" :key="index" class="list">
        <div class="left">
          <img v-if="user.imageUrl" :src="user.imageUrl[0].url" />
          <div class="details">
            <div class="name">{{ user.fullName }}</div>
            <div class="match-count">
              {{ `${user.matchesCount} ${pluralize('Match', user.matchesCount)}` }}
            </div>
          </div>
        </div>
        <div class="right">
          <button>View</button>
          <button
            @click="showModal = !showModal; reference = index; this.user = user">
            Edit
          </button>
          <button @click="deleteAccount(user.id)">Delete</button>
        </div>
        <div v-if="showModal && reference == index" class="edit-modal">
          <div class="inner-modal">
            <div class="h2">Edit User</div>
            <form>
              <label>
                First Name
                <input type="text" v-model="user.firstName" />
              </label>
              <label>
                Last Name
                <input type="text" v-model="user.lastName" />
              </label>
              <label>
                Email
                <input type="email" v-model="user.email" />
              </label>
              <label>
                Password (leave blank if you don't want to change it)
                <input type="password" v-model="user.password" />
              </label>
              <label>
                Mobile Number
                <input type="string" v-model="user.mobileNumber" />
              </label>
              <label>
                Bio
                <textarea v-model="user.bio"></textarea>
              </label>
              <label>
                School
                <input type="text" v-model="user.school" />
              </label>
              <div class="buttons">
                <button type="submit" @click.prevent="update">Update</button>
                <button
                  @click.prevent="showModal = !showModal; reference = 0">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUsers, deleteUser, updateUser } from '../../utilities/users'
export default {
  data() {
    return {
      users: [],
      showModal: false,
      reference: 0,
      user: {}
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const users = await getUsers(Number(uid), token)
      this.users = users
    },
    async deleteAccount(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let data = await deleteUser(Number(id), uid, token)
      console.log(data)
      this.getAllUsers()
    },
    async update() {
      let token = localStorage.getItem('token')
      let admin = JSON.parse(localStorage.getItem('user'))
      let uid = Number(admin.id)
      let data = await updateUser(this.user, uid, token, Number(this.user.id))
      if (data.data.errors) {
        alert(data.data.errors[0].message)
      } else {
        this.getAllUsers()
        this.showModal = !this.showModal
        this.reference = 0
        this.user = {}
      }
    },
    logOut() {
      localStorage.clear()
      this.$router.push('/')
    },
    pluralize(word, count) {
      if (count === 1) {
        return word
      } else {
        return word + 'es'
      }
    }
  }
}
</script>

<style>
.user-box {
  padding: 50px;
}

.list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  min-height: 80px;
  align-items: center;
  border-bottom: 1px solid rgb(207, 207, 207);
}

.left {
  display: flex;
  align-items: center;
}

.left img {
  min-width: 60px;
  max-width: 60px;
  min-height: 60px;
  max-height: 60px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.details {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 186x;
  font-weight: 600;
}

.match-count {
  color: rgba(0, 0, 0, 0.7);
}

.right button {
  border: none;
  margin: 0 5px;
  padding: 10px;
  border-radius: 8px;
  color: white;
}
.right button:first-child {
  background-color: #feefba;
  color: black;
}
.right button:nth-child(2) {
  background-color: #ffdd77;
  color: black;
}
.right button:nth-child(3) {
  background-color: rgb(172, 74, 74);
}

.edit-modal {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.inner-modal {
  background-color: #fff8dd;
  min-height: 500px;
  max-height: 500px;
  max-width: 500px;
  min-width: 500px;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  overflow: hidden;
}

form {
  display: flex;
  flex-direction: column;
  overflow: scroll;
}

label {
  display: flex !important;
  flex-direction: column;
  margin: 10px 0;
  color: rgba(0, 0, 0, 0.7)

}

input, textarea {
  border: none;
  height: 40px;
  border-radius: 8px;
  padding: 0 20px;
  outline: none;
  margin-top: 5px;
}

textarea {
  padding: 20px;
  height: 80px;
  resize: none !important;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  padding: 0 30px;
}

.buttons button {
  border: none;
  border-radius: 8px;
  color: white;
  padding: 10px 40px;
}

.buttons button:first-child {
    background-color: #fed045;
    color: black;
}

.buttons button:nth-child(2) {
background-color: black;
}

nav button {
  border: none;
  border-radius: 8px;
  padding: 10px 30px;
  color: black;
  background: none;
  font-weight: 600;

}
</style>
