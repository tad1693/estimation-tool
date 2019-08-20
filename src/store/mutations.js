export default {
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
}
