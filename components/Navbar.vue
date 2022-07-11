<template>
  <b-navbar class="navbar">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <h1 class="header">TechEd</h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item class="nav-item" tag="router-link" :to="{ path: '/' }"> Home </b-navbar-item>
      <b-navbar-item tag="router-link" class="nav-item" :to="{ path: '/category/Emerging-Tech' }">Emerging Technology</b-navbar-item>
      <b-navbar-item class="nav-item " tag="router-link" :to="{ path: '/category/Interview-tips' }"> Interview Tips </b-navbar-item>
      <b-navbar-item class="nav-item " :to="{ path: '/category/Career-Guidance' }"> Career Guidance</b-navbar-item>
      <b-navbar-item class="nav-item " :to="{ path: '/category/Internships' }">Internships</b-navbar-item>
      <b-navbar-item class="nav-item ">About</b-navbar-item>
    </template>
  </b-navbar>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300&family=Spline+Sans+Mono:wght@500&display=swap');
.header {
  font-size: 45px;
  font-weight: 600;
  color: blue;
  margin-left: 10px;
  font-family: 'Raleway', sans-serif;
  font-family: 'Spline Sans Mono', monospace;
}
@media(max-width: 768px) {
  .header {
    font-size: 26px;
  }
  .nav-item {
    font-size: 18px;
  }
  .nav-item {
    margin-left: 0px;
  }
}
.nav-item {
  font-size: 20px;
  font-family: 'Raleway', sans-serif;
  margin-left: 10px;
}
</style>


