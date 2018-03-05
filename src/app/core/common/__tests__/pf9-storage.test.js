import {
  clear,
  clearAll,
  getStorage,
  setStorage,
} from '../pf9-storage'

let originalLocalStorage = global.localStorage

let storage = {}
const mockLocalStorage = {
  getItem: key => storage[key],
  setItem: (key, value) => { storage[key] = value }
}

describe('pf9Storage', () => {
  beforeAll(() => {
    global.localStorage = mockLocalStorage
  })

  afterAll(() => {
    global.localStorage = originalLocalStorage
  })

  beforeEach(() => {
    clearAll()
  })

  it('setStorage', () => {
    setStorage('test', 'value')
    expect(getStorage('test')).toEqual('value')
  })

  it('getStorage', () => {
    setStorage('test', 'value')
    expect(getStorage('test')).toEqual('value')
  })

  it('clear', () => {
    setStorage('test', 'value')
    expect(getStorage('test')).toEqual('value')
    clear('test')
    expect(getStorage('test')).toBeUndefined()
  })

  it('clearAll', () => {
    setStorage('test', 'value')
    expect(getStorage('test')).toEqual('value')
    clearAll()
    expect(getStorage('test')).toBeUndefined()
  })
})