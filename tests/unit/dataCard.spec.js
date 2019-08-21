import DataCard from '@/components/DataCard'
import { shallowMount } from '@vue/test-utils'

describe('DataCard.vue', () => {
  it('should render correct props data', function () {
    const propsData = {
      icon: 'fa-star',
      value: 2,
      name: 'Features',
      textClass: 'text-warning',
      sm: true
    }
    const wrapper = shallowMount(DataCard, {
      propsData
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find('.card-body').classes()).toContain('p-0')
    expect(wrapper.find('.small').text()).toBe(propsData.value.toString())
    expect(wrapper.find('.fas').classes()).toContain(propsData.icon)
    expect(wrapper.findAll('p').length).toBe(2)
    expect(wrapper.find('.h3').classes()).toContain(propsData.textClass)
  })
  it('should render another correct props data', function () {
    const propsData = {
      icon: 'fa-star',
      value: 2,
      name: 'Features',
      textClass: 'text-warning',
      sm: false
    }
    const wrapper = shallowMount(DataCard, {
      propsData
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.findAll('p').at(1).text()).toBe(propsData.value.toString())
    expect(wrapper.find('.fas').classes()).toContain(propsData.icon)
    expect(wrapper.findAll('p').length).toBe(3)
    expect(wrapper.find('.h3').text()).toBe(propsData.name)
  })
})
