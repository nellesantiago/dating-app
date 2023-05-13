<template>
  <div class="box">
    <div class="title"><i class="fa-solid fa-heart-circle-check"></i>Your Matches</div>
    <div class="matches">
      <div v-for="(user, index) in users" :key="index" class="list">
        <!-- <img v-if="user.imageUrl " v-for="url in user.imageUrl" :src="`${url.url}`" /> -->
        <img :src="user.imageUrl[0].url" />
        <div class="name">
          {{ `${user.firstName} ${user.lastName}` }}
          <div class="gender">
            <i v-if="user.gender == 'man'" class="fa-solid fa-mars"></i>
            <i v-if="user.gender == 'woman'" class="fa-solid fa-venus"></i>
            <i v-if="user.gender == 'nonbinary'" class="fa-solid fa-genderless"></i>
          </div>
        </div>
        <!-- <RouterLink :to="`/user/chat/2`">
          <i class="fa-regular fa-comment-dots"></i>
        </RouterLink> -->
        <button
          class="btn"
          @click="showModal = !showModal; reference = index">
          <i class="fa-regular fa-comment-dots"></i>
        </button>
        <!-- <NewMessageModal v-if="showModal" :id="user.id"/> -->
        <div v-if="showModal && reference == index">
          <div class="form">
            <div class="form-inner">
              <h5>Send a message</h5>
              <input type="text" v-model="content" class="input-content" />
              <div class="buttons">
                <button
                  @click.prevent="
                    showModal = !showModal; reference = 0">
                  Close
                </button>
                <button @click.prevent="send(user.id)" class="send-btn">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Spinner v-if="isLoading"/>
</template>

<style scoped>
.form {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 80vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form-inner {
  background-color: #fef7dd;
  height: 250px;
  width: 320px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-content {
  height: 100px;
  border: none;
  width: 300px;
  border-radius: 8px;
  background-color: white;
  margin: 10px 0;
  outline: none;
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 200px;
}

.buttons button {
  background-color: rgb(41, 41, 41);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  margin-top: 10px;
}

.buttons .send-btn {
  background-color: #fed045;
  color: black;
}
.box {
  background-color: #fef7dd;
  width: 350px;
  min-height: 630px;
  max-height: 630px;
  overflow-x: hidden;
  overflow-y: scroll;
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

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  object-fit: cover;
}

.list {
  /* border-bottom: 1px solid rgb(211, 211, 211); */
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  padding: 0 20px;
  /* margin-top: 10px; */
}

.name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
}

.gender {
  display: flex;
  justify-content: center;
  margin-left: 10px;
}

.gender .fa-mars {
  font-size: 16px;
  color: rgb(31, 83, 161);
}

.gender .fa-venus {
  font-size: 16px;
  color: rgb(218, 105, 123);
}

.gender .fa-genderless {
  font-size: 16px;
  color: rgb(89, 228, 180);
}

.chat-btn {
  font-size: 12px;
  text-align: center;
  color: black;
  border-radius: 8px;
  padding: 5px 0;
  background-color: #fed045;
}

.fa-comment-dots {
  font-size: 16px;
  background-color: #fed045;
  display: flex;
  color: black;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 30px;
  border-radius: 8px;
}

a {
  text-decoration: none;
}
</style>

<script>
import { getMatchedUsers } from '../../utilities/users'
import { getUsersMatchId } from '../../utilities/matches'
import { createMessage } from '../../utilities/messages'
import Spinner from '../Spinner.vue'
export default {
  components: {
    Spinner
  },
  data() {
    return {
      users: [],
      showModal: false,
      reference: '',
      content: '',
      isLoading: false
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      this.isLoading = true
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const users = await getMatchedUsers(Number(user.id), token, uid)
      this.users = users
      this.isLoading = false
    },
    async send(id) {
      this.isLoading = true
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let matchId = await getUsersMatchId(Number(id), Number(user.id), token, uid)
      await createMessage(Number(user.id), Number(matchId), this.content, token, uid)
      this.content = ''
      this.isLoading = false
      this.$router.push(`/user/chat/${matchId}`)
    }
  }
}
</script>
