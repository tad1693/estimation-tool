import { createLocalVue, shallowMount } from '@vue/test-utils'
import LineChart from '@/components/LineChart.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('LineChart.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getFilteredStories (state) {
          return state.stories
        },
        getChartRowByDate: (state) => (day) => {
          return { 'test': [] }
        }
      },
      state: {
        client: {
          sprint: ''
        },
        stories: [],
        users: [
          {
            name: 'test'
          }
        ]
      },
      mutations: {
        SET_STORIES (state, payload) {
          state.stories = payload
        }
      }
    })
  })
  it('should be a vue Component', function () {
    const addUsers = jest.fn()
    const addRows = jest.fn()
    const wrapper = shallowMount(LineChart, {
      localVue,
      store
    })
    wrapper.setMethods({
      addRows,
      addUsers
    })
    store.commit('SET_STORIES', [{ name: 'story 1' }])
    expect(wrapper.isVueInstance()).toBeTruthy()
    // expect(wrapper.vm.drawChart()).toBeUndefined()
    expect(wrapper.vm.addRows).toHaveBeenCalled()
    expect(wrapper.vm.addUsers).toHaveBeenCalled()
  })
  it('should call drawChart when getFilteredStories changes', function () {
    const data = {
      addColumn: jest.fn(),
      addRows: jest.fn()
    }
    const wrapper = shallowMount(LineChart, {
      localVue,
      store
    })
    wrapper.vm.addUsers(data)
    // expect(data.Column).toHaveBeenCalled()
    wrapper.vm.addRows(data)
    expect(data.addRows).toHaveBeenCalled()
  })
})
