import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'
import EstimationSheet from '@/components/EstimationSheet'

describe('Home.vue', () => {
  it('should render a Vue component', function () {
    const wrapper = shallowMount(Home)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should include EstimationSheet.vue component', function () {
    const wrapper = shallowMount(Home)
    expect(wrapper.find(EstimationSheet).isVueInstance()).toBeTruthy()
  })
})
