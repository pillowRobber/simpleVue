import compileUtil from "./compileUtil.js";

export default class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    //1. 获取文档碎片对象 放到内存中减少回流和重绘
    const fragment = this.node2Fragment(this.el);
    //2. 编译模板
    this.compile(fragment);
    //3. 将子元素添加到根节点
    this.el.appendChild(fragment);
  }
  // 是否是节点对象
  isElementNode(node) {
    return node.nodeType === 1;
  }

  // 获取文档对象
  node2Fragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.appendChild(firstChild);
    }
    return f;
  }

  compile(fragment) {
    const childnodes = fragment.childNodes;
    [...childnodes].forEach((child) => {
      if (this.isElementNode(child)) {
        // 编译元素节点
        this.compileElement(child)
      } else {
        // 编译文本节点
        this.compileText(child)
      }
      if(child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    });
  }

  // 编译元素节点
  compileElement(node) {
     const attributes = node.attributes;
     [...attributes].forEach((attr)=> {
      const {name,value} = attr;
      if(this.isDirective(name)) { // 指令 v-text v-on:click
        const [,directive] = name.split('-'); // text on:click
        const [dirName,eventName] = directive.split(':')
        // 更新数据 数据驱动视图
        compileUtil[dirName](node,value,this.vm,eventName)
        // 删除有指令的标签上的属性
        node.removeAttribute('v-'+directive)
      } else if(this.isEventName(name)) { // @click
        const [,eventName] = name.split('@')
        compileUtil['on'](node,value,this.vm,eventName)
      }
     })
  }
  // 编译文本节点
  compileText(node) {
    const content  = node.textContent
    if(/\{\{(.+?)\}\}/.test(content)){
      compileUtil['text'](node,content,this.vm)
    }
  }
  // 是否模板指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 是否事件
  isEventName(attrName) {
    return attrName.startsWith('@')
  }
}