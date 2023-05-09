<template>
  <div class="bg">
    <div></div>
    <div>
      <div class="hi">Hello!</div>
      <p>
        You're likely to find someone really special if you take the time to build your profile.
      </p>
    </div>
    <RouterLink to="/register/name">Build my profile</RouterLink>
    <RouterView />
  </div>
</template>

<style scoped>
.bg {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding: 50px 30px;
  font-size: 16px;
}

.hi {
  font-weight: 800;
  font-size: 50px;
}

a {
  padding: 10px 80px;
  border: 1px solid black;
  background-color: black;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-size: 14px;
}

a:hover {
  color: white;
}

</style>
