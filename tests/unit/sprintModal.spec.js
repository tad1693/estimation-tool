import { createLocalVue, shallowMount } from '@vue/test-utils'
import SprintModal from '@/components/SprintModal'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import state from '@/store/state'
import 'bootstrap'
import tags from '@/fixtures/weeklytags'

const localVue = createLocalVue()
localVue.use(Vuex)
describe('SprintModal.vue', () => {
  let getters, store
  beforeEach(() => {
    getters = {
      getWeeklyTags: () => tags
    }
    store = new Vuex.Store({
      getters,
      state,
      mutations
    })
  })
  it('should save Sprint', function () {
    const wrapper = shallowMount(SprintModal, {
      store,
      localVue
    })
    const target = 'weekly 0708'
    expect(wrapper.vm.target).toBe('')
    expect(wrapper.vm.current).toBe('')
    expect(wrapper.vm.sprints).toBe(tags)
    expect(wrapper.findAll('#sprint > option').length).toBe(9)
    wrapper.findAll('#sprint > option').at(5).element.selected = true
    wrapper.find('#sprint').trigger('change')
    expect(wrapper.findAll('#sprint > option').at(5).element.selected).toBeTruthy()
    expect(wrapper.vm.target).toBe(target)
    wrapper.find('#sprintForm').trigger('submit')
    expect(store.state.client.sprint).toBe(target)
    expect(wrapper.vm.current).toBe(target)
  })
})
