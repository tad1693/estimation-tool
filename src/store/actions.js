import axios from 'axios'
import pivotalHandler from '../util/pivotalHandler'

const HOST = 'https://www.pivotaltracker.com/services/v5/projects/'

export default {
  retrieveStories ({ commit, getters }, sprint) {
    commit('SET_LOADING', true)
    axios.defaults.baseURL = HOST + getters.getClient.projectID
    axios.defaults.headers.common['X-TrackerToken'] = getters.getClient.pivotalToken
    pivotalHandler.getStoriesBySprint(sprint)
      .then(stories => {
        commit('SET_STORIES', stories.data)
        commit('SET_LOADING', false)
      })
  },
  retrieveTags ({ commit, getters }) {
    commit('SET_LOADING', true)
    axios.defaults.baseURL = HOST + getters.getClient.projectID
    axios.defaults.headers.common['X-TrackerToken'] = getters.getClient.pivotalToken
    axios.all([pivotalHandler.getLabels(), pivotalHandler.getUsers()])
      .then(axios.spread((labels, users) => {
        commit('SET_LABELS', labels.data)
        commit('SET_USERS', users.data.map(user => {
          return user.person
        }))
        commit('SET_SPRINT', getters.getCurrentWeeklyTag)
        commit('SET_LOADING', true)
      }))
  }
}
