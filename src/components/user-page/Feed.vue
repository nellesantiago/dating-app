<template>
  <div class="bgs">
    <div class="box">
      <div v-for="(user, index) in users" :key="index" class="image-box">
        <div ref="top"></div>
        <div class="first-image">
          <img :src="`${user.imageUrl[0].url}`" />
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
        <div v-if="user.imageUrl[1]" class="second-image">
          <img :src="`${user.imageUrl[1].url}`" />
        </div>
        <div class="bio">
          <div class="bio-title">About me</div>
          <div class="span">{{ user.bio }}</div>
        </div>
        <div v-if="user.imageUrl[2]" class="third-image">
          <img :src="`${user.imageUrl[2].url}`" />
        </div>
        <div v-if="user.imageUrl[3]" class="fourth-image">
          <img :src="`${user.imageUrl[3].url}`" />
        </div>
        <div v-if="user.imageUrl[4]" class="fifth-image">
          <img :src="`${user.imageUrl[4].url}`" />
        </div>
        <div class="options">
          <button class="dislike-btn" @click="dislike(user.id)">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button class="like-btn" @click="resolveLike(user.id)">
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFilteredUsers } from '../../utilities/users'
import { like, dislike, likeCheck, likeBack, getUsersMatchId } from '../../utilities/matches'
export default {
  created() {
    this.getUsers()
  },
  data() {
    return {
      users: [],
      queuedUser: [],
      //   first: 10,
      skip: 0
    }
  },
  methods: {
    async getUsers() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let genderInterest = this.resolveGenderInterest(user.gender)
      const users = await getFilteredUsers(
        Number(user.id),
        genderInterest,
        token,
        uid,
        this.first,
        this.skip
      )
      if (users.length > 0) {
        this.queuedUser = users
        this.users = [users[0]]
      } else {
        this.queuedUser = []
        this.users = []
      }
    },
    resolveGenderInterest(gender) {
      switch (gender) {
        case 'nonbinary':
          return 'nonbinary_people'
        case 'man':
          return 'men'
        case 'woman':
          return 'women'
      }
    },
    next() {
      this.skip++
      this.getUsers()
    },
    async like(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const response = await like(Number(id), token, uid)
      console.log(response)
    },
    async dislike(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const response = await dislike(Number(id), token, uid)
      console.log(response)
      this.getUsers()
      this.$refs.top[0].scrollIntoView({ behavior: 'smooth' })
    },
    async resolveLike(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const liked = await likeCheck(Number(id), token, uid)
      if (liked) {
        const matchId = await getUsersMatchId(Number(id), Number(user.id), token, uid)
        await likeBack(Number(matchId), token, uid)
        this.getUsers()
        this.$refs.top[0].scrollIntoView({ behavior: 'smooth' })
      } else {
        await this.like(id)
        this.getUsers()
        this.$refs.top[0].scrollIntoView({ behavior: 'smooth' })
      }
    }
  },
  watch: {
    async skip(value) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let genderInterest = this.resolveGenderInterest(user.gender)
      this.user = await getFilteredUsers(
        Number(user.id),
        genderInterest,
        token,
        uid,
        this.first,
        value
      )
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

.options i {
  color: white;
}

.dislike-btn i {
  padding: 10px;
  background-color: rgb(186, 54, 54);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.like-btn i {
  padding: 10px;
  background-color: rgb(40, 142, 47);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>