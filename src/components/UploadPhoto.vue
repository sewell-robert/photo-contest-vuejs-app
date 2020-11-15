<template>
  <div class="component-background">
    <div>
      <v-alert
        v-if="isImageSaved"
        dense
        type="success"
        class="alert-style-props"
      >Photo successfully saved!</v-alert>

      <v-card
        elevation="20"
        class="image-container"
      ><img :src="image" width="100%" height="auto" class="image-style-props"><br /></v-card>

      <div class="form-style-props">
        <v-card
          elevation="2"
          outlined
          class="card-style-props"
        >
          <input class="file-input btn" type="file" id="file" ref="file" v-on:change="handleFileUpload()" />

          <v-text-field
            v-model="author"
            label="Enter your name"
            required
            counter="25"
            :disabled="isImageSaving"
            class="author-text-field"
          ></v-text-field>
        </v-card>
      </div>

      <div>
        <v-btn
          elevation="2"
          width="75%"
          rounded
          fab
          color="#bfb7aa"
          :loading="isImageSaving"
          :disabled="isImageSaving"
          class="submit-photo-btn"
          v-on:click="submitFile()"
        >Submit Photo</v-btn>
      </div>

      <!-- <button v-on:click="submitFile()">Submit</button> -->

      <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input"> -->
    </div>
    <div style="width: 100%; height: 1000px;"></div>
  </div>
</template>

<script>
import UploadService from '@/api-services/upload.service'

export default {
  name: 'UploadPhoto',
  props: {
    test: String,
    isActive: false
  },
  methods: {
    // uploadImage(event) {
    //   // eslint-disable-next-line no-console
    //   // console.log(event);
    //   // eslint-disable-next-line no-console
    //   console.log(event.target.files[0]);
    //   this.isActive = true;
    handleFileUpload () {
      this.uploadedImage = this.$refs.file.files[0]
    },
    submitFile () {
      this.isImageSaving = true
      this.isImageSaved = false

      const formData = new FormData()
      formData.append('file', this.uploadedImage)
      formData.append('index', this.index)
      formData.append('author', this.author)

      this.index += 1

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      UploadService.postOneImage(formData, config).then(response => {
        this.image = response.data.imgUrl
        this.author = response.data.author
        this.index = response.data.id
        this.isImageSaved = true
        this.isImageSaving = false
      })
    }

    //   this.image = event.target.files[0].name;
    //   // OrderService.postOneImage();
    // },
  },
  created () {
    this.image = this.placeholderImage
    // OrderService.getAll()
    //   .then((response) => {
    //     this.image = 'data:image/jpg;base64,'.concat(this.image.concat(response.data));
    //   });
    UploadService.getLast()
      .then((response) => {
        // this.image = response.data.imgUrl
        // this.author = response.data.author
        this.index = response.data.id
      })
    // OrderService.getOne('2')
    //   .then((response) => {
    //     this.person = response.data.name;
    //   });
    // OrderService.getOneImage('2')
    //   .then((response) => {
    //     this.image = response.data.imgUrl;
    //   });
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      image: '',
      uploadedImage: '',
      placeholderImage: 'https://photocontestblob.blob.core.windows.net/photocontestblob/white-brick.png',
      author: '',
      index: '',
      isImageSaving: false,
      isImageSaved: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.component-background {
  background-image: url("https://photocontestblob.blob.core.windows.net/photocontestblob/white-brick.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding: 25px 0px 0px 0px;
}
.alert-style-props {
  margin: 0px 10px 10px 10px;
}
.author-text-field {
  margin: 0px 10px 0px 10px;
}
.image-style-props {
  border: 2px solid black;
  border-radius: 4px;
}
.file-input {
  margin: 5px 0px 5px 0px;
}
.form-style-props {
  display: inline-block;
  margin: 15px 0px 15px 0px;
}
.image-container {
  margin: 0px 15px 0px 15px;
}
.card-style-props {
  padding-bottom: 10px;
}
</style>
