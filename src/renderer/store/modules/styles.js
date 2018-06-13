import * as types from '../mutation-types'

const state = {
  fullHeight: window.document.body.clientHeight + 'px',
  fullWidth: window.document.body.clientWidth + 'px',
  contentWarpHeight: window.document.body.clientHeight - 150 + 'px'
}

const mutations = {
  [types.WINDOW_ON_RESIZE] (state) {
    state.fullHeight = window.document.body.clientHeight + 'px'
    state.fullWidth = window.document.body.clientWidth + 'px'
    state.contentWarpHeight = window.document.body.clientHeight - 150 + 'px'
  }
}

export default {
  state,
  mutations
}
