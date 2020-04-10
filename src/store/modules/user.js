import {
  getUserId,
  setUserId,
  removeUserId,
  getNickName,
  setNickName,
  removeNickName,
  getUserPhone,
  setUserPhone,
  removeUserPhone,
  getHeadPortrait,
  setHeadPortrait,
  removeHeadPortrait,
  getIsAuthenticate,
  setIsAuthenticate,
  removeIsAuthenticate
} from '@/utils/auth'

const user = {
  state: {
    user_id: getUserId() || 0,
    nick_name: getNickName() || '',
    head_portrait: getHeadPortrait() || '',
    user_phone: getUserPhone() || '',
    isAuthenticate: getIsAuthenticate() || 0,
    user_info: null
  },
  mutations: {
    SET_USERID: (state, data) => {
      state.user_id = data
    },
    SET_NICKNAME: (state, data) => {
      state.nick_name = data
    },
    SET_HEADPORTRAIT: (state, data) => {
      state.head_portrait = data
    },
    SET_USERPHONE: (state, data) => {
      state.user_phone = data
    },
    SET_ISAUTHENTICATE: (state, data) => {
      state.isAuthenticate = data
    },
    SET_USERINFO: (state, data) => {
      state.user_info = data
    }
  },
  actions: {
    GET_USERID({ commit }, data) {
      setUserId(data)
      commit('SET_USERID', data)
    },
    GET_NICKNAME({ commit }, data) {
      setNickName(data)
      commit('SET_NICKNAME', data)
    },
    GET_HEADPORTRAIT({ commit }, data) {
      setHeadPortrait(data)
      commit('SET_HEADPORTRAIT', data)
    },
    GET_USERPHONE({ commit }, data) {
      setUserPhone(data)
      commit('SET_USERPHONE', data)
    },
    GET_ISAUTHENTICATE({ commit }) {
      setIsAuthenticate(1)
      commit('SET_ISAUTHENTICATE', 1)
    },
    // 退出登录
    removeLogin({ commit }) {
      return new Promise((resolve) => {
        commit('SET_USERID', 0)
        removeUserId()
        commit('SET_NICKNAME', '')
        removeNickName()
        commit('SET_HEADPORTRAIT', '')
        removeUserPhone()
        commit('SET_USERPHONE', '')
        removeHeadPortrait()
        commit('SET_ISAUTHENTICATE', 0)
        removeIsAuthenticate()
        resolve()
      })
    }
  }
}

export default user
