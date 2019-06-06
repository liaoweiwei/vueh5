import { login } from '@/api/login'
import { getToken, setToken, getTokenType, setTokenType, setUser, getUser, setPassword, getPassword } from '@/utils/auth'

const user = {
  state: {
    userName: '用户1'
  },
  mutations: {
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    }
  },
  actions: {
    ToggleUserName({ commit }, name) {
        commit('SET_USER_NAME', name)
    }
  }
}

export default user