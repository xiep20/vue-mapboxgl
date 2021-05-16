<template>
  <div class="MapIndex">
    <div class="page_0">
      <div class="header-cen">
        <h1>海南城市可视化分析</h1>
      </div>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>

    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">{{  }} 空气</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions1"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_2">
        <div class="card_tit">{{ p1selyaer }} 年 — 城镇面积</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions2"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">{{ p1selcity }}</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions3"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit"></div>
        <sm-chart
          icon-class=""
          :options="echartsOptions4"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_5">
        <div class="card_tit">PGR</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions5"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_6">
        <div class="card_tit">LCRPGR</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions6"
          class="smchart"
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
      echartsOptions1: {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            data: [],
          },
          title: {
            subtext: "",
          },
          tooltip: {},
          legend: {
            left: "right",
            data: [],
          },
          calculable: true,
          grid: {
            top: 60,
            bottom: 60,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.value.replace("\n", "");
                  },
                },
              },
            },
          },
          xAxis: [
            {
              type: "category",
              axisLabel: { rotate: 0 },
              data: [],
              splitLine: { show: false },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "值",
            },
          ],
          series: [],
        },
        options: [],
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
      echartsOptions4: {
        backgroundColor: "#333",
        legend: {
          bottom: 10,
          data: [],
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
        },
        tooltip: {
          padding: 10,
          backgroundColor: "#222",
          borderColor: "#777",
          borderWidth: 1,
        },
        parallelAxis: [],
        parallel: {
          left: "8%",
          right: "15%",
          bottom: 50,
          parallelAxisDefault: {
            type: "value",
            name: "指数",
            nameLocation: "end",
            nameGap: 20,
            nameTextStyle: {
              color: "#fff",
              fontSize: 12,
            },
            axisLine: {
              lineStyle: {
                color: "#aaa",
              },
            },
            axisTick: {
              lineStyle: {
                color: "#777",
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
            },
          },
        },
        series: [],
      },
      echartsOptions5: {
        title: {
          text: "PGR",
          subtext: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [],
        },
        grid: {
          left: "10%",
          top: "10%",
          right: "8%",
          bottom: "0%",
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 30,
            filterMode: "filter",
          },
          {
            start: 0,
            end: 30,
            filterMode: "filter",
          },
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
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
              rotate: 10,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
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
      echartsOptions6: {
        legend: {
          data: [],
        },
        tooltip: {},
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 30,
            filterMode: "filter",
          },
          {
            start: 0,
            end: 60,
            filterMode: "filter",
          },
        ],
        xAxis: {
          data: [],
          name: "城市",
          // axisLine: { onZero: true },
          splitLine: { show: false },
          // splitArea: { show: false },
          axisLabel: {
            rotate: 0,
          },
        },
        yAxis: {},
        grid: {
          bottom: 10,
        },
        series: [],
        animationEasing: "elasticOut",
        animationDelayUpdate: function (idx) {
          return idx * 5;
        },
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
      _this.$http.get("data/1106.json").then((data) => {
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
      _this.getoptions4();
      _this.getoptions5();
      _this.getoptions6();
      _this.getoptions7();
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
        _this.getoptions2(ynum);
        _this.getoptions3(cnum);
        ynum++;
        cnum++;
      }, 5000);
    },
    // PM2.5空气map
    mapm(nowXH) {
      var xh = 0;
      var cityname = [];
      var poplist = [];
      for (var d1 in this.info["PM2.5"]) {
        poplist.push([]);
        for (var d2 in this.info["PM2.5"][d1]) {
          if (xh === 0) {
            cityname.push(d2);
          }
          poplist[xh].push(this.info["PM2.5"][d1][d2]);
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
    getoptions1() {
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["PM2.5"]) {
        yearlist.push(d1);
        data.push({
          title: { text: "值" },
          series: [{ data: [] }, { data: [] }, { data: [] }],
        });
        for (var d2 in this.info["PM2.5"][d1]) {
          if (yearlist.length === 1) {
            citylist.push([d2]);
          }
          data[yearlist.length - 1].series[0].data.push(
            this.info["PM2.5"][d1][d2]
          );
          data[yearlist.length - 1].series[0].data.push(
            this.info["SO2"][d1][d2]
          );
          data[yearlist.length - 1].series[0].data.push(
            this.info["PM10"][d1][d2]
          );
        }
      }

      this.echartsOptions7.baseOption.timeline.data = yearlist;
      this.echartsOptions7.baseOption.legend.data = ["PM2.5", "SO2", "PM10"];
      this.echartsOptions7.baseOption.xAxis[0].data = citylist;
      this.echartsOptions7.baseOption.series = [
        { name: "PM2.5", type: "bar" },
        { name: "SO2", type: "bar" },
        { name: "PM10", type: "bar" },
      ];

      this.echartsOptions7.options = data;
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
    //
    getoptions4() {
      //this.info["人口"]
      var seriesdata0 = [];
      var palist = [];
      palist.push({
        dim: 0,
        name: "城市",
        type: "category",
        inverse: true,
        nameLocation: "start",
      });
      var dim = 1;
      for (var d1 in this.info["LCR"]) {
        palist.push({ dim: dim++, name: d1 });
        var xh2 = 0;
        for (var d2 in this.info["LCR"][d1]) {
          if (dim === 2) {
            seriesdata0.push([d2]);
          }
          seriesdata0[xh2].push(this.info["LCR"][d1][d2]);
          xh2++;
        }
      }

      this.echartsOptions4.legend.data = ["LCR"];

      this.echartsOptions4.parallelAxis = palist;

      this.echartsOptions4.series = [
        {
          name: "LCR",
          type: "parallel",
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0.5,
            },
          },
          data: seriesdata0,
        },
      ];
    },
    getoptions5() {
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["PGR"]) {
        yearlist.push(d1);
        data.push({
          name: d1,
          type: "bar",
          data: [],
          areaStyle: {
            normal: {
              color: "#f0d0f0",
              shadowColor: "rgba(0, 0, 0, 0.1)",
              shadowBlur: 5,
            },
          },
          markPoint: {
            data: [
              { type: "max", name: "最大值" },
              { type: "min", name: "最小值" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "平均值" }],
          },
        });
        for (var d2 in this.info["PGR"][d1]) {
          if (yearlist.length === 1) {
            citylist.push([d2]);
          }
          data[yearlist.length - 1].data.push(this.info["PGR"][d1][d2]);
        }
      }

      this.echartsOptions5.legend.data = yearlist;

      this.echartsOptions5.xAxis[0].data = citylist;

      this.echartsOptions5.series = data;
    },
    getoptions6() {
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["LCRPGR"]) {
        yearlist.push(d1);
        data.push({
          name: d1,
          type: "bar",
          emphasis: {
            focus: "series",
          },
          animationDelay: function (idx) {
            return idx * 10;
          },
          data: [],
        });
        for (var d2 in this.info["LCRPGR"][d1]) {
          if (yearlist.length === 1) {
            citylist.push([d2]);
          }
          data[yearlist.length - 1].data.push(this.info["LCRPGR"][d1][d2]);
        }
      }

      this.echartsOptions6.legend.data = yearlist;

      this.echartsOptions6.xAxis.data = citylist;

      this.echartsOptions6.series = data;
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
  width: 100%;
  height: calc(100% - 75px);
}

.page_1 {
  width: 30%;
  height: calc(99% - 75px);
  float: left;
  position: absolute;
  top: calc(75px + 1%);
  left: 0;
}
.page_2 {
  width: 30%;
  height: calc(99% - 75px);
  float: right;
  position: absolute;
  top: calc(75px + 1%);
  right: 0;
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
.cb_4 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}
.cb_5 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}
.cb_6 {
  width: 100%;
  height: calc(33% - 2px);
  float: left;
}
.smchart {
  height: calc(100% - 40px);
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
