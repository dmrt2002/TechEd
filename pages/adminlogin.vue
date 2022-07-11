<template>
  <div class="center fadein animation-duration-1000">
    <div class="card">
      <div class="card-content">
        <p class="title">Login</p>
        <b-field label="Email">
          <b-input type="email" v-model="email" placeholder="Enter Email"></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="password" password-reveal> </b-input>
        </b-field>
        <br />
        <div class="button-center">
          <b-button @click="login()" type="is-success is-light">Submit</b-button>
        </div>
          <br>
         <span class="error" v-if="invalidCredential">Invalid Credential</span>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  components: {},
  data() {
      return {
          email: "",
          password: "",
          invalidCredential: false
      }
  },
  methods: {
      async login() {
        console.log(this.email,this.password)
        let state = {
          email: this.email,
          password: this.password
        }
        let res = await axios.post("/api/posts/adminlogin", state )
        if(res.status === 200) {
          this.$router.push('/addpost')
        }
      }
      
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&family=Spline+Sans+Mono:wght@500&display=swap');
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.title {
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-family: 'Spline Sans Mono', monospace;
}
.button-center {
  margin: 0;
  position: absolute;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.error {
    color: red;
    padding: 5px;
    margin-left: 50px;
}
</style>