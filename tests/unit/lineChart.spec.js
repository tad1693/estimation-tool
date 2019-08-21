import { createLocalVue, shallowMount } from '@vue/test-utils'
import LineChart from '@/components/LineChart.vue'
import Vuex from 'vuex'
import moment from 'moment'
import tags from '@/fixtures/weeklytags'
import state from '@/store/state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import users from '@/fixtures/users'
import stories from '@/fixtures/stories'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.filter('twoDecimals',
  (value) => {
    return parseFloat(value.toFixed(2))
  })
localVue.filter('formatDate', (dateString) => {
  return moment(dateString).format('ddd MMM Do YY')
})

describe('LineChart.vue', () => {
  let store
  beforeEach(() => {
    state.labels = tags
    state.users = users
    state.stories = stories
    store = new Vuex.Store({
      getters,
      state,
      mutations
    })
  })
  it('should be a vue Component', function () {
    const wrapper = shallowMount(LineChart, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
