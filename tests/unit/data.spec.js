import { shallowMount } from '@vue/test-utils'
import Data from '@/views/Data'
import Header from '@/components/Header'
import LineChart from '@/components/LineChart'
import RadarChart from '@/components/RadarChart'

describe('Data.vue', () => {
  it('should be a Vue component', function () {
    const wrapper = shallowMount(Data)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('should render LineChart', function () {
    const wrapper = shallowMount(Data)
    expect(wrapper.find(LineChart).isVueInstance()).toBeTruthy()
  })
  it('should render RadarChart', function () {
    const wrapper = shallowMount(Data)
    expect(wrapper.find(RadarChart).isVueInstance()).toBeTruthy()
  })
  it('should render Header', function () {
    const wrapper = shallowMount(Data)
    expect(wrapper.find(Header).isVueInstance()).toBeTruthy()
  })
})
