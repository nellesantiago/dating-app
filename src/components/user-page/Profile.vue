<template>
  <div class="bgs">
    <div class="box">
      <div class="image-box">
        <div ref="top"></div>
        <div class="first-image">
          <img v-if="this.user.imageUrl" :src="`${this.user.imageUrl[0].url}`" />
          <div class="details">
            <div class="name">
              {{ `${user.firstName}, ${user.age}` }}
              <div class="gender">
                <i v-if="user.gender == 'man'" class="fa-solid fa-mars"></i>
                <i v-if="user.gender == 'woman'" class="fa-solid fa-venus"></i>
                <i v-if="user.gender == 'nonbinary'" class="fa-solid fa-genderless"></i>
              </div>
            </div>
            <div class="location"><i class="fa-solid fa-location-dot"></i>{{ user.country }}</div>
          </div>
        </div>
        <div class="basics">
          <div class="basic-title">Basics</div>
          <div class="fullname">
            <i class="fa-regular fa-id-card"></i>{{ `${user.firstName} ${user.lastName}` }}
          </div>
          <div class="basic-location">
            <i class="fa-solid fa-house"></i>{{ `${user.city}, ${user.region}` }}
          </div>
          <div v-if="user.school" class="school">
            <i class="fa-solid fa-graduation-cap"></i>{{ user.school }}
          </div>
        </div>
        <div v-if="this.user.imageUrl && this.user.imageUrl[1]" class="second-image">
          <img :src="`${this.user.imageUrl[1].url}`" />
        </div>
        <div class="bio">
          <div class="bio-title">About me</div>
          <div class="span">{{ user.bio }}</div>
        </div>
        <div v-if="this.user.imageUrl && this.user.imageUrl[2]" class="third-image">
          <img :src="`${this.user.imageUrl[2].url}`" />
        </div>
        <div v-if="this.user.imageUrl && this.user.imageUrl[3]" class="fourth-image">
          <img :src="`${this.user.imageUrl[3].url}`" />
        </div>
        <div v-if="this.user.imageUrl && this.user.imageUrl[4]" class="fifth-image">
          <img :src="`${this.user.imageUrl[4].url}`" />
        </div>
        <div class="options">
          <RouterLink to="/user/settings">Edit Profile</RouterLink>
          <button @click="logOut">Log out</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '../../utilities/users'
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
    logOut() {
      localStorage.clear()
      this.$router.push('/')
    },
    async getUser() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let userData = await getUser(Number(user.id), token, uid)
      this.user = userData
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
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 20px;
}

.first-image {
  position: relative;
  height: 630px;
  width: 350px;
  display: flex;
}

.second-image,
.third-image,
.fourth-image,
.fifth-image {
  height: 630px;
  width: 350px;
  display: flex;
}

img {
  min-width: 350px;
  min-height: 630px;
  object-fit: cover;
}

.details {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 8%;
  bottom: 5%;
}

.name {
  color: white;
  font-weight: 600;
  font-size: 30px;
  display: flex;
}

.gender {
  margin-left: 10px;
}

.gender .fa-mars {
  color: rgb(85, 146, 238);
}

.gender .fa-venus {
  color: rgb(241, 129, 148);
}

.gender .fa-genderless {
  color: rgb(89, 228, 180);
}

.location {
  color: white;
}

.location i {
  color: white;
  font-size: 14px;
  margin-right: 5px;
}

.basics {
  padding: 30px 20px;
  font-size: 16px;
}

.basics i {
  font-size: 16px;
  margin-right: 10px;
}

.basic-title {
  border-bottom: 1px solid rgba(95, 92, 71, 0.3);
  padding-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
}

.fullname {
  margin-top: 10px;
}

.bio {
  padding: 20px;
}

.bio-title {
  font-weight: 600;
  font-size: 18px;
  border-bottom: 1px solid rgba(95, 92, 71, 0.3);
  padding-bottom: 10px;
}

.span {
  font-size: 14px;
  font-weight: 400;
  padding-top: 10px;
}

.options {
  display: flex;
  justify-content: space-between;
  padding: 50px;
}

.options button {
  border: none;
  background: none;
}

a {
  background-color: #fed045;
  color: black;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 8px;
}

a:hover {
  color: black;
}

.options button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}
</style>
