<template>
  <div class="MapIndex">
    <div class="page_0">
      <div class="header-cen">
        <h1>海南城市可视化分析</h1>
      </div>
      <headermenu Isactive="3"></headermenu>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>

    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">逐年空气变化</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions1"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_2">
        <div class="card_tit">CO2排放量</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions2"
          class="smchart"
        ></sm-chart>
      </sm-border>

      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">空气排放变化</div>
        <sm-chart
          icon-class=""
          :options="chartsOptions3"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">生活垃圾清运处理</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions4"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_5">
        <div class="card_tit">CO（mg/m3）</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions5"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_6">
        <div class="card_tit">空气</div>
        <sm-chart
          icon-class=""
          :options="echartsOptions6"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>

    <sm-text
      class="showyaertext"
      title="PM2.5"
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
    var barTopColor = ["#02c3f1", "#53e568", "#a154e9"];
    var barBottomColor = [
      "rgba(2,195,241,0.1)",
      "rgba(83, 229, 104, 0.1)",
      "rgba(161, 84, 233, 0.1)",
    ];
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
        baseOption: {
          timeline: {
            axisType: "category",
            // realtime: false,
            // loop: false,
            autoPlay: true,
            // currentIndex: 2,
            playInterval: 1000,
            // controlStyle: {
            //     position: 'left'
            // },
            data: [],
          },
          title: {
            subtext: "",
          },
          tooltip: {},
          legend: {
            left: "right",
            data: [],
            selected: {},
          },
          calculable: true,
          grid: {
            top: 30,
            bottom: 80,
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
              axisLabel: {
                interval: 0,
                rotate: 0,
                textStyle: {
                  color: "#8597c1",
                },
              },
              data: [],
              splitLine: { show: false },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "ug/m³",
              splitArea: { show: false }, //保留网格区域
            },
          ],
          series: [],
        },
        options: [],
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
        title: {
          text: "城市空气",
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
        legend: {
          data: [],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [],
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "#cbbf4063",
              },
            },
            splitArea: { show: false }, //保留网格区域
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
          show: false,
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "0",
          right: "3%",
          bottom: "0%",
          top: "20%",
          containLabel: true,
          show: true,
          borderColor: "rgba(0, 240, 255, 0.3)",
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: false,
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: 11,
              textStyle: {
                color: "#8597c1",
              },
              formatter: "{value}年",
              rotate: 0,
            },
            axisLine: {
              show: true,
              color: "#fff",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "生活垃圾清运量(万吨)",
            nameTextStyle: {
              color: "rgb(0,136,212)",
            },

            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: { show: false }, //保留网格区域
            axisLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: "#2a3751",
                width: "0",
              },
            },
            axisLabel: {
              show: true,
              formatter: "{value}", //右侧Y轴文字显示
              textStyle: {
                color: "rgb(0,136,212)",
              },
            },
            // min: 0,
            // max: 120,
          },
          {
            type: "value",
            name: "生活垃圾无害化处理量(万吨)",
            nameTextStyle: {
              color: "rgb(219,50,51)",
            },
            position: "right",
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgb(219,50,51)",
              },
            },
            axisTick: {
              show: false,
            },
            splitArea: { show: false }, //保留网格区域
            axisLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: "#2a3751",
                width: "0",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#57617B",
              },
            },
            // min: 0,
            // max: 120,
          },
        ],
        // 控制x轴
        series: [
          {
            name: "生活垃圾清运量 数值",
            type: "line",

            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(0, 136, 212, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0, 136, 212, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(0,136,212)",
              },
            },
            data: [],
          },
          {
            name: "生活垃圾无害化处理量",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true,
            lineStyle: {
              normal: {
                width: 1,
              },
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(219, 50, 51, 0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(219, 50, 51, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "rgb(219,50,51)",
              },
            },
            data: [],
            markArea: {},
          },
        ],
        graphic: [],
      },
      echartsOptions5: {
        backgroundColor: "#061326",
        title: {
          text: "CO排放",
          top: 20,
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 20,
          },
        },
        grid: {
          top: "25%",
          bottom: "15%",
        },
        xAxis: {
          data: [],
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            margin: 15,
            align: "center",
            // formatter: function (params) {
            //   return "{b|" + params + "}";
            // },
            textStyle: {
              fontSize: 14,
              color: "#ffffff",
              rich: {
                a: {
                  fontSize: 12,
                  color: "#ffffff",
                },
                b: {
                  height: 20,
                  fontSize: 14,
                  color: "#ffffff",
                },
              },
            },
            rotate: 0,
          },
          interval: 0,
        },
        yAxis: {
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: { show: false }, //保留网格区域
        },
        series: [
          {
            name: "柱顶部",
            type: "pictorialBar",
            symbolSize: [13, 6],
            symbolOffset: [0, -3],
            z: 12,
            itemStyle: {
              normal: {
                color: function (params) {
                  return barTopColor[params.dataIndex % 3];
                },
              },
            },
            label: {
              show: true,
              position: "top",
              fontSize: 14,
            },
            symbolPosition: "end",
            data: [],
          },
          {
            name: "柱底部",
            type: "pictorialBar",
            symbolSize: [13, 6],
            symbolOffset: [0, 3],
            z: 12,
            itemStyle: {
              normal: {
                color: function (params) {
                  return barTopColor[params.dataIndex % 3];
                },
              },
            },
            data: [],
          },
          {
            name: "第一圈",
            type: "pictorialBar",
            symbolSize: [24, 10],
            symbolOffset: [0, 6],
            z: 11,
            itemStyle: {
              normal: {
                color: "transparent",
                borderColor: "#3ACDC5",
                borderWidth: 2,
              },
            },
            data: [],
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 1,
                    color: barTopColor[0],
                  },
                  {
                    offset: 0,
                    color: barBottomColor[1],
                  },
                ]),
                opacity: 0.8,
              },
            },
            z: 14,
            silent: true,
            barWidth: 12,
            barGap: "-100%", // Make series be overlap
            data: [],
          },
        ],
      },
      echartsOptions6: {
        backgroundColor: "#16162766",
        title: {
          text: "AQI",
          left: "Left",
          textStyle: {
            color: "#eee",
          },
        },
        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 20,
        //     dimension: 6,
        //     inRange: {
        //         colorLightness: [0.5, 0.8]
        //     }
        // },
        radar: {
          indicator: [
            { name: "PM2.5", max: 40 },
            { name: "PM10", max: 70 },
            { name: "CO", max: 3 },
            { name: "NO2", max: 30 },
            { name: "SO2", max: 15 },
            { name: "O3", max: 150 },
          ],
          shape: "circle",
          splitNumber: 5,
          name: {
            textStyle: {
              color: "rgb(238, 197, 102)",
            },
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.1)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 1)",
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(238, 197, 102, 0.5)",
            },
          },
        },
        series: [
          {
            name: "",
            type: "radar",
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.5,
              },
            },
            data: [],
            symbol: "none",
            itemStyle: {
              color: "#B3E4A1",
            },
            areaStyle: {
              opacity: 0.05,
            },
          },
        ],
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
    // PM2.5空气map
    mapm(nowXH) {
      var cityname = [];
      var poplist = [];
      var yearlist = [];
      for (var d1 in this.info["PM2.5"]) {
        cityname.push(d1);
        var xh = 0;
        for (var d2 in this.info["PM2.5"][d1]) {
          if (cityname.length === 1) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh].push(this.info["PM2.5"][d1][d2]);
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
    // 空气echarts
    getoptions1() {
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["PM2.5"]) {
        if (citylist.length % 2 === 0) {
          citylist.push(d1);
        } else {
          citylist.push("\n" + d1);
        }
        var d2i = 0;
        for (var d2 in this.info["PM2.5"][d1]) {
          if (citylist.length === 1) {
            yearlist.push(d2);
            data.push({
              title: { text: "" },
              series: [
                { data: [] },
                { data: [] },
                { data: [] },
                { data: [] },
                { data: [] },
              ],
            });
          }
          data[d2i].series[0].data.push(this.info["PM2.5"][d1][d2]);
          data[d2i].series[1].data.push(this.info["SO2"][d1][d2]);
          data[d2i].series[2].data.push(this.info["PM10"][d1][d2]);
          data[d2i].series[3].data.push(this.info["NO2"][d1][d2]);
          data[d2i].series[4].data.push(this.info["O3"][d1][d2]);
          d2i++;
        }
      }

      this.echartsOptions1.baseOption.timeline.data = yearlist;
      this.echartsOptions1.baseOption.legend.data = [
        "PM2.5",
        "SO2",
        "PM10",
        "NO2",
        "O3",
      ];
      this.echartsOptions1.baseOption.legend.selected = {
        NO2: false,
        O3: false,
      };
      this.echartsOptions1.baseOption.xAxis[0].data = citylist;
      this.echartsOptions1.baseOption.series = [
        { name: "PM2.5", type: "bar" },
        { name: "SO2", type: "bar" },
        { name: "PM10", type: "bar" },
        { name: "NO2", type: "bar" },
        { name: "O3", type: "bar" },
      ];

      this.echartsOptions1.options = data;
    },
    //  CO2 echarts
    getoptions2() {
      var _this = this;
      var xh = 0;
      var cityname = [];
      var yearlist = [];
      var poplist = [];
      for (var d1 in _this.info["CO2"]) {
        cityname.push(d1);
        // var xh2 = 0;
        for (var d2 in _this.info["CO2"][d1]) {
          if (xh === 0) {
            yearlist.push(d2);
            poplist.push([]);
          }
          poplist[xh].push(_this.info["CO2"][d1][d2]);
          // xh2++;
        }
        xh++;
      }
      var nowXH = 0;
      setInterval(() => {
        if (nowXH === cityname.length) {
          nowXH = 0;
        }

        var xData = yearlist,
          yData = poplist[nowXH];
        _this.echartsOptions2.xAxis[0].data = xData;
        _this.echartsOptions2.title.text = cityname[nowXH];
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
        _this.echartsOptions2.graphic = [
          {
            type: "text",
            left: "70%",
            top: "1%",
            style: {
              fill: "#fff",
              text: "二氧化碳排放量\n\n基本呈提升态",
              textAlign: "center",
              fontSize: 13,
              //font: 'bold 13px Microsoft YaHei'
            },
          },
        ];
        nowXH++;
      }, 2000);
    },
    // 人口echarts
    getoptions3() {
      var yearlist = [];
      var citylist = [];
      var fl = ["PM2.5", "SO2", "PM10", "CO", "O3", "NO2"];
      var data = [];
      for (var d1 in this.info["PM2.5"]) {
        citylist.push(d1);
        data.push([]);
        for (var v = 0; v < fl.length; v++) {
          data[citylist.length - 1].push({
            name: fl[v],
            type: "line",
            stack: "总量",
            // label: {
            //   show: true,
            //   position: "top",
            // },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [],
          });
        }
        data[citylist.length - 1][fl.length - 1].label = {
          show: true,
          position: "top",
        };
        for (var d2 in this.info["PM2.5"][d1]) {
          if (citylist.length === 1) {
            yearlist.push(d2);
          }
          for (var c = 0; c < fl.length; c++) {
            data[citylist.length - 1][c].data.push(this.info[fl[c]][d1][d2]);
          }
        }
      }

      this.chartsOptions3.legend.data = fl;
      this.chartsOptions3.xAxis[0].data = yearlist;
      this.chartsOptions3.series = data[0];
      this.chartsOptions3.title.text = citylist[0];
      var stn = 1;
      setInterval(() => {
        if (stn === citylist.length) {
          stn = 0;
        }
        this.chartsOptions3.series = data[stn];
        this.chartsOptions3.title.text = citylist[stn];
        stn++;
      }, 3000);
    },
    //
    getoptions4() {
      //this.info["人口"]
      var citylist = [];
      var yearlist = [];
      var seriesdata0 = [];
      for (var d1 in this.info["生活垃圾清运量"]) {
        citylist.push(d1);
        seriesdata0.push([[], []]);
        for (var d2 in this.info["生活垃圾清运量"][d1]) {
          if (citylist.length === 1) {
            yearlist.push(d2);
          }
          seriesdata0[citylist.length - 1][0].push(
            this.info["生活垃圾清运量"][d1][d2]
          );
          seriesdata0[citylist.length - 1][1].push(
            this.info["生活垃圾无害化处理量"][d1][d2]
          );
        }
      }

      this.echartsOptions4.xAxis[0].data = yearlist;
      this.echartsOptions4.title.text = citylist[0];
      this.echartsOptions4.series[0].data = seriesdata0[0][0];
      this.echartsOptions4.series[1].data = seriesdata0[0][1];
      this.echartsOptions4.graphic = [
        {
          type: "text",
          left: "20%",
          top: "23%",
          $action: "merge",
          style: {
            fill: "#fff",
            text: "现象：两曲线大体一致",
            textAlign: "left",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
          invisible: false,
        },
        {
          type: "text",
          left: "20%",
          top: "33%",
          $action: "merge",
          style: {
            fill: "#fff",
            text: "原因：清运生活垃圾基本已做无害化处理",
            textAlign: "left",
            fontSize: 13,
            //font: 'bold 13px Microsoft YaHei'
          },
          invisible: false,
        },
      ];
      var stn = 1;
      setInterval(() => {
        if (stn === citylist.length) {
          stn = 0;
        }
        this.echartsOptions4.title.text = citylist[stn];
        this.echartsOptions4.series[0].data = seriesdata0[stn][0];
        this.echartsOptions4.series[1].data = seriesdata0[stn][1];
        stn++;
      }, 3000);
    },
    getoptions5() {
      //mg/m3
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["CO"]) {
        citylist.push(d1);
        var y1 = 0;
        for (var d2 in this.info["CO"][d1]) {
          if (citylist.length === 1) {
            data.push([]);
            yearlist.push([d2]);
          }
          data[y1].push(this.info["CO"][d1][d2]);
          y1++;
        }
      }

      this.echartsOptions5.title.text = yearlist[5] + "年";
      this.echartsOptions5.xAxis.data = citylist;

      this.echartsOptions5.series[0].data = data[5];
      this.echartsOptions5.series[1].data = data[5];
      this.echartsOptions5.series[2].data = data[5];
      this.echartsOptions5.series[3].data = data[5];
      // this.echartsOptions5.series[4].data = data[0];
      var stn = 5;
      setInterval(() => {
        if (stn === yearlist.length) {
          stn = 5;
        }
        this.echartsOptions5.title.text = yearlist[stn] + "年";
        this.echartsOptions5.series[0].data = data[stn];
        this.echartsOptions5.series[1].data = data[stn];
        this.echartsOptions5.series[2].data = data[stn];
        this.echartsOptions5.series[3].data = data[stn];
        stn++;
      }, 3000);
    },
    getoptions6() {
      var yearlist = [];
      var citylist = [];
      var data = [];
      for (var d1 in this.info["PM2.5"]) {
        citylist.push(d1);
        data.push([]);
        var xh = 0;
        for (var d2 in this.info["PM2.5"][d1]) {
          if (citylist.length === 1) {
            yearlist.push(d2);
          }
          data[citylist.length - 1][xh] = [];
          data[citylist.length - 1][xh].push(this.info["PM2.5"][d1][d2]);
          data[citylist.length - 1][xh].push(this.info["PM10"][d1][d2]);
          data[citylist.length - 1][xh].push(this.info["CO"][d1][d2]);
          data[citylist.length - 1][xh].push(this.info["NO2"][d1][d2]);
          data[citylist.length - 1][xh].push(this.info["SO2"][d1][d2]);
          data[citylist.length - 1][xh].push(this.info["O3"][d1][d2]);
          xh++;
        }
      }

      this.echartsOptions6.title.text = citylist[0];
      this.echartsOptions6.series[0].data = data[0];

      var stn = 1;
      setInterval(() => {
        if (stn === yearlist.length) {
          stn = 0;
        }
        this.echartsOptions6.title.text = citylist[stn];
        this.echartsOptions6.series[0].data = data[stn];
        stn++;
      }, 3000);
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
