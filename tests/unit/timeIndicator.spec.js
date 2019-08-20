import { createLocalVue, shallowMount } from '@vue/test-utils'
import TimeIndicator from '@/components/TimeIndicator'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('TimeIndicator.vue', () => {
  let getters, store, indicatorColor, sprintTime
  it('get border-warning class when getTotalSprintTime is 5', () => {
    indicatorColor = 'border-warning'
    sprintTime = 5
    getters = {
      getTotalSprintTime: () => sprintTime
    }
    store = new Vuex.Store({
      getters
    })
    const wrapper = shallowMount(TimeIndicator, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.getIndicatorColor).toBe(indicatorColor)
    expect(wrapper.vm.getTotalSprintTime).toBe(5)
    let indicator = wrapper.find('.indicator')
    expect(indicator.classes()).toContain(indicatorColor)
  })
  it('get border-danger class when getTotalSprintTime is greater than 5', () => {
    indicatorColor = 'border-danger'
    sprintTime = 6
    getters = {
      getTotalSprintTime: () => sprintTime
    }
    store = new Vuex.Store({
      getters
    })
    const wrapper = shallowMount(TimeIndicator, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.getIndicatorColor).toBe(indicatorColor)
    expect(wrapper.vm.getTotalSprintTime).toBe(sprintTime)
    let indicator = wrapper.find('.indicator')
    expect(indicator.classes()).toContain(indicatorColor)
  })
  it('get border-success class when getTotalSprintTime is lower than 5', () => {
    indicatorColor = 'border-success'
    sprintTime = 4
    getters = {
      getTotalSprintTime: () => sprintTime
    }
    store = new Vuex.Store({
      getters
    })
    const wrapper = shallowMount(TimeIndicator, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.getIndicatorColor).toBe(indicatorColor)
    expect(wrapper.vm.getTotalSprintTime).toBe(sprintTime)
    let indicator = wrapper.find('.indicator')
    expect(indicator.classes()).toContain(indicatorColor)
  })
})
