<template>
  <div class="component-background">
    <div class="row-style-props">
      <v-row>
        <v-col
          v-for="(result, index) in results"
          :key="result.id"
          class="d-flex child-flex"
          cols="6"
        >
          <div class="text-center">
            <v-dialog
              persistent
              v-model="dialog"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <div>
                  <div v-if="result.imgUrlLowQuality">
                    <v-img
                      :src="result.imgUrlLowQuality"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      v-bind="attrs"
                      v-on="on"
                      v-on:click="cacheIndexForDialog(index)"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </div>
                  <div v-else>
                    <v-img
                      :src="result.imgUrl"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      v-bind="attrs"
                      v-on="on"
                      v-on:click="cacheIndexForDialog(index)"
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </div>
                </div>
              </template>
              <v-card>
                <v-img
                  :src="photoUrlDialog"
                  class="grey lighten-2 white--text align-end"
                >
                  <div>
                    <v-card-title>Photo by {{ photo.author }}</v-card-title>
                  </div>
                </v-img>
                <v-card-actions>
                  <v-card-subtitle>{{ photo.votes }} Votes</v-card-subtitle>

                  <v-spacer></v-spacer>

                  <v-btn
                    icon
                    :disabled="alreadyVoted"
                    class="heart-icon-btn"
                  >
                    <div v-if="isLiked">
                      <v-icon
                        color="red"
                        v-on:click="storeVote()"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                    <div v-else>
                      <v-icon
                        v-on:click="storeVote()"
                      >
                        mdi-heart
                      </v-icon>
                    </div>
                  </v-btn>

                  <v-btn
                    icon
                    @click="dialog = false, isLiked = false"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="text-center pagination-style-props">
      <v-pagination
        v-model="page"
        :length="paginationLength"
        circle
        color="#bfb7aa"
        @input="nextPage()"
      ></v-pagination>
    </div>

    <!-- <div style="width: 100%; height: 800px;"></div> -->
  </div>
</template>

<script>
import UploadService from '@/api-services/upload.service'
import VoterBoxService from '@/api-services/voterBox.service'

export default {
  name: 'VoterBox',
  methods: {
    nextPage () {
      UploadService.getNextPage(this.page)
        .then((response) => {
          this.results = response.data
        })
    },
    cacheIndexForDialog (index) {
      // this.photoUrlDialog = this.results[index].imgUrl
      this.photo = this.results[index]

      if (this.photo.imgUrlHighQuality) {
        this.photoUrlDialog = this.photo.imgUrlHighQuality
      } else {
        this.photoUrlDialog = this.photo.imgUrl
      }
    },
    storeVote () {
      this.isLiked = true

      // This axios call is here for testing only
      VoterBoxService.storeOneVote(this.photo.id)
        .then((response) => {
          this.photo.votes = response.data
        })

      var newDate = new Date()
      var todaysDt = newDate.getDate()

      if (localStorage.getItem('date')) {
        var date = localStorage.getItem('date')

        if (date < todaysDt) {
          VoterBoxService.storeOneVote(this.photo.id)
            .then((response) => {
              this.photo.votes = response.data
            })
          // localStorage.setItem('date', todaysDt)
          // localStorage.setItem('photoId', this.photo.id)
          console.log('Store vote 2')
        }
      }
    }
  },
  created () {
    UploadService.getNextPage(1)
      .then((response) => {
        this.results = response.data
      }).then(UploadService.getPhotoCount()
        .then((response) => {
          this.paginationLength = Math.ceil(response.data / 6)
        }))

    var newDate = new Date()
    var todaysDt = newDate.getDate()

    if (localStorage.getItem('date')) {
      var date = localStorage.getItem('date')

      if (date === todaysDt) {
        this.alreadyVoted = true
      }
    }
  },
  data () {
    return {
      results: [],
      page: 1,
      paginationLength: 4,
      dialog: false,
      photo: {},
      photoUrlDialog: '',
      isLiked: false,
      alreadyVoted: false
    }
  }
}
</script>

<style scoped>
.component-background {
  /* background-image: url("https://photocontestblob.blob.core.windows.net/photocontestblob/white-brick.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover; */
  /* padding-top: 25px; */
  width: auto;
}
/* .row-style-props {
  padding-left: 15px;
  width: auto;
}
.pagination-style-props {
  padding-left: 15px;
  width: auto;
} */
.heart-icon-btn {
  margin-right: 15px;
}
</style>
