<template>
  <div class="box">
    <div class="title">{{ name.replace(this.user.fullName, '').replace('/', '') }}</div>
    <div class="outer" ref="try">
      <div v-for="(message, index) in messages" :key="index" class="msg-container">
        <div v-if="message.sender == user.fullName" class="sender">
          <img :src="getSenderImage(message.sender)" />
          <div class="msg-details">
            <div class="msg-name">{{ getSenderFirstName(message.sender) }}</div>
            <div>{{ message.content }}</div>
          </div>
        </div>
        <div v-else class="recipient">
          <img :src="getSenderImage(message.sender)" />
          <div class="msg-details">
            <div class="msg-name">{{ getSenderFirstName(message.sender) }}</div>
            <div>{{ message.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <form>
      <input
        type="text"
        v-model="content"
        class="msg-input"
        placeholder="Type your message here..."
      />
      <button @click.prevent="send">Send</button>
    </form>
  </div>
</template>

<style scoped>
.box {
  background-color: white;
  width: 350px;
  min-height: 630px;
  max-height: 630px;
  overflow-x: hidden;
  overflow-y: scroll;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
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

.outer {
  background-color: white;
  min-height: 450px;
  max-height: 450px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid rgb(197, 197, 197);
}

.msg-container {
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  width: 300px;
  min-height: 80px;
  max-height: 80px;
  justify-content: center;
}

.msg-container:nth-child(even) {
  /* background-color: #f8f8f8; */
  border-radius: 20px;
}

.sender {
  width: 300px;
  display: inline-flex;
  justify-content: flex-start;
  flex-direction: row-reverse;
  align-items: center;
  padding-right: 10px;
  background-color: #fef7dd;
  padding: 10px;
  border-radius: 20px;
}

.sender .msg-details {
  text-align: right;
  margin-right: 10px;
}

.recipient {
  display: flex;
  align-items: center;
  padding-left: 10px;
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 20px;
}

.recipient .msg-details {
  margin-left: 10px;
}

.msg-name {
  font-weight: 500;
}

img {
  min-height: 40px;
  max-height: 40px;
  min-width: 40px;
  max-width: 40px;
  border-radius: 50%;
  object-fit: cover;
}

form {
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

input {
  width: 250px;
  border: none;
  border-radius: 10px 0 0 10px;
  height: 50px;
  padding: 0 20px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.7);
}

button {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border: none;
  height: 50px;
  border-radius: 0 10px 10px 0;
  width: 70px;
  border: 1px 1px 1px 0px solid rgba(0, 0, 0, 0.7);
}
</style>

<script>
import { getMatchMessages, getMatch } from '../../utilities/matches'
import { createMessage } from '../../utilities/messages'
export default {
  props: ['id'],
  data() {
    return {
      messages: [],
      content: '',
      name: '',
      user: {},
      users: []
    }
  },
  created() {
    this.getMessages()
    this.getMatchName()
  },
  methods: {
    async getMessages() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const messages = await getMatchMessages(Number(this.id), token, uid)
      if (messages.length > 0) {
        this.messages = messages[0].messages
      } else {
        this.messages = []
      }
    },
    async send() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      await createMessage(Number(user.id), Number(this.id), this.content, token, uid)
      this.content = ''
      this.getMessages()
    },
    async getMatchName() {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      let match = await getMatch(Number(this.id), token, uid)
      this.users = match.users
      this.user = user
      this.name = this.otherUserFullName(this.user)
    },
    getSenderImage(name) {
      let arr = this.users.filter((user) => user.fullName == name)
      if (this.users.length > 0) {
        return arr[0].imageUrl[0].url
      } else {
        return '#'
      }
    },
    getSenderFirstName(name) {
      let arr = this.users.filter((user) => user.fullName == name)
      if (this.users.length > 0) {
        return arr[0].firstName
      } else {
        return ''
      }
    },
    otherUserFullName(user) {
      let otherUser = this.users.filter((i) => i.id != user.id)
      return otherUser[0].fullName
    }
  },
  watch: {
    messages() {
      let el = this.$refs.try
      el.scrollTop = el.scrollHeight
    }
  }
}
</script>
