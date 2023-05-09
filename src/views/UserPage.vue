<template>
  <div class="bg bg-user">
    <img src="../assets/IMG_1084.PNG" class="black-logo">
    <RouterView />
    <div class="nav">
      <RouterLink active-class="active" to="/user/profile"><i class="fa-solid fa-user"></i></RouterLink>
      <RouterLink active-class="active" to="/user/feed"><i class="fa-solid fa-inbox"></i></RouterLink>
      <RouterLink active-class="active" to="/user/matches"><i class="fa-solid fa-heart"></i></RouterLink>
      <RouterLink active-class="active" to="/user/chat"><i class="fa-solid fa-comment"></i></RouterLink>
    </div>
  </div>
</template>

<style>
.bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 30px 30px;
}

.bg-user {
  background-color: white;
}

.nav {
  display: inline-flex;
  justify-content: space-between;
  width: 300px;
  /* border-top: 1px solid rgb(95, 92, 71); */
  padding-top: 20px;
}

.active i {
  color: black;
}

i {
  font-size: 30px;
  color: rgb(95, 92, 71);
}


.black-logo {
  width: 160px;
}
</style>
