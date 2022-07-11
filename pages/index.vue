<template>
<div class="bg">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
    <div v-if="!isLoading">
  <div class="grid my-grid fadein animation-duration-1000 animation-iteration-1">
     <div class="md:col-5 md:col-offset-1 sm:col-6 md:mt-6 mb-3">
      <img 
        :src ="`http://localhost:5000/${imgUrl}`"
        alt="The Buefy Logo"
        class="banner b-image-wrapper">
      </img>
     </div>
     <div class="col height-half">
      <h1 class="blog-title ml-6 mt-6 mr-6 mb-3">{{ latestPost.title }}</h1>
      <button class="btn success ml-6 mb-3">{{ latestPost.category }}</button>
      <p class="blog-content ml-6 mr-8 mb-5">{{ latestPost.content }}</p>
            <a :to="latestPost.title" class="cta cursor-pointer ml-6">
              <span class="button-text" @click="redirect(latestPost)">Read More</span>
              <svg width="13px" height="11px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
     </div>
  </div>
  <br>
      <div class="columns is-multiline fadein animation-duration-1000" @click="redirect(p)">
      <div v-for="p in posts" :key="p.index" class="column is-one-third">
    <div class="card mb-6 "> 
      <div class="card-image">
        <figure class="image is-4by3">
       <img :src ="`/${p.url}`" alt="Placeholder image">
        </figure>
    </div>
  <div class="card-content">
    <div class="title-blog">
      {{ p.title }}
    </div>
   <button class="btn success mb-3">{{ p.category }}</button>
    <div class="content">
       <p class="card-blog-content">{{ p.content }}</p>
       <br>
            <a  class="cta cursor-pointer mb-6">
              <span class="button-text" @click="redirect(p)">Read More</span>
              <svg width="13px" height="11px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
            <br><br>
     </div>
   </div>
 </div>
      </div>
    </div>
    </div>
</div>
</template>

<script>
import API from '../api'
export default {
  data() {
    return {
      posts: [],
      imgUrl: '',
      latestPost: [],
      isFullPage: true,
      isLoading : true
    }
  },
  async created() {
    this.posts = await API.getAllPost()
    console.log(this.posts)
    for(let i = 0 ; i<= this.posts.length - 1 ; i++) {
      this.posts[i].content = this.posts[i].content.slice(0,120) + "..." 
    }
    let length = this.posts.length
    this.imgUrl = this.posts[length - 1].url
    this.latestPost = this.posts.pop()
    let arr = this.posts
    this.posts = arr.reverse()
    console.log(this.latestPost)
    this.isLoading = false
  },
  methods : {
    redirect(parameter) {
      console.log(parameter)
        this.$router.push({
        path : `${parameter.title}`,
        params: {
          id: parameter._id,
        },
      });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
.bg {
  min-height: 100vh;
  min-width: 100vw;
}
.columns {
  margin-right: 3rem;
  margin-left: 3rem;
}
.banner {
  height: 50vh !important;
  width: 50vw !important;
  object-fit: cover;
  box-shadow: 0 4px 8px 0 rgba(11, 15, 228, 0.2);
  transition: 0.3s;
}
.blog-title {
  font-size: 36px;
  font-family: 'Roboto Mono', monospace;
}
.title-blog {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1; /* number of lines to show */
   -webkit-box-orient: vertical;
   font-size: 1.5em;
   font-family: 'Roboto Mono', monospace; 
   margin-bottom: 20px;
}
.blog-content {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 5; /* number of lines to show */
   -webkit-box-orient: vertical;
   font-family: 'Titillium Web', sans-serif;
}

.height-half {
  min-height: 50vh;
}
.btn {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 8px 16px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Roboto Mono', monospace;
}
.success {
  border-color: #04aa6d;
  color: green;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(11, 15, 228, 0.2);
  transition: 0.3s;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.card-blog-content {
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 6; /* number of lines to show */
   -webkit-box-orient: vertical;
}
@media (max-width:768px) {
.banner {
  height: 50vh !important;
  width: 100vw !important;
  object-fit: cover;
}
.card-blog-content {
  font-size: 16px;
}
.my-grid {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.columns {
  margin-top: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
}
}
a {
  text-decoration: none;
  color: inherit;
}

.cta  , .cta-back {
  position: relative;
  margin: auto;
  padding: 19px 22px;
  transition: all 0.2s ease;
}
.cta:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  border-radius: 28px;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta-back:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  width: 56px;
  height: 56px;
  transition: all 0.3s ease;
}
.cta span, .cta-back span {
  position: relative;
  font-size: 18px;
  line-height: 18px;
  font-weight: 900;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  vertical-align: middle;
}
.cta svg, .cta i {
  position: relative;
  top: 0;
  margin-left: 10px;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #111;
  stroke-width: 2;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}
.cta:hover:before, .cta-back:hover:before {
  width: 100%;
  background: lightblue;
}
.cta:hover svg, .cta-back i {
  transform: translateX(0);
}
.cta:active , .cta-back:active {
  transform: scale(0.96);
}
.button-text {
  font-family: 'Roboto Mono', monospace;
}
</style>
