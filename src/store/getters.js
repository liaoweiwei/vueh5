const getters = {
  login_visible: state => state.app.login_visible,
  user_id: state => state.user.user_id,
  isAuthenticate: state => state.user.isAuthenticate
}

export default getters
