<template>
  <div class="box">
    <div class="title"><i class="fa-solid fa-comments"></i>Messages</div>
    <div v-for="(match, index) in matches" :key="index" class="container">
      <RouterLink v-if="match.latestMessage" :to="`/user/chat/${match.id}`" class="list">
        <img :src="otherUserImage(match.users, this.user)" />
        <div class="details">
          <div class="name">{{ `${otherUserFullName(match.users, this.user)}` }}</div>
          <div class="content">{{ `${match.latestMessage.content}` }}</div>
        </div>
        <div class="date">
          {{
            `${new Date(match.latestMessage.createdAt)
              .toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                timeZone: 'Asia/Manila'
              })
              .replace('at', '')}`
          }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>

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

.list {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  padding: 0 10px;
}


a {
  text-decoration: none;
  color: black;
}

a:hover {
  color: black;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.details {
  margin-left: 10px;
}

.name {
  font-weight: 600;
}

.content {
  color: rgb(0, 0, 0);
  opacity: 0.7;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 150px;
}

.date {
  font-size: 12px;
  color: black;
  opacity: 0.7;
  text-align: center;
  max-width: 50px;
}
</style>
<script>
import { getUserMatches } from '../../utilities/matches'
export default {
  data() {
    return {
      matches: [],
      user: {}
    }
  },
  created() {
    this.getMatches()
  },
  methods: {
    async getMatches() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const matches = await getUserMatches(Number(user.id), token, uid)
      this.matches = matches
      this.user = user
    },
    otherUserImage(users, user) {
      let otherUser = users.filter((i) => i.id != user.id)
      let imageUrl = otherUser[0].imageUrl[0].url
      return imageUrl
    },
    otherUserFullName(users, user) {
      let otherUser = users.filter((i) => i.id != user.id)
      let fullName = otherUser[0].fullName
      return fullName
    }
  }
}
</script>
