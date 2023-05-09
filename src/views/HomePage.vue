<template>
  <div class="bg">
    <div class="home-box">
      <img src="../assets/IMG_1005.jpg" />
      <div class="buttons">
        <RouterLink to="/login"> Log in </RouterLink>
        <RouterLink to="/register"> Register </RouterLink>
        <RouterLink to="/admin/login" class="admin">Log in as admin</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home-box {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    height: 330px;
}

.buttons {
    display: flex;
    flex-direction: column;
    text-align: center;
}

img {
  width: 300px;
}

a {
    text-decoration: none;
    padding: 10px 90px;
    border-radius: 20px;
    border: 1px solid black;
    margin: 5px 0;
}

a:first-child {
    background-color: black;
    color: white;
}

a:nth-child(2) {
    background-color: white;
    color: black;
}

a:nth-child(3) {
  width: 290px;
}

.admin {
  border: none;
  color: black;
  text-decoration: underline;
  padding-top: 50px;
}

</style>
