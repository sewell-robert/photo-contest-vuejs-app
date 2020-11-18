<template>
  <div class="component-background">
    <v-carousel
      cycle
      hide-delimiters
      hide-delimiter-background
    >
      <v-carousel-item
        v-for='result in results'
        :key='result.id'
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-sheet
          color="white"
          height="100%"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div>
              <img :src="result.imgUrl" width="100%" height="auto">
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <!-- <div style="width: 100%; height: 800px;"></div> -->
  </div>
</template>

<script>
import UploadService from '@/api-services/upload.service'

export default {
  name: 'HomePage',
  created () {
    UploadService.getAll()
      .then((response) => {
        this.results = response.data
        console.log(this.results)
      })
  },
  data () {
    return {
      results: []
    }
  }
}
</script>

<style scoped>
/* .component-background {
  background-image: url("https://photocontestblob.blob.core.windows.net/photocontestblob/white-brick.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
} */
</style>
