import { createLocalVue, shallowMount } from '@vue/test-utils'
import RadarChart from '@/components/RadarChart.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RadarChart.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        getFilteredStories (state) {
          return state.stories
        },
        getRadarByUser: (state) => (day) => {
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
    const drawChart = jest.fn()
    const wrapper = shallowMount(RadarChart, {
      localVue,
      store,
      methods: {
        drawChart
      }
    })
    store.commit('SET_STORIES', [{ name: 'story 1' }])
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(drawChart).toHaveBeenCalled()
    expect(drawChart).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.getData().length).toBe(1)
  })
})
