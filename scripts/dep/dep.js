export default class Dep {
  constructor() {
    this.subs = []
  }
// 收集观察者
  addSub(watcher) {
    this.subs.push(watcher)
  }
  // 通知观察者更新
  notify() {
    this.subs.forEach(w=>w.update())
  }
}