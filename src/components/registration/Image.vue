<template>
  <div class="bg">
    <form @submit.prevent="submit">
      <div class="h2">Add more photos</div>
      <p>
        Profiles with more than 3 photos are 43% more likely to get a match. You can change these
        later.
        <br><br>
        Note: First photo will be your primary photo.
      </p>
      <div class="image-box">
      <div v-for="(image, index) in images" :key="index" class="upload-btn-wrapper">
        <label :for="`image${index}`" v-if="image"><img :src="imageUrl(index)" /></label>
        <label :for="`image${index}`" v-else>+</label>
        <input :id="`image${index}`" type="file" @change="handleImageChange($event, index)" />
      </div>
      </div>
    </form>
    <button class="next" :disabled="!fileAdded" @click.prevent="submit">></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [null, null, null, null, null],
      fileAdded: false
    }
  },
  methods: {
    handleImageChange(event, index) {
      const file = event.target.files[0]
      if (!file) {
        return
      }
      const reader = new FileReader()
      console.log(file)
      reader.onload = () => {
        this.images.splice(index, 1, reader.result)
      }
      reader.readAsDataURL(file)
      this.fileAdded = true
    },
    imageUrl(index) {
      return this.images[index]
    },
    submit() {
      const filteredImages = this.images.filter((image) => image)
      if (filteredImages.length < 1) {
        alert('Please upload at least 1 image.')
        return
      }
      if (filteredImages.length > 5) {
        alert('You can upload a maximum of 5 images.')
        return
      }
      let user = JSON.parse(localStorage.getItem('user'))
      user.image = filteredImages
      localStorage.setItem('user', JSON.stringify(user))
      this.$router.push('/register/birthdate')
    },
    fileToObject(file) {
      let obj = {}
      for (const key in file) {
        obj[key] = file[key]
      }
      return obj
    },
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

.next:disabled {
  opacity: 0.5;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  flex-wrap: wrap;
  background-color: white;
  margin: 5px;
  border-radius: 8px;
  width: 100px;
  overflow: hidden;
}

label {
  color: black;
  padding: 8px 20px;
  font-size: 20px;
  font-weight: bold;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.upload-btn-wrapper input[type='file'] {
  font-size: 100px;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

h2 {
  margin-bottom: 10px;
  font-weight: 700 !important;
}

img {
  width: 75px;
  height: 75px;
  position: absolute;
  object-fit: cover;
}

.image-box {
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  max-height: 250px;
  overflow: hidden;
}
</style>
