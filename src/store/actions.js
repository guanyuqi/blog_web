const actions = {
  loginDialog(context, payload) {
    context.commit('loginDialog', payload)
  },
  setUserInfo(context, payload) {
    context.commit('setUserInfo', payload)
    localStorage.setItem('userInfo', JSON.stringify(payload))
  },
  setLogin(context, payload) {
    context.commit('setLogin', payload)
    localStorage.setItem('isLogin', payload)
  }
}

export default actions
