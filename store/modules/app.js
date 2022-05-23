
const app = {
  state: {
    // 当前终端平台
    platform: ''
  },

  mutations: {
    SET_PLATFORM: (state, value) => {
      state.platform = value
    }
  },
}

export default app
