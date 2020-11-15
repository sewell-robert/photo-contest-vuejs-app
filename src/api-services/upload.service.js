
import Axios from 'axios'

const RESOURCE_NAME = '/api/uploadphotos'

export default {
  getAll () {
    return Axios.get(RESOURCE_NAME)
  },
  getOneImage (id) {
    return Axios.get(RESOURCE_NAME + '/' + id)
  },
  getLast () {
    return Axios.get(RESOURCE_NAME + '/last')
  },
  getNextPage (page) {
    return Axios.get(RESOURCE_NAME + '/page/' + page)
  },
  getPhotoCount () {
    return Axios.get(RESOURCE_NAME + '/count')
  },
  postOneImage (formData, config) {
    return Axios.post(RESOURCE_NAME, formData, config)
  }
}
