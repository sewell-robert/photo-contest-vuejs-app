import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UploadPhoto from '@/components/UploadPhoto'
import VoterBox from '@/components/VoterBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/UploadPhoto',
      name: 'UploadPhoto',
      component: UploadPhoto
    },
    {
      path: '/VoterBox',
      name: 'VoterBox',
      component: VoterBox
    }
  ]
})
