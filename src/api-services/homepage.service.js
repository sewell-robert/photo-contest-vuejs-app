import Axios from 'axios'

const RESOURCE_NAME = '/api/homepage'

export default {
  getWeeklyWinners () {
    return Axios.get(RESOURCE_NAME)
  }
}
