/* import state from './state' */

const mutations = {
  loginDialog(state, payload) {
    state.loginDialogFlg = payload
  },
  setLogin(state, payload) {
    state.isLogin = payload
  },
  setUserInfo(state, payload) {
    state.userInfo = payload
  }
}

export default mutations
