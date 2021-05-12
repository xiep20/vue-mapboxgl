<template>
  <div class="MapIndex">
    <div class="page_0">
      <span>——————海南城市11.3统计</span>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>

    <sm-text
      class="showyaertext"
      :title="p1selyaer + '年'"
      textColor="#73dee8"
      :fontStyle="{
        fontSize: '24px',
        lineHeight: '20px',
        fontWeight: '700',
        textAlign: 'center',
      }"
    >
    </sm-text>

    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">{{ p1selyaer }} 年 — 人口</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions1"
          style="height: 80%"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_2">
        <div class="card_tit">{{ p1selyaer }} 年 — 城镇面积</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions2"
          style="height: 80%"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">{{ p1selcity }}</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions3"
          style="height: 80%"
        ></sm-chart>
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
            img_w: {
              type: "raster",
              tiles: [
                "https://t5.tianditu.gov.cn/DataServer?T=img_w&tk=1d109683f4d84198e37a38c442d68311&x={x}&y={y}&l={z}",
              ],
              tileSize: 256,
            },
            cia_w: {
              type: "raster",
              tiles: [
                "https://t5.tianditu.gov.cn/DataServer?T=cia_w&tk=1d109683f4d84198e37a38c442d68311&x={x}&y={y}&l={z}",
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
              id: "img_w",
              type: "raster",
              source: "img_w",
              "source-layer": "img_w",
            },
            {
              id: "cia_w",
              type: "raster",
              source: "cia_w",
              "source-layer": "cia_w",
            },
            {
              id: "geojsonid",
              type: "fill-extrusion",
              source: "citypolygon",
              paint: {
                "fill-extrusion-color": "#3fb1e3",
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
        // dataZoom: [
        //   {
        //     type: "inside",
        //     start: 0,
        //     end: 30,
        //   },
        //   {
        //     start: 0,
        //     end: 30,
        //   },
        // ],
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
              // interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // min: 40,
            // max: 80,
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
      chartsOptions2: {
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
        // dataZoom: [
        //   {
        //     type: "inside",
        //     start: 0,
        //     end: 30,
        //   },
        //   {
        //     start: 0,
        //     end: 30,
        //   },
        // ],
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
              // interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // min: 40,
            // max: 80,
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
      chartsOptions3: {
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
          top: "10%",
          right: "10%",
          bottom: "0%",
          containLabel: true,
        },
        // dataZoom: [
        //   {
        //     type: "inside",
        //     start: 0,
        //     end: 30,
        //   },
        //   {
        //     start: 0,
        //     end: 30,
        //   },
        // ],
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
              // interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // min: 40,
            // max: 80,
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
      p1selyaer: "",
      p1selcity: "",
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
        _this.changeYear();
      });
    },
    // 切换年份
    changeYear() {
      var _this = this;
      _this.mapm(0);
      _this.getoptions1(0);
      _this.getoptions2(0);
      _this.getoptions3(0);
      var ynum = 1;
      var cnum = 1;
      setInterval(() => {
        if (ynum == 4) {
          ynum = 0;
        }
        if (cnum === 18) {
          cnum = 0;
        }
        _this.mapm(ynum);
        _this.getoptions1(ynum);
        _this.getoptions2(ynum);
        _this.getoptions3(cnum);
        ynum++;
        cnum++;
      }, 5000);
    },
    // 人口map
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
    // 人口echarts
    getoptions1(nowXH) {
      var xh = 0;
      var cityname = [];
      var poplist = [];
      for (var d1 in this.info["人口"]) {
        if (nowXH === xh) {
          this.p1selyaer = d1;
        }
        poplist.push([]);
        for (var d2 in this.info["人口"][d1]) {
          if (xh === 0) {
            cityname.push(d2);
          }
          poplist[xh].push(this.info["人口"][d1][d2]);
        }
        xh++;
      }

      var xData = cityname,
        yData = poplist[nowXH];
      this.chartsOptions1.xAxis[0].data = xData;
      this.chartsOptions1.series = [
        {
          type: "bar",
          color: "#FFD700",
          smooth: true,
          lineStyle: {
            normal: {
              width: 1,
            },
          },
          areaStyle: {
            normal: {
              // color: "rgba(255, 215, 0, 0.3)",
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255, 215, 0, 0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 215, 0, 0)",
                  },
                ],
                false
              ),
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
                symbolSize: 50,
                label: {
                  formatter: "低",
                  color: "#000",
                },
                itemStyle: {
                  color: "#96f392",
                  fontSize: 16,
                },
              },
              {
                coord: ["海口市", yData[0]],
                symbolSize: 50,
                label: {
                  formatter: "海口市",
                  color: "#fff",
                  fontSize: 14,
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
                  coord: ["海口市", 0],
                  lineStyle: {
                    color: "rgb(194,53,49)",
                    width: 2,
                    curveness: 0.3,
                    type: "dotted",
                  },
                  symbol: "none",
                },
                {
                  coord: ["海口市", yData[0]],
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
            text: "人口\n\n海口市 远优于 其它",
            textAlign: "center",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
        },
      ];
    },
    // 建成区面积echarts
    getoptions2(nowXH) {
      var xh = 0;
      var cityname = [];
      var poplist = [];
      for (var d1 in this.info["面积"]) {
        if (nowXH === xh) {
          this.p1selyaer = d1;
        }
        poplist.push([]);
        for (var d2 in this.info["面积"][d1]) {
          if (xh === 0) {
            cityname.push(d2);
          }
          poplist[xh].push(this.info["面积"][d1][d2]);
        }
        xh++;
      }

      var xData = cityname,
        yData = poplist[nowXH];
      this.chartsOptions2.xAxis[0].data = xData;
      this.chartsOptions2.series = [
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
              // color: "rgba(255, 215, 0, 0.3)",
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255, 215, 0, 0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 215, 0, 0)",
                  },
                ],
                false
              ),
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
                coord: ["海口市", yData[7]],
                symbolSize: 50,
                label: {
                  formatter: "海口市",
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
                  coord: ["海口市", 0],
                  lineStyle: {
                    color: "rgb(194,53,49)",
                    width: 2,
                    curveness: 0.3,
                    type: "dotted",
                  },
                  symbol: "none",
                },
                {
                  coord: ["海口市", yData[7]],
                  symbol: "none",
                },
              ],
            ],
          },
        },
      ];
      this.chartsOptions2.graphic = [
        {
          type: "text",
          left: "70%",
          top: "1%",
          style: {
            fill: "#fff",
            text: "城镇面积\n\n海口市 最大\n\n各地随年提升",
            textAlign: "center",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
        },
      ];
    },
    // 人口echarts
    getoptions3(nowXH) {
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in this.info["人口"]) {
        yearlist.push(d1);
        var xh2 = 0;
        for (var d2 in this.info["人口"][d1]) {
          if (xh === 0) {
            cityname.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(this.info["人口"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      this.p1selcity = cityname[nowXH];
      var xData = yearlist,
        yData = poplist[nowXH];
      this.chartsOptions3.xAxis[0].data = xData;
      this.chartsOptions3.series = [
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
              // color: "rgba(255, 215, 0, 0.3)",
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255, 215, 0, 0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255, 215, 0, 0)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 5,
            },
          },
          data: yData,
          markPoint: {
            data: [
              {
                type: "min",
                symbol: "roundRect",
                name: "最小值",
                symbolSize: [80, 20],
                label: {
                  formatter: "{c}",
                  color: "#fff",
                },
                itemStyle: {
                  color: "#008000",
                },
              },
              {
                type: "max",
                symbol: "roundRect",
                name: "最大值",
                symbolSize: [80, 20],
                label: {
                  formatter: "{c}",
                  color: "#fff",
                },
                itemStyle: {
                  color: "#ff0000",
                },
              },
            ],
          },
        },
      ];
      this.chartsOptions3.graphic = [
        {
          type: "text",
          left: "70%",
          top: "1%",
          style: {
            fill: "#FFEB3B",
            text: "每5年人口变化",
            textAlign: "center",
            fontSize: 18,
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
  height: calc(99% - 50px);
  float: left;
  position: absolute;
  top: calc(50px + 1%);
  left: 0;
}
.cb_1 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}
.cb_2 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}
.cb_3 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}

.card_tit {
  background: url(../images/ksh33.png) no-repeat;
  color: #73dee8;
  /* width: 100%; */
  height: 33px;
  padding: 0 10px;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
  background-size: 100% 100%;
}
.card_tit span {
  display: inline-block;
  color: #ffffff;

  position: absolute;
  top: -0.3rem;
}
.showyaertext {
  position: absolute;
  top: calc(50px + 2%);
  left: 31%;
}
</style>
