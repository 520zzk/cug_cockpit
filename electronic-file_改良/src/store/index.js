
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
  state: { // 所有的状态
    count: 100,
    data61: [],
    data62: [],
    data63: [],
    data64: [],
    allDevice: 0
  },
  getters: {
    // 类似计算属性
    // filterCount (state) { // 方法接受一个state
    //   return state.count >= 120 ? 120 : state.count
    // }
  },
  mutations: {
    // 唯一修改的事件回调函数,要修改必须在这里
    // 同步操作，     异步操作放在Actions
    // addCount (state, obj) { // state 就是保存所有状态的 见上面
    //   state.count += obj.n
    // },
    // deCount (state, obj) {
    //   state.count -= obj.de
    // }
    changeData (state, obj) {
      if (obj.flag == 62) {
        state.data62 = obj.data
      }
      if (obj.flag == 63) {
        state.data63 = obj.data
      }
      if (obj.flag == 64) {
        state.data64 = obj.data
      }
    }
  },
  actions: {
    // addAction (context) {
    //   setTimeout(() => {
    //     // 改变提交状态，提交一个mutations
    //     context.commit('addCount', { n: 5 })
    //     // //context中含有很多方法，
    //     // 也可以用结构赋值，直接拿出
    //     // addAction({commit})  ---> commit('addCount',{n:  5})
    //   }, 1000)
    // }
    changeData (context, obj) {
      setTimeout(() => {
        context.commit('changeData', obj)
      }, 1500)
    }
  }
})

export default store
