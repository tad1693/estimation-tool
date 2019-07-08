import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import pivotalHandler from './util/pivotalHandler'
import DateHandler from './util/dateHandler'

const dateHandler = new DateHandler()

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
    getFilteredStories: (state, getters) => {
      if (state.users.length && state.stories.length) {
        return state.stories.filter(valid => {
          return valid.hasOwnProperty('owned_by_id')
        }).map(story => {
          return {
            'description': story.name,
            'type': story.story_type,
            'owner': getters.getStoryOwnerName(story.owned_by_id).name,
            'weightage': (story.hasOwnProperty('estimate')) ? parseInt(story.estimate) : 0,
            'accepted_at': (story.hasOwnProperty('accepted_at')) ? story.accepted_at : 'working'
          }
        }).sort((a, b) => {
          if (a.accepted_at > b.accepted_at) return -1
          if (a.accepted_at < b.accepted_at) return 1
          return 0
        })
      }
      return []
    },
    getClient: state => {
      return state.client
    },
    getTotalFeatures: state => {
      return state.stories.filter(story => story.story_type.toLowerCase() === 'feature').length
    },
    getTotalBugs: state => {
      return state.stories.filter(story => story.story_type.toLowerCase() === 'bug').length
    },
    getTotalChores: state => {
      return state.stories.filter(story => story.story_type.toLowerCase() === 'chore').length
    },
    getTotalCompleteOutOfETA: state => {
      let count = 0
      state.stories.forEach(story => {
        if (story.hasOwnProperty('accepted_at') && dateHandler.isOutOfETA(state.client.sprint, story.accepted_at)) {
          count++
        }
      })
      return count
    },
    getTotalCompletedOnETA: (state, getters) => {
      return state.stories.length - getters.getTotalCompleteOutOfETA
    },
    getTotalCreatedWithinSprint: state => {
      let count = 0
      state.stories.forEach(story => {
        if (dateHandler.withinSprint(state.client.sprint, story.created_at)) {
          count++
        }
      })
      return count
    },
    getStoryOwnerName: state => ownerID => {
      return state.users.filter(user =>
        user.id === ownerID
      )[0]
    },
    getTotalSprintTime: (state, getters) => {
      if (getters.getFilteredStories.length) {
        let lastStoryDate = getters.getFilteredStories[0].accepted_at
        return dateHandler.daysOfSprint(state.client.sprint, lastStoryDate)
      } return []
    }
  }
})
