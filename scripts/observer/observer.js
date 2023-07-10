import Dep from '../dep/dep.js'

export default class Obserber {
  constructor(data) {
    this.observe(data)
  }

  observe(data) {
    if(data && typeof data === 'object') {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data,key,data[key])
      })
    }
  }

  // 劫持监听数据
  defineReactive(data,key,value) {
    this.observe(value)
    const dep = new Dep()
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable: false,
      get() {
        // 订阅数据变化，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set:(newValue) => {
        this.observe(newValue)
        if(newValue !== value) {
          value = newValue
        }
        dep.notify()
      }
    })
  }
}