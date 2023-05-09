<template>
  <div class="box">
    <div class="title"><i class="fa-solid fa-user-pen"></i>Edit Profile</div>
    <div class="form-box">
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
          School (optional)
          <input type="text" v-model="user.school" />
        </label>
        Images:
        <input type="file" @change="getImage" multiple />
        <div class="image-box">
          <div v-for="(image, index) in user.imageUrl" :key="index" class="image">
            <img :src="image.url" />
            <button
              class="x-btn"
              v-if="user.imageUrl.length > 1"
              @click.prevent="deleteImage(image.signedId)"
            >
            <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
        <div class="buttons">
            <button type="submit" @click.prevent="submit">Update</button>
            <button @click.prevent="deleteAccount(user.id)">Delete Account</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getUser, updateUser, imageDelete, deleteUser } from '../../utilities/users'

export default {
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    async getUser() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let userData = await getUser(Number(user.id), token, uid)
      this.user = userData
    },
    async submit() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let data = await updateUser(this.user, uid, token)
      if (data.data.errors) {
        alert(data.data.errors[0].message)
      } else {
        this.$router.push('/user/profile')
      }
    },
    async deleteImage(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      await imageDelete(Number(id), token, uid)
      this.getUser()
    },
    async deleteAccount(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      await deleteUser(Number(id), uid, token)
      localStorage.clear()
      this.$router.push('/')
    },
    getImage({ target: { files } }) {
      this.user.image = [...files]
      console.log(this.user)
    }
  }
}
</script>

<style scoped>
.box {
  background-color: #fef7dd;
  width: 350px;
  min-height: 630px;
  max-height: 630px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
}

.title {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  background-color: #fed045;
  color: black;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title i {
  font-size: 18px;
  padding-right: 10px;
  color: black;
}

.form-box {
  overflow-y: scroll;
  padding: 20px;
  min-height: 530px;
  max-height: 530px;
}

label {
  display: flex;
  flex-direction: column;
  margin: 5px 0;
  color: rgba(0, 0, 0, 0.7);
}

input {
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 0 20px;
  margin-bottom: 5px;
  outline: none;
}

textarea {
  resize: none;
  min-height: 80px;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  outline: none;
}

.image-box {
  display: flex;
  max-width: 300px;
  min-width: 300px;
  /* background-color: black; */
  flex-wrap: wrap;
  max-height: 330px;
  min-height: 330px;
  justify-content: center;
}

img {
  width: 100%;
  object-fit: cover;
}

.image {
  display: flex;
  flex-direction: column;
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  min-height: 80px;
  margin: 10px;
}

.x-btn {
  border: none;
  margin: 10px;
  color: white;
  border-radius: 8px;
  background: none;

}

.x-btn i {
    font-size: 14px;
    color: rgb(186, 54, 54)
}

input[type='file'] {
  margin-top: 10px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.buttons button {
  border: none;
  border-radius: 8px;
  color: white;
  padding: 10px 20px;
}

.buttons button:first-child {
    background-color: #fed045;
    color: black;
}

.buttons button:nth-child(2) {
    background-color: rgb(186, 54, 54);
}
</style>
