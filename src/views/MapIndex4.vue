<template>
  <div class="MapIndex">
    <div class="page_0">
      <div class="header-cen">
        <h1>海南城市可视化分析</h1>
      </div>
      <headermenu Isactive="4"></headermenu>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>

    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">统计年鉴客运量</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions1"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_2">
        <div class="card_tit">十万人口受灾率</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions2"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">十万人口死亡失踪率</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions3"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">直接经济损失占GDP比重</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions4"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_5">
        <div class="card_tit">建成区绿化率</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions5"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_6">
        <div class="card_tit">人均公园绿地面积</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions6"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>
    <sm-text
      class="showyaertext"
      title="直接经济损失占GDP比重（%）"
      textColor="#73dee8"
      :fontStyle="{
        fontSize: '18px',
        lineHeight: '20px',
        fontWeight: '600',
        textAlign: 'center',
      }"
    >
    </sm-text>
    <div class="page_3">
      <sm-time-line
        :data="timelist"
        autoPlay="true"
        @timelinechanged="timelinechange"
      >
      </sm-time-line>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import headermenu from "./../components/headermenu";
export default {
  name: "mapindex",
  computed: {
    ...mapGetters(["getMapEchartsOptions"]),
  },
  components: { headermenu },
  data() {
    return {
      timelist: [],
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
        backgroundColor: "#0A2E5D55",
        title: {
          text: "客运量",
          top: "40%",
          textAlign: "center",
          left: "49%",
          textStyle: {
            color: "#fff",
            fontSize: 22,
            fontWeight: "400",
          },
        },
        graphic: {
          elements: [],
        },
        tooltip: {
          trigger: "item",
        },
        legend: { show: false },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "",
            type: "pie",
            clockWise: false,
            radius: [105, 109],
            hoverAnimation: false,
            itemStyle: {},
            data: [],
          },
        ],
      },
      echartsOptions2: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#00d8ff",
            textBorderColor: "#e6ff00",
          },
          left: "20%",
        },
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
            // axisLine: {
            //   show: true,
            //   lineStyle: {
            //     type: "solid",
            //     color: "#2a3751",
            //     width: "0",
            //   },
            // },
          },
        ],
        visualMap: {
          top: 10,
          right: 10,
          pieces: [
            {
              gt: 0,
              lte: 2,
              color: "#93CE07",
            },
            {
              gt: 2,
              lte: 5,
              color: "#FBDB0F",
            },
            {
              gt: 5,
              lte: 8,
              color: "#FC7D02",
            },
            {
              gt: 8,
              lte: 10,
              color: "#FD0100",
            },
            {
              gt: 10,
              lte: 15,
              color: "#AA069F",
            },
            {
              gt: 20,
              color: "#AC3B2A",
            },
          ],
          outOfRange: {
            color: "#999",
          },
        },
        series: [],
      },
      echartsOptions3: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#00d8ff",
            textBorderColor: "#e6ff00",
          },
          left: "20%",
        },
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
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#00d8ff",
            textBorderColor: "#e6ff00",
          },
          left: "20%",
        },
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
              // interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "%",
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
      echartsOptions5: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#00d8ff",
            textBorderColor: "#e6ff00",
          },
          left: "20%",
        },
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
        visualMap: {
          top: 10,
          left: 20,
          orient: "horizontal",
          min: 20,
          max: 70,
          itemWidth: 6,
          itemHeight: 50,
          // Map the score column to color
          dimension: 0,
          inRange: {
            color: ["#65B581", "#FFCE34", "#FD665F"],
          },
        },
        series: [],
      },
      echartsOptions6: {
        title: {
          text: "",
          subtext: "",
          textStyle: {
            color: "#00d8ff",
            textBorderColor: "#e6ff00",
          },
          left: "20%",
        },
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
              // interval: 0,
              rotate: 0,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "m²",
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
      _this.$http.get("data/qita.json").then((data) => {
        _this.info = data;
        _this.changeYear();
      });
    },
    // 切换年份
    changeYear() {
      var _this = this;
      _this.mapm(0);
      _this.getoptions1();
      _this.getoptions2();
      _this.getoptions3();
      _this.getoptions4();
      _this.getoptions5();
      _this.getoptions6();
      // _this.getoptions7();
    },
    timelinechange(current) {
      this.mapm(current.currentIndex);
    },
    // 直接经济损失占GDP比重
    mapm(nowXH) {
      var cityname = [];
      var poplist = [];
      var yearlist = [];
      for (var d1 in this.info["直接经济损失占GDP比重"]) {
        cityname.push(d1);
        var xh = 0;
        for (var d2 in this.info["直接经济损失占GDP比重"][d1]) {
          if (cityname.length === 1) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh].push(this.info["直接经济损失占GDP比重"][d1][d2]);
          xh++;
        }
      }
      if (this.timelist.length == 0) {
        this.timelist = yearlist;
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

    // // 统计年鉴客运量
    // getoptions1() {
    //   var _this = this;
    //   var xh = 0;
    //   var cityname = [];
    //   var yearlist = [];
    //   var poplist = [];
    //   for (var d1 in _this.info["统计年鉴客运量"]) {
    //     cityname.push(d1);
    //     poplist.push([]);
    //     for (var d2 in _this.info["统计年鉴客运量"][d1]) {
    //       if (xh === 0) {
    //         yearlist.push(d2);
    //       }
    //       poplist[xh].push(_this.info["统计年鉴客运量"][d1][d2]);
    //     }
    //     xh++;
    //   }
    //   var nowXH = 0;
    //   setInterval(() => {
    //     if (nowXH === cityname.length) {
    //       nowXH = 0;
    //     }

    //     var xData = yearlist,
    //       yData = poplist[nowXH];
    //     _this.echartsOptions1.xAxis[0].data = xData;
    //     _this.echartsOptions1.title.text = cityname[nowXH];
    //     _this.echartsOptions1.series = [
    //       {
    //         type: "line",
    //         color: "#FFD700",
    //         smooth: true,
    //         lineStyle: {
    //           normal: {
    //             width: 1,
    //           },
    //         },
    //         areaStyle: {
    //           normal: {
    //             // color: "rgba(255, 215, 0, 0.3)",
    //             color: new _this.$echarts.graphic.LinearGradient(
    //               0,
    //               0,
    //               0,
    //               1,
    //               [
    //                 {
    //                   offset: 0,
    //                   color: "rgba(255, 215, 0, 0.3)",
    //                 },
    //                 {
    //                   offset: 1,
    //                   color: "rgba(255, 215, 0, 0)",
    //                 },
    //               ],
    //               false
    //             ),
    //             shadowColor: "rgba(0, 0, 0, 0.1)",
    //             shadowBlur: 5,
    //           },
    //         },
    //         data: yData,
    //         markPoint: {
    //           data: [
    //             {
    //               type: "min",
    //               name: "最小值",
    //               symbolSize: 25,
    //               label: {
    //                 formatter: "低",
    //                 color: "#000",
    //               },
    //               itemStyle: {
    //                 color: "#96f392",
    //               },
    //             },
    //             {
    //               type: "max",
    //               name: "最大值",
    //               symbolSize: 25,
    //               label: {
    //                 formatter: "高",
    //                 color: "#000",
    //               },
    //               itemStyle: {
    //                 color: "#fff000",
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     ];
    //     nowXH++;
    //   }, 2000);
    // },

    //  统计年鉴客运量
    getoptions1() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];

      for (var d1 in _this.info["统计年鉴客运量"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["统计年鉴客运量"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }

          poplist[xh2].push({
            value: _this.info["统计年鉴客运量"][d1][d2],
            name: d1,
            itemStyle: {
              normal: {
                borderWidth: 5,
                shadowBlur: 20,
                // borderColor: color[xh],
                // shadowColor: color[xh],
              },
            },
          });

          poplist[xh2].push({
            value: 2,
            name: "",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                color: "rgba(0, 0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0)",
                borderWidth: 0,
              },
            },
          });

          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        // _this.echartsOptions1.legend.data = cityname;
        _this.echartsOptions1.title.text = yearlist[nowXH] + "\n\n客运量";
        _this.echartsOptions1.series[0].data = poplist[nowXH];
        nowXH++;
      }, 2000);
    },
    //  十万人口受灾率
    getoptions2() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["十万人口受灾率"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["十万人口受灾率"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(_this.info["十万人口受灾率"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        var xData = cityname,
          yData = poplist[nowXH];
        _this.echartsOptions2.xAxis[0].data = xData;
        _this.echartsOptions2.title.text = yearlist[nowXH];
        _this.echartsOptions2.series = [
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
                color: new _this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 1,
                      color: "rgba(172, 59, 42, 0.1)",
                    },
                    {
                      offset: 0,
                      color: "rgba(147, 206, 7, 0.3)",
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
                  type: "max",
                  name: "最大值",
                  symbolSize: 25,
                  label: {
                    formatter: "高",
                    color: "#000",
                  },
                  itemStyle: {
                    color: "#fff000",
                  },
                },
              ],
            },
          },
        ];
        nowXH++;
      }, 2000);
    },
    //  十万人口死亡失踪率
    getoptions3() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["十万人口死亡失踪率"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["十万人口死亡失踪率"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(_this.info["十万人口死亡失踪率"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        var xData = cityname,
          yData = poplist[nowXH];
        _this.echartsOptions3.xAxis[0].data = xData;
        _this.echartsOptions3.title.text = yearlist[nowXH];
        _this.echartsOptions3.series = [
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
                color: new _this.$echarts.graphic.LinearGradient(
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
                  type: "max",
                  name: "最大值",
                  symbolSize: 25,
                  label: {
                    formatter: "高",
                    color: "#000",
                  },
                  itemStyle: {
                    color: "#fff000",
                  },
                },
              ],
            },
          },
        ];
        nowXH++;
      }, 2000);
    },
    //  直接经济损失占GDP比重
    getoptions4() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["直接经济损失占GDP比重"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["直接经济损失占GDP比重"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(_this.info["直接经济损失占GDP比重"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        var xData = cityname,
          yData = poplist[nowXH];
        _this.echartsOptions4.xAxis[0].data = xData;
        _this.echartsOptions4.title.text = yearlist[nowXH];
        _this.echartsOptions4.series = [
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
                color: new _this.$echarts.graphic.LinearGradient(
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
                  type: "max",
                  name: "最大值",
                  symbolSize: 25,
                  label: {
                    formatter: "高",
                    color: "#000",
                  },
                  itemStyle: {
                    color: "#fff000",
                  },
                },
              ],
            },
          },
        ];
        nowXH++;
      }, 2000);
    },
    //  建成区绿化率
    getoptions5() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["建成区绿化率"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["建成区绿化率"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(_this.info["建成区绿化率"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        var xData = cityname,
          yData = poplist[nowXH];
        _this.echartsOptions5.xAxis[0].data = xData;
        _this.echartsOptions5.title.text = yearlist[nowXH];
        _this.echartsOptions5.series = [
          {
            type: "bar",
            color: "#FFD700",
            smooth: true,
            barWidth: 6,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                // color: "rgba(255, 215, 0, 0.3)",
                color: new _this.$echarts.graphic.LinearGradient(
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
                  type: "max",
                  name: "最大值",
                  symbolSize: 25,
                  label: {
                    formatter: "高",
                    color: "#000",
                  },
                  itemStyle: {
                    color: "#fff000",
                  },
                },
              ],
            },
          },
        ];
        nowXH++;
      }, 2000);
    },
    //  人均公园绿地面积
    getoptions6() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["人均公园绿地面积"]) {
        cityname.push(d1);
        var xh2 = 0;
        for (var d2 in _this.info["人均公园绿地面积"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh2].push(_this.info["人均公园绿地面积"][d1][d2]);
          xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === yearlist.length) {
          nowXH = 0;
        }

        var xData = cityname,
          yData = poplist[nowXH];
        _this.echartsOptions6.xAxis[0].data = xData;
        _this.echartsOptions6.title.text = yearlist[nowXH];
        _this.echartsOptions6.series = [
          {
            type: "bar",
            color: new _this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#83bff6" },
              { offset: 0.5, color: "#188df0" },
              { offset: 1, color: "#188df0" },
            ]),
            smooth: true,
            barWidth: 6,
            lineStyle: {
              normal: {
                width: 1,
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
                  type: "max",
                  name: "最大值",
                  symbolSize: 25,
                  label: {
                    formatter: "高",
                    color: "#000",
                  },
                  itemStyle: {
                    color: "#fff000",
                  },
                },
              ],
            },
          },
        ];
        nowXH++;
      }, 2000);
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
.page_3 {
  width: 30%;
  height: 80px;
  position: absolute;
  bottom: 20px;
  left: 33%;
}
.cb_1 {
  width: 100%;
  height: calc(40% - 2px);
  float: left;
}
.cb_2 {
  width: 100%;
  height: calc(30% - 2px);
  float: left;
}
.cb_3 {
  width: 100%;
  height: calc(30% - 2px);
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
  bottom: 100px;
  right: 31%;
}
</style>
