import axios from 'axios'

const STORIES = '/stories'
const LABELS = '/labels'
const USERS = '/memberships'
export default {
  getStoriesBySprint (sprint) {
    let params = {
      filter: `label:"${sprint}"`
    }
    return axios.get(STORIES, { params })
  },
  getLabels () {
    return axios.get(LABELS)
  },
  getUsers () {
    return axios.get(USERS)
  }
}
