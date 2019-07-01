import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import pivotalHandler from './util/pivotalHandler'

const HOST = 'https://www.pivotaltracker.com/services/v5/projects/'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    client: {
      name: 'EdThrive',
      projectID: '2229046',
      pivotalToken: '1f1755771382bd90a7730132feece66c',
      simple: 2,
      medium: 3,
      complex: 5,
      sprint: 'weekly 0513'
    },
    stories: [],
    labels: [],
    users: []
  },
  mutations: {
    SET_CLIENT (state, client) {
      state.client = client
    },
    SET_SPRINT (state, sprint) {
      state.client.sprint = sprint
    },
    SET_STORIES (state, stories) {
      state.stories = stories
    },
    SET_USERS (state, users) {
      state.users = users
    },
    SET_LABELS (state, labels) {
      state.labels = labels
    }
  },
  actions: {
    retrieveStories ({ commit, getters }, sprint) {
      axios.defaults.baseURL = HOST + getters.getClient.projectID
      axios.defaults.headers.common['X-TrackerToken'] = getters.getClient.pivotalToken
      let vm = this
      vm.loading = true
      axios.all([pivotalHandler.getStoriesBySprint(sprint), pivotalHandler.getLabels(), pivotalHandler.getUsers()])
        .then(axios.spread((stories, labels, users) => {
          commit('SET_STORIES', stories.data)
          commit('SET_LABELS', labels.data)
          commit('SET_USERS', users.data.map(user => {
            return user.person
          }))
        }))
    }
  },
  getters: {
    getClient: state => {
      return state.client
    }
  }
})
