<template>
  <div class="MapIndex">
    <div class="page_0">
      <div class="header-cen">
        <h1>海南城市可视化分析</h1>
      </div>
      <headermenu Isactive="1"></headermenu>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
      <!-- <sm-animate-marker-layer
        :features="pointFeatures"
        type="rotatingTextBorder"
        text-field="name"
        :colors="['rgb(21, 209, 242)', 'rgba(21, 209, 242, 0.56)']"
        :width="150"
      ></sm-animate-marker-layer> -->
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
import headermenu from "./../components/headermenu";
export default {
  name: "mapindex",
  computed: {
    ...mapGetters(["getMapEchartsOptions"]),
  },
  components: { cslayer, rightEcharts, timelist, headermenu },
  data() {
    return {
      mapOptions: {
        container: "map", // container id
        style: {
          version: 8,
          sources: {
            citypolygon: {
              type: "geojson",
              data: "data/hainan.json",
            },
            citypoint: {
              type: "geojson",
              data: "data/hainan_point.json",
            },
          },
          layers: [
            {
              id: "geojsonid",
              type: "fill",
              source: "citypolygon",
              paint: {
                "fill-opacity": 0.8,
                "fill-color": "#0D1F49",
                "fill-translate": [0, 0],
                "fill-antialias": true,
                "fill-outline-color": "#3fb1e3",
                "fill-translate-anchor": "map",
              },
              layout: {
                visibility: "visible",
              },
            },
            {
              id: "citypointtext",
              type: "symbol",
              source: "citypoint",
              layout: {
                "text-field": "{name}",
                "text-size": 13,
              },
              paint: {
                "text-color": "#ffffff",
                "text-halo-blur": 0,
                "text-halo-color": "#3fb1e3",
                "text-halo-width": 2,
              },
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
      pointFeatures: {},
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
      this.mapm();
    },
    mapm() {
      // var _this = this;
      // _this.$http.get("data/hainan_point.json").then((data) => {
      //   _this.pointFeatures = data;
      // });

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
  height: 75px;
  background: #0d1f49;
  font-size: 24px;
  padding: 0 20px;
}
.page_0 .header-cen {
  margin-left: 30%;
  width: 30%;
  background: url(../images/b.png) no-repeat center top;
  height: 1rem;
  background-size: 100% 100%;
  text-align: center;
  line-height: 1rem;
  height: 75px;
}
.page_0 h1 {
  font-size: 27pt;
  color: #ffffff;
  letter-spacing: 0.1rem;
  text-shadow: 0 0 0.3rem #00d8ff;
  padding-left: 0.15rem;
  padding-top: 24px;
}
.mapCon {
  width: 40%;
  left: 30%;
  height: calc(100% - 75px);
}
</style>
