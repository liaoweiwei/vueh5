const app = {
    state: {
      appName: ""
    },
    mutations: {
      SET_APP_NAME: (state, appName) => {
        state.appName = appName
      }
    },
    actions: {
        ToggleAppName({ commit }, name) {
            commit('SET_APP_NAME', name)
        }
    }
  }
  
  export default app