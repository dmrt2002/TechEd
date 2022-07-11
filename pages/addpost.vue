<template>
  <div class="center fadein animation-duration-1000">
    <div class="card">
      <div class="card-content">
        <p class="title">ADD POST</p>
      <form  @submit.prevent="submit" enctype="multipart/form-data">
        <b-field label="Title">
          <b-input type="title" v-model="post.title" placeholder="Enter Title"></b-input>
        </b-field>
        <b-field
            label="Category">
            <b-select v-model="post.category" placeholder="Select a character" expanded>
                <option value="Emerging-Tech">Emerging-Tech</option>
                <option value="Interview-tips">Interview-tips</option>
                <option value="Career-Guidance">Career Guidance</option>
                <option value="Internships">Internships</option>
                <option value="Overseas-Education">Overseas-Education</option>
            </b-select>
        </b-field>

        <b-field label="Content">
            <b-input v-model="post.content" maxlength="2000" type="textarea"></b-input>
        </b-field>
        <div class="label">Image</div>
    <b-field class="file is-primary" :class="{'has-name': !!file}">
        <b-upload v-model="file" class="file-label">
            <span class="file-cta">
                <b-icon class="file-icon" icon="upload"></b-icon>
                <span class="file-label">Click to upload</span>
            </span>
            <span class="file-name" v-if="file">
                {{ file.name }}
            </span>
        </b-upload>
    </b-field>
        <br />
        <div class="button-center">
          <b-button @click="submit()" type="is-success is-light">Submit</b-button>
        </div>
        <br />
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../api'
export default {
  data() {
    return {
      post: {
          title: "",
          category: "",
          content: "",
          image: "",        
      },
      image: "",
      file:[]
    }
  },
  methods: {
          async submit() {
            const formData = new FormData();
            let name = this.file.name
            console.log(name)
            formData.append('url', name)
            formData.append('image', this.file);
            formData.append('title', this.post.title);
            formData.append('category', this.post.category);
            formData.append('content', this.post.content);
            console.log(formData)
            const response = await API.AddPost(formData)
            if(response.status === 201) {
                this.$buefy.toast.open({
                    message: 'Created sucessfully!',
                    type: 'is-success'
                })
            this.post.title = ""
            this.post.category = ""
            this.post.content = ""
            this.post.image = "",
            this.file = []
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
  min-height: 90vh;
}
.card {
    width: 80vw;
}
.title {
  text-align: center;
  font-family: 'Raleway', sans-serif;
  font-family: 'Spline Sans Mono', monospace;
  color: blue;
}
.label {
  font-family: 'Raleway', sans-serif;
  font-family: 'Spline Sans Mono', monospace;
  padding: 5px;   
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