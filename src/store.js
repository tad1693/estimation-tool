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
      sprint: ''
    },
    stories: [],
    labels: [],
    users: [],
    loading: false
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
    },
    SET_LOADING (state, loading) {
      state.loading = loading
    }
  },
  actions: {
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
  },
  getters: {
    getWeeklyTags: state => {
      return state.labels.filter(label => (label.name.includes('weekly') || label.name.includes('ready by')))
    },
    getCurrentWeeklyTag: (state, getters) => {
      let tags = getters.getWeeklyTags
      let target = ''
      if (tags.length) {
        target = tags[tags.length - 1].name
        let currentDate = new Date().toISOString()
        for (let tagIndex in tags) {
          if (dateHandler.withinSprint(tags[tagIndex].name, currentDate)) {
            target = tags[tagIndex].name
            break
          }
        }
      }
      return target
    },
    getFilteredStories: (state, getters) => {
      if (state.users.length && state.stories.length) {
        return state.stories.filter(valid => {
          return valid.hasOwnProperty('owned_by_id')
        }).map(story => {
          return {
            'id': story.id,
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
    getTotalCompletedOnETA: (state) => {
      let count = 0
      state.stories.forEach(story => {
        if (story.hasOwnProperty('accepted_at') && dateHandler.withinSprint(state.client.sprint, story.accepted_at)) {
          count++
        }
      })
      return count
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
      }
      return []
    },
    getChartRowByDate: (state, getters) => dateName => {
      let row = {}
      state.users.forEach(user => {
        let target = user.name
        let count = getters.getFilteredStories.filter(story => {
          return (story.accepted_at !== 'working' && dateHandler.getWeekDay(story.accepted_at) === dateName && story.owner === target)
        }).length
        row[target] = count
      })
      return row
    },
    getRadarByUser: (state, getters) => (user) => {
      let row = []
      const TYPES = ['bug', 'chore', 1, 2, 3]
      TYPES.forEach(type => {
        let count = getters.getFilteredStories.filter(story => {
          return ((story.type === type || story.weightage === type) && story.owner === user)
        }).length
        row.push(count)
      })
      return row
    }
  }
})
