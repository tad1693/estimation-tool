import { createLocalVue, shallowMount } from '@vue/test-utils'
import Login from '@/views/Login'
import firebaseHandler from '@/util/firebaseHandler'

const localVue = createLocalVue()
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
    firebaseHandler.signInFirebase = jest.fn((email, password) => {
      return new Promise((resolve, reject) => {
        if (email === 'test@email.com' && password === '1234') {
          resolve()
        } else {
          reject(new Error('User not found'))
        }
      })
    })
  })
  it('should not login successfully', async function () {
    localVue.mixin({
      data () {
        return {
          error: ''
        }
      }
    })
    const wrapper = shallowMount(Login, {
      localVue,
      mocks: {
        $route,
        $router
      }
    })
    wrapper.find('#email').setValue('hello')
    wrapper.find('#password').setValue('world')
    wrapper.find('form').trigger('submit')
    await expect(firebaseHandler.signInFirebase()).rejects.toThrow('User not found')
    expect(wrapper.vm.error).toBe('User not found')
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
    expect($route.path).toBe('/login')
  })
  it('should login successfully', async function () {
    const wrapper = shallowMount(Login, {
      mocks: {
        $route,
        $router
      }
    })
    wrapper.find('#email').setValue('test@email.com')
    wrapper.find('#password').setValue('1234')
    await wrapper.vm.login()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })
})
