import DateHandler from '../util/dateHandler'

const dateHandler = new DateHandler()
export default {
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
      row[target] = getters.getFilteredStories.filter(story => {
        return (story.accepted_at !== 'working' && dateHandler.getWeekDay(story.accepted_at) === dateName && story.owner === target)
      }).length
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
