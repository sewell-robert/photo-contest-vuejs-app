import Axios from 'axios'

const RESOURCE_NAME = '/api/voterbox'

export default {
  storeOneVote (id) {
    return Axios.get(RESOURCE_NAME + '/' + id)
  }
}
