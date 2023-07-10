import Watcher from '../watcher/watcher.js'

const compileUtil = {
  text(node, expr, vm) {
    let value;
    if (expr.indexOf("{{") !== -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        new Watcher(vm,args[1],(newVal)=> {
          this.updater.textUpdater(node,this.getContentVal(expr,vm))
        })
        return this.getValue(args[1], vm);
      });
    } else {
      value = this.getValue(expr, vm);
    }

    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getValue(expr, vm);
    new Watcher(vm,expr,(newVal)=> {
      this.updater.htmlUpdater(node,newVal)
    })
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm);
    new Watcher(vm,expr,(newVal)=> {
      this.updater.modelUpdater(node,newVal)
    })
    this.updater.modelUpdater(node, value);
  },
  on(node, expr, vm, eventName) {
    let fn = vm.$options.methods && vm.$options.methods[expr];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
  getValue(expr, vm) {
    return expr.split(".").reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data);
  },
  getContentVal(expr,vm) {
    return expr.replace(/\{\{(.+?)\}\}/g,(...args) => {
      return this.getValue(args[1],vm)
    })
  }
};

export default compileUtil
