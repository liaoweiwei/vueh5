import {
  getUserId,
  setUserId,
  removeUserId,
  getIsAuthenticate,
  setIsAuthenticate,
  removeIsAuthenticate
} from '@/utils/auth'

const user = {
  state: {
    user_id: getUserId() || 0,
    isAuthenticate: getIsAuthenticate() || 0,
  },
  mutations: {
    SET_USERID: (state, data) => {
      state.user_id = data
    },
    SET_ISAUTHENTICATE: (state, data) => {
      state.isAuthenticate = data
    }
  },
  actions: {
    GET_USERID({ commit }, data) {
      setUserId(data)
      commit('SET_USERID', data)
    },
    GET_ISAUTHENTICATE({ commit }) {
      setIsAuthenticate(1)
      commit('SET_ISAUTHENTICATE', 1)
    },
    // 退出登录
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_USERID', 0)
        removeUserId()
        commit('SET_ISAUTHENTICATE', 0)
        removeIsAuthenticate()
        resolve()
      })
    }
  }
}

export default user
