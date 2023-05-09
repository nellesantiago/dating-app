<template>
  <div class="bg">
    <form>
      <div class="h2">Where are you located?</div>
      <p>This will be shown on your profile.</p>
      <label
        >Country:
        <select v-model="selectedCountry" @change="fetchRegions">
          <option value="">Select a country</option>
          <option v-for="country in countries" :value="country.name">{{ country.name }}</option>
        </select>
      </label>
      <label
        >Region:
        <select v-model="selectedRegion" @change="fetchCities">
          <option value="">Select a region</option>
          <option v-for="region in regions" :value="region.name">{{ region.name }}</option>
        </select>
      </label>
      <label
        >City:
        <select v-model="selectedCity">
          <option value="">Select a city</option>
          <option v-for="city in cities" :value="city">{{ city }}</option>
        </select>
      </label>
    </form>
    <button :disabled="!isFormValid" @click="savePreferences">></button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      countries: [],
      regions: [],
      cities: [],
      selectedCountry: '',
      selectedRegion: '',
      selectedCity: ''
    }
  },
  created() {
    this.fetchCountries()
  },
  methods: {
    async fetchCountries() {
      const response = await axios.get('https://countriesnow.space/api/v0.1/countries/codes')
      const countries = response.data.data
      this.countries = countries
    },
    async fetchRegions() {
      if (this.selectedCountry) {
        const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
          country: this.selectedCountry
        })
        const states = response.data.data.states
        this.regions = states
      } else {
        this.regions = []
      }
      this.selectedRegion = ''
      this.selectedCity = ''
      this.cities = []
    },
    async fetchCities() {
      if (this.selectedRegion) {
        const response = await axios.post(
          'https://countriesnow.space/api/v0.1/countries/state/cities',
          { country: this.selectedCountry, state: this.selectedRegion }
        )
        const cities = response.data.data
        this.cities = cities
      } else {
        this.cities = []
      }
      this.selectedCity = ''
    },
    savePreferences() {
      let user = JSON.parse(localStorage.getItem('user'))
      user.country = this.selectedCountry
      user.region = this.selectedRegion
      user.city = this.selectedCity
      localStorage.setItem('user', JSON.stringify(user))

      this.$router.push('/register/school')
    }
  },
  computed: {
    isFormValid() {
      return this.selectedCountry && this.selectedRegion && this.selectedCity
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
  padding: 100px 0px;
}

form {
  display: flex;
  flex-direction: column;
  width: 320px;
}

select {
  width: 270px;
  height: 40px;
  border: none;
  border-radius: 8px;
  padding: 0 10px;
  margin-top: 10px;
  outline: none;
}

label {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 0;
}

button {
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

button:disabled {
  opacity: 0.5;
}

a {
  color: black;
}

a:hover {
  color: black;
}
</style>
