import justScroll from './just-scroll.vue' // 导入组件
const JustScroll = {
  install(Vue, options) {
    Vue.component(justScroll.name, justScroll) // justScroll.name 组件的name属性
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(JustScroll);
}
export default JustScroll // 导出..
