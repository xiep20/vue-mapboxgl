<template>
  <div class="MapIndex">
    
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>
    <div class="page_1">
      <sm-border type="border9" class="common-border cb_1">
        <div class="card_tit">
          <span>[{{ this.seltime }}年]</span> 城市公共开放空间
        </div>
        <sm-chart icon-class="" :options="s2ChartOptions"></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">
          <span style="color: #ddd">[{{ this.showcity }}]</span>城市公共开放空间
        </div>
        <sm-chart
          icon-class=""
          :options="s3ChartOptions"
          class="smchart"
        ></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">
          <span style="color: #ddd">[{{ this.showcity }}]</span>城市公共开放空间
        </div>
        <sm-chart
          icon-class=""
          :options="s4ChartOptions"
          class="smchart"
        ></sm-chart>
      </sm-border>
    </div>
    <sm-text
      class="showtext2"
      :title="showcity"
      textColor="#ff0"
      :fontStyle="{
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '600',
        textAlign: 'center',
      }"
    >
    </sm-text>

    <sm-radio-group
      v-model="seltime"
      class="timeline"
      @change="timeradiochange"
    >
      <sm-radio-button v-for="(item, i) in timelist" :key="i" :value="item">
        {{ item }}
      </sm-radio-button>
    </sm-radio-group>
  </div>
</template>

<script>
//import menu2 from "./../components/headermenu/menu2";
export default {
  name: "mapstatis1",
  computed: {},
  components: {  },
  data() {
    return {
      contitle: "客运量",
      showcity: "海口市",
      seltime: "2010",
      ename: [],
      seriesdata: [],

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
              data: "/data/hainan.json",
            },
            citypoint: {
              type: "geojson",
              data: "/data/hainan_point.json",
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
              id: "pointlayerhighlight",
              type: "fill-extrusion",
              source: "citypolygon",
              layout: {},
              paint: {
                "fill-extrusion-color": "#00d8ff",
                "fill-extrusion-height": 5000,
                "fill-extrusion-base": 0,
                "fill-extrusion-opacity": 0.8,
              },
              filter: ["in", "name", "海口市"],
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
                "text-color": "#fff",
                "text-halo-blur": 0,
                "text-halo-color": "#3fb1e3", //#3fb1e3
                "text-halo-width": 1,
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
        center: [109.73, 19.1], // starting position
        pitch: 45,
        zoom: 8, // starting zoom
      },
      info: null,
      s2ChartOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: 120,
          right: 35,
          top: 20,
          bottom: 50,
        },
        xAxis: {
          type: "value",
          splitArea: { show: false }, //保留网格区域
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
        yAxis: {
          type: "category",
          data: [],
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
          axisLabel: {
            //控制x轴文本
            show: true,
            textStyle: {
              color: "#ffff00",
            },
            // interval: 0,
            rotate: 0,
          },
        },

        series: [
          {
            type: "bar",
            barWidth: "40%",
            data: [],
          },
        ],
      },
      s3ChartOptions: {
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
        series: [
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
            data: [],
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
                  coord: [],
                  symbolSize: 50,
                  label: {
                    formatter: "",
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
                    coord: [],
                    lineStyle: {
                      color: "rgb(194,53,49)",
                      width: 2,
                      curveness: 0.3,
                      type: "dotted",
                    },
                    symbol: "none",
                  },
                  {
                    coord: [],
                    symbol: "none",
                  },
                ],
              ],
            },
          },
        ],
      },
      s4ChartOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
        },
        textStyle: {
          "color": "#c0c3cd",
          "fontSize": 14
        },
        grid: {
          left: "5%",
          top: "10%",
          right: "3%",
          bottom: "10%",
        },
        xAxis: [
          {
            type: 'category',
            data:[],          
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            },
            axisLabel: {
                margin: 10,
                color: '#e2e9ff',
                textStyle: {
                    fontSize: 14
                },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            // min: 40,
            // max: 80,
            axisLabel: {
            formatter: '{value}',
            color: '#e2e9ff',
            },
            splitArea: { show: false }, //保留网格区域
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'rgba(255,255,255,1)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            }
          },
        ],
        series: [
          {
            type: 'bar',
            data: [],
            barWidth: '20px',
            itemStyle: {
                normal: {
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(0,244,255,1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(0,77,167,1)' // 100% 处的颜色
                    }], false),
                    barBorderRadius: [30, 30, 30, 30],
                    shadowColor: 'rgba(0,160,221,1)',
                    shadowBlur: 4,
                }
            },
            label: {
                normal: {
                    show: true,
                    lineHeight: 30,
                    width: 80,
                    height: 30,
                    backgroundColor: 'rgba(0,160,221,0.1)',
                    borderRadius: 200,
                    position: ['-8', '-60'],
                    distance: 1,
                    formatter: [
                        '    {d|●}',
                        ' {a|{c}}     \n',
                        '    {b|}'
                    ].join(','),
                    rich: {
                        d: {
                            color: '#3CDDCF',
                        },
                        a: {
                            color: '#fff',
                            align: 'center',
                        },
                        b: {
                            width: 1,
                            height: 30,
                            borderWidth: 1,
                            borderColor: '#234e6c',
                            align: 'left'
                        },
                    }
                }
            }            
          },
        ],
      },
      timelist: [],
      citylist: [],
      seriesdatalist: [],
      seriesdatalist2: [],
    };
  },
  props: {},
  watch: {},
  mounted() {},
  methods: {
    mapload(map) {
      var _this = this;
      window.map = map.map;
      _this.gatdata();
      window.map.on("click", "geojsonid", function (e) {
        var feature = e.features[0];
        window.map.setFilter("pointlayerhighlight", [
          "in",
          "name",
          feature.properties.name,
        ]);
        _this.showcity = feature.properties.name;
        _this.getoptions2();
      });
    },
    // 客运量
    gatdata() {
      var _this = this;
      _this.$http.get("/data/qita.json").then((data) => {
        _this.info = data;
        _this.showecharts1();
      });
    },
    showecharts1() {
      var _this = this;
      var data = _this.info;
      var xdata = [];
      var seriesdata = [];
      var seriesdata2 = [];
      var ldata = [];

      var d2xh = 0;
      for (var d1 in data["城市公共开放空间"]) {
        ldata.push(d1);
        seriesdata2.push([]);
        d2xh = 0;
        for (var d2 in data["城市公共开放空间"][d1]) {
          if (ldata.length === 1) {
            xdata.push(d2);
            seriesdata.push([]);
          }
          seriesdata[d2xh].push(data["城市公共开放空间"][d1][d2]);
          seriesdata2[seriesdata2.length - 1].push(
            data["城市公共开放空间"][d1][d2]
          );
          d2xh++;
        }
      }
      _this.timelist = xdata;
      _this.citylist = ldata;
      _this.seriesdatalist = seriesdata;
      _this.seriesdatalist2 = seriesdata2;

      _this.seltime = _this.timelist[0];
      _this.s2ChartOptions.yAxis.data = ldata;
      _this.changeecharts1();
      _this.changeCity();
      _this.getoptions2();
    },

    changeecharts1() {
      var _this = this;
      _this.s2ChartOptions.series[0].data =
        _this.seriesdatalist[_this.timelist.indexOf(_this.seltime)];
      _this.timelinechange(_this.timelist.indexOf(_this.seltime));
    },
    //
    timeradiochange() {
      var _this = this;
      _this.changeecharts1();
    },
    timelinechange(currentIndex) {
      var minnum = 10000000000000000000000;
      var maxnum = -10000000000000000000000;
      for (var i = 0; i < this.seriesdatalist[currentIndex].length; i++) {
        var value = Number(this.seriesdatalist[currentIndex][i]);
        if (value < minnum) {
          minnum = value;
        }
        if (value > maxnum) {
          maxnum = value;
        }
      }
      var sf = (maxnum - minnum) / 6;
      var colorarr = [
        "#00a8ff",
        "#264ab2",
        "#2633b2",
        "#262cb2",
        "#3626b2",
        "#3926b2",
        "#4d26b2",
      ];
      var fc = ["match", ["get", "name"]];
      for (var n = 0; n < this.seriesdatalist[currentIndex].length; n++) {
        var value2 = Number(this.seriesdatalist[currentIndex][n]);
        fc.push(this.citylist[n]);
        fc.push(colorarr[Math.floor((value2 - minnum) / sf)]);
      }
      fc.push("#bebebe");
      window.map.setPaintProperty("geojsonid", "fill-color", fc);
      this.s2ChartOptions.series = [
        {
          type: "bar",
          barWidth: "60%",
          data: this.seriesdatalist[currentIndex],
        },
      ];
    },

    // 建成区面积echarts
    getoptions2() {
      var _this = this;
      if (_this.seriesdatalist2.length === 0) {
        return;
      }
      var nowXH = _this.citylist.indexOf(_this.showcity);

      _this.s3ChartOptions.xAxis[0].data = _this.timelist;
      _this.s3ChartOptions.series[0].data = _this.seriesdatalist2[nowXH];
      _this.s3ChartOptions.series[0].markPoint.data[1].coord = [
        _this.seltime,
        _this.seriesdatalist2[nowXH][_this.timelist.indexOf(_this.seltime)],
      ];
      _this.s3ChartOptions.series[0].markPoint.data[1].label["formatter"] =
        _this.seltime;

      _this.s3ChartOptions.series[0].markLine.data[0][0].coord = [
        _this.seltime,
        0,
      ];
      _this.s3ChartOptions.series[0].markLine.data[0][1].coord = [
        _this.seltime,
        _this.seriesdatalist2[nowXH][_this.timelist.indexOf(_this.seltime)],
      ];

      _this.s4ChartOptions.xAxis[0].data = _this.timelist;
      _this.s4ChartOptions.series[0].data = _this.seriesdatalist2[nowXH];
      _this.s4ChartOptions.series[0].markPoint.data[1].coord = [
        _this.seltime,
        _this.seriesdatalist2[nowXH][_this.timelist.indexOf(_this.seltime)],
      ];
      _this.s4ChartOptions.series[0].markPoint.data[1].label["formatter"] =
        _this.seltime;

      _this.s4ChartOptions.series[0].markLine.data[0][0].coord = [
        _this.seltime,
        0,
      ];
      _this.s4ChartOptions.series[0].markLine.data[0][1].coord = [
        _this.seltime,
        _this.seriesdatalist2[nowXH][_this.timelist.indexOf(_this.seltime)],
      ];
    },
    //城市改变
    changeCity() {
      var _this = this;

      if (window.si) {
        clearInterval(window.si);
      }
      window.si = setInterval(() => {
        var now = _this.citylist.indexOf(_this.showcity);
        if (now == _this.citylist.length - 1) {
          now = 0;
        } else {
          now++;
        }
        _this.showcity = _this.citylist[now];
        if (window.map) {
          window.map.setFilter("pointlayerhighlight", [
            "in",
            "name",
            _this.showcity,
          ]);
        }
        _this.getoptions2();
      }, 5000);
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
.common-border {
  margin-bottom: 10px;
  width: 500px;
  height: 450px;
  z-index: 1000;
}
.mapCon {
  width: 100%;
  height:  100% - 17px;
}

.page_1 { 
  float: left;
  position: absolute; 
  left: 10px;
  background-color: #223c7580;
  box-shadow: 3px 0px 0px 0px #03a9f440;
}
.page_2 {
  float: right;
  position: absolute;
  right: 10px;
  background-color: #223c7580;
  box-shadow: -3px 0px 0px 0px #03a9f440;
}

.page_1, .page_2{
  width: 26%;
  height: calc(100% - 20px);
  top: 10px;
}
.showtext {
  position: absolute;
  top: 10px;
  left: 28%;
}
.showtext1 {
  position: absolute;
  top: 130px;
  left: 28%;
}
.showtext2 {
  position: absolute;
  top: 10px;
  right: 28%;
}
.cb_1 {
  width: 100%;
  height: 100%;
  float: left;
}
.cb_3 {
  width: 100%;
  height: 50%;
  float: left;
}
.cb_4 {
  width: 100%;
  height: 50%;
  float: left;
}
.card_tit {
  background: url(../images/ksh33.png) no-repeat;
  color: #73dee8;
  /* width: 100%; */
  height: 33px;
  padding: 0 10px;
  font-size: 16px;
  line-height: 14px;
  font-weight: 600;
  background-size: 100% 100%;
}
.card_tit span {
  color: #ddd;
}
.timeline {
  position: absolute;
  top: 10px;
  left: 27%;
}
.smchart {
  height: calc(100% - 40px);
}
.sm-component-radio-button-wrapper {
  border-color: #f5f5f588;
  background-color: #287ab166;
  font-size: 16px;
  font-weight: 500;
}
.sm-component-radio-button-wrapper-checked,
.sm-component-radio-button-wrapper-checked:not(.sm-component-radio-button-wrapper-disabled):first-child {
  border-color: #00d8ff;
  color: #fff;
  background-color: #3782b5cc;
}
</style>
