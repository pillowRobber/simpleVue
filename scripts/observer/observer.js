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
    Object.defineProperty(data,key,{
      enumerable:true,
      configurable: false,
      get() {
        return value
      },
      set:(newValue) => {
        this.observe(newValue)
        if(newValue !== value) {
          value = newValue
        }
      }
    })
  }
}