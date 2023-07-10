import Dep from '../dep/dep.js'

export default class Watcher {
  constructor(vm,expr,cb) {
    this.vm = vm
    this.expr = expr
    this.cb = cb
    this.oldVal = this.getOldVal()
  }
  getOldVal(){
    Dep.target = this
    const oldVal = this.getValue(this.expr,this.vm)
    Dep.target = null
    return oldVal
  }
  update() {
    const newVal = this.getValue(this.expr,this.vm)
    if(newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
  getValue(expr, vm) {
    return expr.split(".").reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  }
}