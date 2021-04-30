<template>
  <div class="MapIndex">
    <sm-web-map :map-options="mapOptions" @load="mapload">
      <sm-echarts-layer :options="echartsOptions"></sm-echarts-layer>
    </sm-web-map>
    <!-- <cslayer></cslayer> -->
  </div>
</template>

<script>
// import cslayer from "./csLayer/cslayer";
export default {
  name: "mapindex",
  // components: { cslayer },
  data() {
    return {
      mapOptions: {
        container: "map", // container id
        style: {
          version: 8,
          sources: {
            vec_w: {
              type: "raster",
              tiles: [
                "https://t5.tianditu.gov.cn/DataServer?T=vec_w&tk=1d109683f4d84198e37a38c442d68311&x={x}&y={y}&l={z}",
              ],
              tileSize: 256,
            },
            cva_w: {
              type: "raster",
              tiles: [
                "https://t5.tianditu.gov.cn/DataServer?T=cva_w&tk=1d109683f4d84198e37a38c442d68311&x={x}&y={y}&l={z}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "vec_w",
              type: "raster",
              source: "vec_w",
              "source-layer": "vec_w",
            },
            {
              id: "cva_w",
              type: "raster",
              source: "cva_w",
              "source-layer": "cva_w",
            },
          ],
        },
        center: [109.90008172422631, 19.26709562862932], // starting position
        zoom: 8, // starting zoom
      },
    };
  },
  props: {},
  mounted() {},
  methods: {
    mapload(map) {
      window.map = map.map;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.MapIndex {
  width: 100%;
  height: 100%;
}
</style>
