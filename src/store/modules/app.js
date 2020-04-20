
const app = {
  state: {
    login_visible: false
  },
  mutations: {
    login_visible: (state) => {
      state.login_visible = !state.login_visible
    }
  }
}

export default app