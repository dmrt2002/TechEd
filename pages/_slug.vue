<template>
<div class="bg">
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  <div v-if="!isLoading" class="fadein animation-duration-1000">
    <div class="post-content-title">
        <h1 class="content-title">
            {{ post.title}}
        </h1>
    </div>
    <div class="image-wrapper">
        <img 
        :src="`/${imgUrl}`"
        alt="The Buefy Logo"
        class="banner b-image-wrapper">
      </img>
    </div>
    <div class="post-content">
        <div v-for="content in contents" class="post-content-para">
            {{ content }}
        </div>
    </div>
    <div v-if="!value">
    <div class="related-post-title">
      Related Posts
    </div>
      <div class="columns is-multiline fadein animation-duration-1000" @click="redirect(p)">
      <div v-for="p in relatedPosts" :key="p.index" class="column is-one-third">
    <div class="card mb-6 "> 
      <div class="card-image">
        <figure class="image is-4by3">
       <img :src ="`/${p.url}`" alt="Placeholder image">
        </figure>
    </div>
  <div class="card-content">
    <div class="title">
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
</div>

</template>

<script>
import API from '../api'
export default {
  data() {
    return {
      post: [],
      imgUrl: '',
      contents: [],
      relatedPosts: [],
      isLoading: true,
      value: false
    }
  },
  async created() {
    let title = this.$route.params.slug
    const response = await API.getPostbyID(title)
    this.post = response.post[0]
    this.relatedPosts = response.relatedPosts
    if(this.relatedPosts.length === 0) {
      this.value = true
    }
    console.log(this.value)
    console.log(this.relatedPosts)
    for(let j = 0 ; j <= this.relatedPosts.length - 1 ; j++) { 
      this.relatedPosts[j].content = this.relatedPosts[j].content.slice(0,110) + "..." 
    }
    const chunk = (arr, len) => {
      const chunks = []
      let i = 0
      while (i < arr.length) chunks.push(arr.slice(i, i += len))
      return chunks
     }
     console.log(this.post.content.split(/\n\s*\n/))
     const choppedString = this.post.content
     // Splits it into paragraphs (what you already did)
     .split(/\n\s*\n/)
     .flatMap(paragraph => paragraph.length > 1024
    // If the paragraph is over 1024 characters, split it into arrays with a
    // maximum of 5 sentences...
    ? chunk(paragraph.split(/(?<=[.?!\n])\s*/), 5)
      // ...and then trim each of those sentences (to remove the trailing
      // new line if there is any) and join them
      .map(sentences => sentences.map(s => s.trim()).join(' '))
    // If the pargraph is <= 1024 characters, just keep it as it is
    : paragraph)
    this.contents = choppedString
    this.imgUrl = this.post.url
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
.banner {
  height: 80vh !important;
  width: 100vw !important;
  object-fit: cover;
  transition: 0.3s;
}
.image-wrapper {
    margin-left: 10vw;
    margin-right: 10vw;
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
.content-title {
    text-align: center;
    font-size: 36px;
    margin-top: 5vh;
    margin-bottom: 5vh;
    font-weight: 900;
    font-family: 'Roboto Mono', monospace; 
}
.post-content-para {
    margin-top: 10vh;
    margin-bottom: 10vh;
    margin-right: 10vw;
    margin-left: 10vw;
    font-size: 24px;
    font-family: 'Titillium Web', sans-serif;
    font-weight: 500;
}
@media(max-width: 768px) {
  .content-title {
      font-size: 25px;
  }
  .image-wrapper {
    margin-right: 0;
    margin-left: 0;
  }
  .post-content-para {
    margin-right: 5vw;
    margin-left: 5vw;
  }
  .content-title {
    margin-left: 5vw;
    margin-left: 5vw;
  }
}
.related-post-title {
    text-align: center;
    font-size: 36px;
    margin-top: 2vh;
    margin-bottom: 5vh;
    font-weight: 900;
    font-family: 'Roboto Mono', monospace;
      color: blue;  
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
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  cursor: pointer;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.card-blog-content {
  font-size: 24px;
  font-family: 'Titillium Web', sans-serif;
}
.columns {
  margin-right: 3rem;
  margin-left: 3rem;
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