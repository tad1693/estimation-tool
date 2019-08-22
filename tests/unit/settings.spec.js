import { createLocalVue, shallowMount } from '@vue/test-utils'
import Settings from '@/views/Setting'
import Vuex from 'vuex'
import StoreConfig from '@/store/'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Settings.vue', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store(StoreConfig)
  })
  it('should render a Vue component', function () {
    const wrapper = shallowMount(Settings, {
      localVue,
      store
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should get the Client from store on BeforeMount', function () {
    const client = {
      name: 'Test',
      projectID: '00001',
      pivotalToken: 'XXXXX',
      simple: 2,
      medium: 3,
      complex: 5,
      sprint: ''
    }
    const wrapper = shallowMount(Settings, {
      localVue,
      store
    })
    expect(wrapper.vm.target).toMatchObject(client)
  })
  it('should save values to the Store on save', function () {
    const client = {
      name: 'Test - Edited',
      projectID: '00002',
      pivotalToken: 'XXXXXY',
      simple: 1,
      medium: 2,
      complex: 3,
      sprint: ''
    }
    const wrapper = shallowMount(Settings, {
      localVue,
      store
    })
    expect(wrapper.vm.target).not.toMatchObject(client)
    wrapper.find('#client').setValue(client.name)
    wrapper.find('#projectID').setValue(client.projectID)
    wrapper.find('#PTToken').setValue(client.pivotalToken)
    wrapper.find('#simple').setValue(client.simple)
    wrapper.find('#medium').setValue(client.medium)
    wrapper.find('#complex').setValue(client.complex)
    wrapper.find('form').trigger('submit')
    expect(store.state.client).toMatchObject(client)
  })
})
