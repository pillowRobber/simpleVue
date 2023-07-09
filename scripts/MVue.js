import Compile from "./compile/compile.js";
import Observer from "./observer/observer.js";

export default class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      new Observer(this.$data)
      new Compile(this.$el, this);
    }
  }
}
