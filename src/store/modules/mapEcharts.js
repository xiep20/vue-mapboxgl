const mapEcharts = {
  state: {
    mapEchartsOptions: {},
  },
  mutations: {
    setMapEchartsOptions(state, va) {
      state.mapEchartsOptions = va;
    },
  },
  getters: {
    getMapEchartsOptions(state) {
      return state.mapEchartsOptions;
    },
  }
}
export default mapEcharts;
