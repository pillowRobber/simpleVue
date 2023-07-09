import Compile from "./compile/compile.js";

export default class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;
    if (this.$el) {
      new Compile(this.$el, this);
    }
  }
}
