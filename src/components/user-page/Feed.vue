<template>
  <div class="bgs">
    <div class="box">
      <div class="outer-box">
        <div
          v-for="(user, index) in queuedUser"
          :key="index"
          class="image-box"
          :ref="setItemRef"
          :data-id="`${user.id}`"
        >
          <div class="first-image">
            <img v-if="user.imageUrl" :src="`${user.imageUrl[0].url}`" />
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
          <div v-if="user.imageUrl && user.imageUrl[1]" class="second-image">
            <img :src="`${user.imageUrl[1].url}`" />
          </div>
          <div class="bio">
            <div class="bio-title">About me</div>
            <div class="span">{{ user.bio }}</div>
          </div>
          <div v-if="user.imageUrl && user.imageUrl[2]" class="third-image">
            <img :src="`${user.imageUrl[2].url}`" />
          </div>
          <div v-if="user.imageUrl && user.imageUrl[3]" class="fourth-image">
            <img :src="`${user.imageUrl[3].url}`" />
          </div>
          <div v-if="user.imageUrl && user.imageUrl[4]" class="fifth-image">
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
  </div>
  <Spinner v-if="isLoading" />
</template>

<script>
import interact from 'interactjs'
import { getFilteredUsers } from '../../utilities/users'
import { like, dislike, likeCheck, likeBack, getUsersMatchId } from '../../utilities/matches'
import Spinner from '../Spinner.vue'
export default {
  components: {
    Spinner
  },
  created() {
    this.getUsers()
  },
  data() {
    return {
      queuedUser: [],
      skip: 0,
      originX: 0,
      originY: 0,
      posX: 0,
      posY: 0,
      itemRefs: [],
      isLoading: false
    }
  },
  methods: {
    setItemRef(el) {
      if (el) {
        this.initInteract(el)
      }
    },
    async getUsers() {
      this.isLoading = true
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
      } else {
        this.queuedUser = []
        this.user = {}
      }
      this.isLoading = false
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
    async like(id) {
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      await like(Number(id), token, uid)
    },
    async dislike(id) {
      this.isLoading = true
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      await dislike(Number(id), token, uid)
      this.getUsers()
      this.isLoading = false
    },
    async resolveLike(id) {
      this.isLoading = true
      let token = localStorage.getItem('token')
      let user = JSON.parse(localStorage.getItem('user'))
      let uid = Number(user.id)
      const liked = await likeCheck(Number(id), token, uid)
      if (liked) {
        const matchId = await getUsersMatchId(Number(id), Number(user.id), token, uid)
        await likeBack(Number(matchId), token, uid)
        this.getUsers()
      } else {
        await this.like(id)
        this.getUsers()
      }
      this.isLoading = false
    },
    initInteract(selector) {
      if (!interact.isSet(selector)) {
        interact(selector).draggable({
          inertia: true,
          restrict: {
            elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
          },
          autoScroll: true,

          onmove: this.dragMoveListener,
          onend: this.onDragEnd
        })
        interact(selector).on({
          down: this.clicked
        })
      }
    },
    dragMoveListener(e) {
      let target = e.target,
        x = (parseFloat(target.getAttribute('data-x')) || this.originX) + e.dx,
        y = (parseFloat(target.getAttribute('data-y')) || this.originY) + e.dy

      target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    },
    onDragEnd(e) {
      let target = e.target
      let id = target.dataset.id
      console.log('dragLike')

      if (target.getBoundingClientRect().left - this.posX > 150) {
        this.resolveLike(id)
      } else if (target.getBoundingClientRect().left - this.posX < -150) {
        this.dislike(id)
      } else {
        target.style.webkitTransform = target.style.transform =
          'translate(' + this.originX + 'px, ' + this.originY + 'px)'
        target.setAttribute('data-x', this.originX)
        target.setAttribute('data-y', this.originY)
      }
    },
    clicked(e) {
      let target = e.target
      this.posX = target.getBoundingClientRect().left
      this.posY = target.getBoundingClientRect().right
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
  position: relative;
}

.outer-box {
  background-color: #fef7dd;
  min-height: 630px;
  max-height: 630px;
  overflow: hidden;
}

.image-box {
  position: absolute;
  background-color: #fef7dd;
  left: 0;
  top: 0;
  min-height: 630px;
  max-height: 630px;
  overflow: scroll;
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
