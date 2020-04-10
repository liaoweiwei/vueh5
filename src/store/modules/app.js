
const app = {
  state: {
    loginDialogVisible: false
  },
  mutations: {
    loginDialogVisible: (state, data) => {
      state.loginDialogVisible = data
    }
  }
}

export default app