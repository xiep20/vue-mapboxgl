<template>
  <div class="MapIndex">
    <div class="page_0">
      <span>——————海南城市11.3统计</span>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>

    <div class="page_1">
      <sm-border type="border8" class="common-border cb_1">
        <div class="card_tit">低保人口</div>
        <sm-chart icon-class="" :options="chartsOptions1"></sm-chart>
      </sm-border>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "mapindex",
  computed: {
    ...mapGetters(["getMapEchartsOptions"]),
  },
  components: {},
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
            {
              id: "geojsonid",
              type: "fill-extrusion",
              source: "citypolygon",
              paint: {
                "fill-extrusion-color": "#5CB2D1",
                "fill-extrusion-height": 5000,
                "fill-extrusion-base": 0,
                "fill-extrusion-opacity": 0.8,
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
      info: null,
      echartsOptions: {},
      chartsOptions1: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        textStyle: {
          color: "#8597c1",
        },
        grid: {
          left: "3%",
          top: "6%",
          right: "3%",
          bottom: "0%",
          containLabel: true,
        },

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
            axisLine: {
              show: false, //x轴的线
              lineStyle: {
                color: ["#7bd6c763"],
              },
            },

            // 控制网格线是否显示
            splitLine: {
              show: false,
              lineStyle: {
                // 使用深浅的间隔色
                color: ["#fff"],
              },
            },
            //除去x轴刻度
            axisTick: {
              show: false,
            },
            axisLabel: {
              //控制x轴文本
              show: true,
              textStyle: {
                color: "#8597c1",
              },
              interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            min: 40,
            max: 80,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#7bd6c763",
              },
            },
            splitArea: { show: false }, //保留网格区域
            axisLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: "#2a3751",
                width: "0",
              },
            },
          },
        ],
        series: [],
      },
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
      this.getinfo();
    },
    getinfo() {
      var _this = this;
      _this.$http.get("data/1103.json").then((data) => {
        _this.info = data;
        this.mapm(0);
        this.getoptions1();
      });
    },
    mapm(nowXH) {
      var xh = 0;
      var cityname = [];
      var poplist = [];
      for (var d1 in this.info["人口"]) {
        poplist.push([]);
        for (var d2 in this.info["人口"][d1]) {
          if (xh === 0) {
            cityname.push(d2);
          }
          poplist[xh].push(this.info["人口"][d1][d2]);
        }
        xh++;
      }

      var minnum = 10000000000000000000000;
      var maxnum = -10000000000000000000000;
      for (var i = 0; i < poplist[nowXH].length; i++) {
        var value = Number(poplist[nowXH][i]);
        if (value < minnum) {
          minnum = value;
        }
        if (value > maxnum) {
          maxnum = value;
        }
      }
      var color = [
        "#ccffff",
        "#aaddff",
        "#88bbff",
        "#6699ff",
        "#4477ff",
        "#2255ff",
        "#0033ff",
      ];
      var sf = (maxnum - minnum) / 6;
      var fc = ["match", ["get", "name"]];
      var fh = ["match", ["get", "name"]];
      for (var a = 0; a < poplist[nowXH].length; a++) {
        fc.push(cityname[a]);
        fc.push(color[Math.floor((Number(poplist[nowXH][a]) - minnum) / sf)]);
        fh.push(cityname[a]);
        fh.push(
          Math.floor((Number(poplist[nowXH][a]) - minnum) / sf) * 2000 + 2000
        );
      }
      fc.push("#bebebe");
      fh.push(500);

      window.map.setPaintProperty("geojsonid", "fill-extrusion-color", fc);
      window.map.setPaintProperty("geojsonid", "fill-extrusion-height", fh);
    },
    // cs
    getoptions1() {
      var xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        yData = [61, 76, 66, 53, 59, 73, 73];
      this.chartsOptions1.xAxis[0].data = xData;
      this.chartsOptions1.series = [
        {
          type: "line",
          color: "#FFD700",
          smooth: true,
          lineStyle: {
            normal: {
              width: 1,
            },
          },
          areaStyle: {
            normal: {
              color: "rgba(255, 215, 0, 0.3)",
              // color:  new echarts.graphic.LinearGradient(
              //   0,
              //   0,
              //   0,
              //   1,
              //   [
              //     {
              //       offset: 0,
              //       color: "rgba(255, 215, 0, 0.3)",
              //     },
              //     {
              //       offset: 1,
              //       color: "rgba(255, 215, 0, 0)",
              //     },
              //   ],
              //   false
              // ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 5,
            },
          },
          data: yData,
          markPoint: {
            data: [
              {
                type: "min",
                name: "最小值",
                symbolSize: 25,
                label: {
                  formatter: "低",
                  color: "#000",
                },
                itemStyle: {
                  color: "#96f392",
                },
              },
              {
                coord: ["周五", 59],
                symbolSize: 50,
                label: {
                  formatter: "周五\n狂欢",
                  color: "#fff",
                  fontSize: 10,
                },
                itemStyle: {
                  color: "rgb(194,53,49)",
                },
              },
            ],
          },
          markLine: {
            data: [
              [
                {
                  name: "",
                  coord: ["周五", 40],
                  lineStyle: {
                    color: "rgb(194,53,49)",
                    width: 2,
                    curveness: 0.3,
                    type: "dotted",
                  },
                  symbol: "none",
                },
                {
                  coord: ["周五", 57],
                  symbol: "none",
                },
              ],
            ],
          },
        },
      ];
      this.chartsOptions1.graphic = [
        {
          type: "text",
          left: "center",
          top: "1%",
          style: {
            fill: "#fff",
            text: "空气质量\n\n工作日 优于 休息日",
            textAlign: "center",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
        },
        {
          type: "text",
          left: "20%",
          top: "40%",
          style: {
            fill: "#fff",
            text: "工作\n\n汽车需求正常\n",
            textAlign: "center",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
        },
        {
          type: "text",
          left: "75%",
          top: "40%",
          style: {
            fill: "#fff",
            text: "周末游玩\n\n汽车需求量大\n\n尾气排放增加",
            textAlign: "center",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
        },
      ];
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

.page_1 {
  width: 30%;
  height: calc(100% - 50px);
  float: left;
  position: absolute;
  top: 50px;
  left: 0;
}
.cb_1 {
  width: 100%;
  height: calc(30% - 2px);
  float: left;
}
</style>
