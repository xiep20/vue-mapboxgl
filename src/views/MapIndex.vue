<template>
  <div class="MapIndex">
    <div class="page_0">
      <span>——————海南城市****分析</span>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
      <sm-geojson-layer
        layerId="geojsonid"
        :layer-style="fillstyle"
        :data="geojsonurl"
      ></sm-geojson-layer>
      <!-- <sm-echarts-layer :options="echartsOptions"></sm-echarts-layer> -->
    </sm-web-map>
    <cslayer></cslayer>
    <rightEcharts></rightEcharts>
    <timelist></timelist>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import cslayer from "./../components/csLayer/cslayer";
import rightEcharts from "./../components/csLayer/rightEcharts";
import timelist from "./../components/csLayer/timelist";
export default {
  name: "mapindex",
  computed: {
    ...mapGetters(["getMapEchartsOptions"]),
  },
  components: { cslayer, rightEcharts, timelist },
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
        interactive: false,
        // scrollZoom: false,
        // boxZoom: false,
        // dragRotate: false,
        // dragPan: false,
        // keyboard: false,
        // doubleClickZoom: false,
        center: [109.90008172422631, 19.26709562862932], // starting position
        pitch: 40,
        zoom: 8, // starting zoom
      },
      geojsonurl: "data/hainan.json",
      fillstyle: new this.VueiClient.commontypes.FillStyle(
        {
          "fill-opacity": 0.8,
          "fill-color": "#3fb1e3",
          "fill-translate": [0, 0],
          "fill-antialias": true,
          "fill-outline-color": "#3fb1e3",
          "fill-translate-anchor": "map",
        },
        {
          visibility: "visible",
        }
      ),

      echartsOptions: {},
    };
  },
  props: {},
  watch: {
    getNowMenuName(newV) {
      this.echartsOptions = newV;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setMapEchartsOptions: "setMapEchartsOptions",
    }),
    mapload(map) {
      window.map = map.map;
      window.map.addLayer({
        id: "pointlayerhighlight",
        type: "fill-extrusion",
        source: {
          type: "geojson",
          data: "data/hainan.json",
        },
        layout: {},
        paint: {
          // "line-color": "#91ddff",
          // "fill-color": "#ff0000",
          // "fill-opacity": 0.6,
          "fill-extrusion-color": "#5CB2D1",
          "fill-extrusion-height": 5000,
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.8,
        },
        filter: ["in", "name", ""],
      });
      // window.map.addLayer({
      //   id: "maine",
      //   type: "fill",
      //   source: {
      //     type: "geojson",
      //     data: "data/hainan.json",
      //   },
      //   layout: {},
      //   paint: {
      //     "fill-color": ["get", "color"],
      //     "fill-opacity": 0.8,
      //   },
      // });
      this.mapm();
    },
    mapm() {
      window.map.on("click", "geojsonid", function (e) {
        var feature = e.features[0];
        window.map.setFilter("pointlayerhighlight", [
          "in",
          "name",
          feature.properties.name,
        ]);
      });
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

.page_0 {
  width: 100%;
  height: 50px;
  background: #38757b;
  font-size: 24px;
  padding: 0 20px;
}
.mapCon {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
