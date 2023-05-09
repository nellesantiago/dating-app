<template>
  <div class="bg">
    <div>
      <div class="h2">Who would you like to date?</div>
      <p>You can choose more than one answer.</p>
      <div>
        <div class="form">
          <label for="men">Men
          <input
            ref="men"
            type="checkbox"
            id="men"
            value="men"
            @input="checkbox1 = !this.checkbox1"
            name="man"
          /></label>
          <label for="women">Women
          <input
            ref="women"
            type="checkbox"
            id="women"
            value="women"
            @input="checkbox2 = !this.checkbox2"
            name="woman"
          /></label>
          <label for="nonbinary">Nonbinary People
          <input
            ref="nonbinary"
            type="checkbox"
            id="nonbinary"
            value="nonbinary_people"
            @input="checkbox3 = !this.checkbox3"
            name="nonbinary"
          /></label>
        </div>
        <button @click.prevent="toggleCheckAll">
          {{ this.checkAll ? "I'm choosing one or two" : "I'm open to dating everyone" }}
        </button>
      </div>
    </div>
    <button :disabled="!isFormValid" @click.prevent="submit" class="next">></button>
  </div>
</template>

<script>
export default {
  computed: {
    checkboxProperties() {
      return [this.checkbox1, this.checkbox2, this.checkbox3]
    },
    isFormValid() {
      return this.checkbox1 || this.checkbox2 || this.checkbox3
    }
  },
  watch: {
    checkboxProperties(values) {
      this.checkAll = values.every((value) => value)
    },
    checkbox1(value) {
      this.$refs['men'].checked = value
    },
    checkbox2(value) {
      this.$refs['women'].checked = value
    },
    checkbox3(value) {
      this.$refs['nonbinary'].checked = value
    }
  },
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkAll: false
    }
  },
  methods: {
    toggleCheckAll() {
      this.checkAll = !this.checkAll
      this.checkbox1 = this.checkAll
      this.checkbox2 = this.checkAll
      this.checkbox3 = this.checkAll
    },
    submit() {
      let interests = ''
      for (const key in this.$refs) {
        if (this.$refs[key].checked && interests === '') {
          interests = this.$refs[key].value
        } else if (this.$refs[key].checked) {
          interests = `${interests}/${this.$refs[key].value}`
        }
      }
      localStorage.setItem('interests', JSON.stringify(interests))
      this.$router.push('/register/bio')
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

.next {
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

.form {
  display: flex;
  flex-direction: column;
  width: 320px;

}

label {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
  background-color: white;
  border-radius: 8px;
  height: 50px;
  padding: 0 20px;
}


input{
  box-shadow: none;
  width: 20px;
  color: grey;
  accent-color: black;

}

.next:disabled {
  opacity: 0.5;
}

button {
  height: 40px;
  border-radius: 8px;
  width: 320px;
  border: none;
  margin-top: 20px;
  color: white;
  background-color: black;
}
</style>
