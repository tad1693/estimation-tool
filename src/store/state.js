export default {
  client: {
    name: process.env.VUE_APP_PIVOTAL_PROJECT,
    projectID: process.env.VUE_APP_PIVOTAL_PROJECT_ID,
    pivotalToken: process.env.VUE_APP_PIVOTAL_PROJECT_TOKEN,
    simple: 2,
    medium: 3,
    complex: 5,
    sprint: ''
  },
  stories: [],
  labels: [],
  users: [],
  loading: false
}
