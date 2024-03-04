import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
  },
  getters: {
    getToken: state => state.token
  },
  mutations: {
    LOGIN(state,data){
      state.token = data;
      sessionStorage.setItem("Token", data)
    }
  },
  modules: {
  }
})
