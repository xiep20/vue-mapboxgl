const tooBar = {
  state: {
    treeDiv: false,
  },
  mutations: {
    setTreeDiv(state, va) {
      state.treeDiv = va;
    },
  },
  getters: {
    getTreeDiv(state, getters, rootState) {
      return state.treeDiv;
    },
  }
}
export default tooBar;
