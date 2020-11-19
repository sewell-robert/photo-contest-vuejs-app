<template>
  <div class="component-background">
    <h2>Weekly Winners<br/>(and runners-up)</h2>
    <v-carousel
      cycle
      hide-delimiters
      hide-delimiter-background
      :show-arrows="false"
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
            <v-card>
              <img :src="result.imgUrlLowQuality" width="100%" height="auto">
              <v-card-title>{{ result.author }}</v-card-title>
              <!-- <v-card-text>
                Congrats!
              </v-card-text> -->
            </v-card>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import HomePageService from '@/api-services/homepage.service'

export default {
  name: 'HomePage',
  created () {
    HomePageService.getWeeklyWinners()
      .then((response) => {
        this.results = response.data
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
h2 {
  color: black;
  font-family: 'Permanent Marker', cursive;
}
</style>
