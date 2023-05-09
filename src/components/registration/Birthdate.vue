<template>
  <div class="bg">
    <form>
      <div class="h2">When's your birthday?</div>
      <p>We only show your age to potential matches, not your birthday.</p>
      <div class="container">
        <div class="box">
          <label>
            Month
            <input
              type="text"
              v-model="month"
              placeholder="MM"
              @input="validateMonth"
              ref="input1"
            />
          </label>
        </div>
        <div class="box">
          <label>
            Day
            <input type="text" v-model="day" placeholder="DD" @input="validateDay" ref="input2" />
          </label>
        </div>
        <div class="box">
          <label>
            Year
            <input
              type="text"
              v-model="year"
              placeholder="YYYY"
              @input="validateYear"
              ref="input3"
            />
          </label>
        </div>
      </div>
    </form>
    <button :disabled="!isFormValid" @click.prevent="calculateAge" class="next">></button>

    <modal v-if="showModal && age > 18">
      <h5>You're {{ age }}</h5>
      <p>Make sure this is your correct age as you can't change this later.</p>
      <button class="modal-btn" @click="confirmBirthday">Confirm</button>
      <button class="modal-btn" @click="closeModal">Close</button>
    </modal>
    <modal v-if="showModal && age < 18">
      <h5>You're {{ age }}</h5>
      <p>You must be of legal age.</p>
      <button class="modal-btn" @click="closeModal">Go back</button>
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      month: '',
      day: '',
      year: '',
      age: '',
      showModal: false,
      currentInput: 1
    }
  },
  methods: {
    validateMonth() {
      this.currentInput = 1
      this.month = this.month.replace(/[^0-9]/g, '')
      if (this.month.length > 2) {
        this.month = this.month.substring(0, 2)
      }
      if (this.month > 12) {
        this.month = '12'
      }
      this.switchToNextInput()
    },
    validateDay() {
      this.currentInput = 2
      this.day = this.day.replace(/[^0-9]/g, '')
      if (this.day.length > 2) {
        this.day = this.day.substring(0, 2)
      }
      const daysInMonth = new Date(this.year, this.month, 0).getDate()
      if (this.day > daysInMonth) {
        this.day = daysInMonth.toString()
      }
      this.switchToNextInput()
    },
    validateYear() {
      this.currentInput = 3
      const MINYEAR = 1950
      const MAXYEAR = new Date().getFullYear()
      this.year = this.year.replace(/[^0-9]/g, '')
      if (this.year.length > 4) {
        this.year = this.year.substring(0, 4)
      }
      if (this.year.length == 4 && Number(this.year) > MAXYEAR) {
        this.year = `${MAXYEAR}`
      }
      if (this.year.length == 4 && Number(this.year) < MINYEAR) {
        this.year = `${MINYEAR}`
      }
      this.switchToNextInput()
    },
    calculateAge() {
      if (this.month.length == 1) {
        this.month = `0${this.month}`
      }
      if (this.day.length == 1) {
        this.day = `0${this.day}`
      }
      if (this.year.length < 4) {
        return
      }

      const today = new Date()
      const birthDate = new Date(this.year, this.month - 1, this.day)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      this.age = age
      this.showModal = true
    },
    confirmBirthday() {
      const formattedDate = this.month + '/' + this.day + '/' + this.year
      let user = JSON.parse(localStorage.getItem('user'))
      user.birthdate = formattedDate
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/register/gender')
    },
    switchToNextInput() {
      const currentInputRef = `input${this.currentInput}`
      const value = this.$refs[currentInputRef].value
      if (this.currentInput < 3 && value.length === 2) {
        this.currentInput++
        const nextInputRef = `input${this.currentInput}`
        this.$refs[nextInputRef].focus()
      }
      if (this.currentInput === 3 && value.length === 4 && this.$refs['input1'].value === '') {
        this.currentInput = 1
        const nextInputRef = `input${this.currentInput}`
        this.$refs[nextInputRef].focus()
      }
    },
    closeModal() {
      this.showModal = false
    }
  },
  computed: {
    isFormValid() {
      return this.month && this.day && this.year
    }
  }
}
</script>

<style scoped>
.bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 100px 30px;
}

.container {
  display: flex;
  margin-top: 50px;
}

label {
  display: flex;
  flex-direction: column;
  margin: 0 10px;
}

input {
  width: 60px;
  border: none;
  border-radius: 8px;
  height: 40px;
  outline: none;
  padding: 0 10px;
  box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -webkit-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
  -moz-box-shadow: 0px 1px 5px 0px rgba(110, 110, 110, 0.65);
}

.next, button {
  border: none;
  outline: none;
  background-color: black;
  color: white;
  height: 50px;
  width: 50px;
  text-align: center;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
}

.next:disabled {
  opacity: 0.5;
}

.modal-btn {
  font-size: 12px;
  width: 110px;
  border-radius: 8px;
  height: 40px;
  margin-right: 10px;
}

p {
  font-size: 14px;
}
</style>
