import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login'
import firebaseHandler from '@/util/firebaseHandler'

jest.mock('../../src/util/firebaseHandler')
const $route = {
  path: '/login',
  query: {
    redirect: '/'
  }
}
const $router = {
  push: jest.fn()
}

describe('Login.vue', () => {
  beforeEach(() => {
    firebaseHandler.signInFirebase = jest.fn((email, password) => (email === 'test@email.com' && password === '1234'))
  })
  it('should not login successfully', function () {
    const wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router
      }
    })
    wrapper.find('#email').setValue('hello')
    wrapper.find('#password').setValue('world')
    wrapper.find('form').trigger('submit')
    expect(firebaseHandler.signInFirebase()).toBeFalsy()
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
    expect($route.path).toBe('/login')
  })
  it('should login successfully', function () {
    const wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router
      }
    })
    wrapper.find('#email').setValue('test@email.com')
    wrapper.find('#password').setValue('1234')
    wrapper.find('form').trigger('submit')
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })
})
