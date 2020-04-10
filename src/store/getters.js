const getters = {
  loginDialogVisible: state => state.app.loginDialogVisible,
  user_id: state => state.user.user_id,
  nick_name: state => state.user.nick_name,
  head_portrait: state => state.user.head_portrait,
  user_phone: state => state.user.user_phone,
  isAuthenticate: state => state.user.isAuthenticate
}

export default getters
