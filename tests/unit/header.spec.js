import { createLocalVue, shallowMount } from '@vue/test-utils'
import vuex from 'vuex'
import Header from '@/components/Header'

const localVue = createLocalVue()
localVue.use(vuex)
localVue.filter('formatDate', jest.fn())

describe('Header.vue', () => {
  const store = new vuex.Store({
    getters: {
      getTotalFeatures: jest.fn(() => 2),
      getTotalBugs: jest.fn(() => 1),
      getTotalChores: jest.fn(() => 0)
    },
    state: {
      client: {
        sprint: ''
      },
      labels: []
    },
    actions: {
      retrieveStories: jest.fn(),
      retrieveTags: jest.fn()
    },
    mutations: {
      SET_SPRINT: (state, payload) => {
        state.client.sprint = payload
      }
    }
  })
  it('should render component properly', function () {
    const WeeklyTag = 'weekly 0708'
    const wrapper = shallowMount(Header, {
      localVue,
      store
    })
    store.commit('SET_SPRINT', WeeklyTag)
    expect(wrapper.vm.ETA().toISOString()).toBe('2019-07-13T06:00:00.000Z')
  })
})
