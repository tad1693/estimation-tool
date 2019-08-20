import { createLocalVue, shallowMount } from '@vue/test-utils'
import EstimationSheet from '@/components/EstimationSheet.vue'
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

describe('EstimationSheet.vue', () => {
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
  it('get Simple for wiehgtage 1', () => {
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.getWeightageName(1)).toBe('Simple')
  })
  it('get Medium for wiehgtage 2', () => {
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.getWeightageName(2)).toBe('Medium')
  })
  it('get Complex for wiehgtage 3', () => {
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.getWeightageName(3)).toBe('Complex')
  })
  it('should return falsy ', function () {
    const acceptedTime = '2019-07-08T20:01:20Z'
    const sprint = 'Weekly 0708'
    store.state.client.sprint = sprint
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.sprint).toBe(sprint)
    expect(wrapper.vm.onETA(acceptedTime)).toBeFalsy()
  })
  it('should return true ', function () {
    const acceptedTime = '2019-07-15T20:01:20Z'
    const sprint = 'Weekly 0708'
    store.state.client.sprint = sprint
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.sprint).toBe(sprint)
    expect(wrapper.vm.onETA(acceptedTime)).toBeTruthy()
  })
  it('should return correct values for computed properties', function () {
    const sprint = 'Weekly 0708'
    store.state.client.sprint = sprint
    const wrapper = shallowMount(EstimationSheet, {
      store,
      localVue
    })
    expect(wrapper.vm.getTaskNoneCount).toBe(4)
    expect(wrapper.vm.getTaskSimpleCount).toBe(0)
    expect(wrapper.vm.getTaskMediumCount).toBe(1)
    expect(wrapper.vm.getTaskComplexCount).toBe(1)
    expect(wrapper.vm.getTotalTaskNoneCount).toBe(4)
    expect(wrapper.vm.getTotalTaskSimpleCount).toBe(0)
    expect(wrapper.vm.getTotalTaskMediumCount).toBe(3)
    expect(wrapper.vm.getTotalTaskComplexCount).toBe(5)
    expect(wrapper.vm.getFunctionTotalPoints).toBe(12)
    expect(wrapper.vm.getTotalEstimatedEffort).toBe(60)
    expect(wrapper.vm.getBestCaseEstimate).toBe(42)
    expect(wrapper.vm.getWorstCaseEstimate).toBe(72)
    expect(wrapper.vm.getEstimation).toBe(59)
    expect(wrapper.vm.getSD).toBe(5)
  })
  // it('should return 6 weekly tags', function () {
  //   expect(store.getters.getWeeklyTags.length).toBe(6)
  // })
  // it('should return "weekly 0729" as last weekly tag', function () {
  //   expect(store.getters.getCurrentWeeklyTag).toBe('weekly 0729')
  // })
  // it('should return 6 filtered stories', function () {
  //   expect(store.getters.getFilteredStories.length).toBe(6)
  // })
  // it('should return Juan as user', function () {
  //   expect(store.getters.getStoryOwnerName(3126544).name).toContain('Juan')
  // })
})
