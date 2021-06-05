<template>
  <div class="MapIndex">
    <div class="page_0">
      <div class="header-cen">
        <h1>海南城市可视化分析</h1>
      </div>
      <menu2 Isactive="1"></menu2>
    </div>
    <sm-web-map :map-options="mapOptions" @load="mapload" class="mapCon">
    </sm-web-map>
    <div class="page_1">
      <sm-border type="border9" class="common-border cb_1">
        <div class="card_tit">
          <span>[{{ this.seltime }}年]</span> 低保人口
        </div>
        <sm-chart icon-class="" :options="s2ChartOptions"></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">
          <span style="color: #ff0000">[{{ this.showcity }}]</span>低保人口
        </div>
        <sm-chart icon-class="" :options="s3ChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">
          <span style="color: #ff0000">[{{ this.showcity }}]</span>低保人口
        </div>
        <sm-chart icon-class="" :options="s4ChartOptions"></sm-chart>
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
      <!-- <sm-radio-button value="2010"> 2010 </sm-radio-button>
      <sm-radio-button value="2011"> 2011 </sm-radio-button>
      <sm-radio-button value="2012"> 2012 </sm-radio-button>
      <sm-radio-button value="2013"> 2013 </sm-radio-button> -->
      <sm-radio-button v-for="(item, i) in timelist" :key="i" :value="item">
        {{ item }}
      </sm-radio-button>
    </sm-radio-group>
  </div>
</template>

<script>
import menu2 from "./../components/headermenu/menu2";
export default {
  name: "mapstatis1",
  computed: {},
  components: { menu2 },
  data() {
    return {
      contitle: "低保人数",
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
          left: 75,
          right: 35,
          top: 50,
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
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: 50,
          right: 50,
          top: 35,
          bottom: 35,
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "",
            type: "bar",
            barWidth: "60%",
            data: [],
          },
        ],
      },
      s4ChartOptions: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: [],
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [],
          },
        ],
      },
      timelist: [],
      citylist: [],
      seriesdatalist: [],
    };
  },
  props: {},
  watch: {},
  mounted() {},
  methods: {
    mapload(map) {
      var _this = this;
      window.map = map.map;
      _this.dibao();
      window.map.on("click", "geojsonid", function (e) {
        var feature = e.features[0];
        window.map.setFilter("pointlayerhighlight", [
          "in",
          "name",
          feature.properties.name,
        ]);
        _this.showcity = feature.properties.name;
      });
    },
    // 低保人口
    dibao() {
      var _this = this;
      _this.$http.get("data/dibao.json").then((data) => {
        _this.info = data;
        _this.showecharts1();
        //第二个统计图
        _this.showcharts2();
      });
    },
    showecharts1() {
      var _this = this;
      var data = _this.info;
      var xdata = [];
      var seriesdata = [];
      var xh = 0;
      var ldata = [];

      var arr = [];
      var d2xh = 0;
      for (var d1 in data["低保人口"]) {
        xdata.push(d1);
        seriesdata.push([]);
        // xh = 0;
        d2xh = 0;
        for (var d2 in data["低保人口"][d1]) {
          if (xdata.length === 1) {
            ldata.push(d2);
            arr.push({ city: d2 });
          }
          seriesdata[xh].push(data["低保人口"][d1][d2]);
          arr[d2xh][d1] = data["低保人口"][d1][d2];
          d2xh++;
        }
        xh++;
      }
      _this.timelist = xdata;
      _this.citylist = ldata;
      _this.seriesdatalist = seriesdata;
      _this.seltime = _this.timelist[0];
      _this.s2ChartOptions.yAxis.data = ldata;
      _this.changeecharts1();
      _this.changeCity();
    },
    showcharts2(){
      var _this = this;
      var data = _this.info;
      var year = [];
      var seriesdata = [];
      var xh = 0;
      var ldata = [];
      
      for (var d1 in data["低保人口"]) {
        year.push(d1);
        xh = 0;
        for (var d2 in data["低保人口"][d1]) {
          if (year.length === 1) {
            ldata.push(d2);
            seriesdata.push([]);
          }
          seriesdata[xh].push(data["低保人口"][d1][d2]);
          xh++;
        }
      }
      

      _this.s3ChartOptions.xAxis[0].data = year;
      _this.s3ChartOptions.series[0].name = ldata[0];
      _this.s3ChartOptions.series[0].data = seriesdata[0];

      _this.s4ChartOptions.series[0].name = ldata[0];

      var arr = [];
      for (var a = 0; a < year.length; a++) {
        arr.push({ value: seriesdata[0][a], name: year[a] });
      }
      _this.s4ChartOptions.series[0].data = arr;
      _this.ename = ldata;       
      _this.seriesdata = seriesdata;
      console.log(1)
       console.log(seriesdata);
      console.log(ldata);

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
        "#FFFF00",
        "#FFE100",
        "#FFC300",
        "#FFA600",
        "#FF8800",
        "#FF7500",
        "#FF6600",
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
    //城市改变
    changeCity() {
      var _this = this;
      setInterval(() => {       
        var now = _this.citylist.indexOf(_this.showcity);
        if (now == _this.citylist.length - 1) {
          now = 0;
        } else {
          now++;
        }
        _this.showcity = _this.citylist[now];
        window.map.setFilter("pointlayerhighlight", [
          "in",
          "name",
          _this.showcity,
        ]);

        _this.s3ChartOptions.series[0].name = _this.ename[now];
        _this.s3ChartOptions.series[0].data = _this.seriesdata[now];

        _this.s4ChartOptions.series[0].name = _this.showcity;

        var arr = [];
        for (var a = 0; a < _this.timelist.length; a++) {
          arr.push({
            value: _this.seriesdata[now][a],
            name: _this.timelist[a],
          });
        }
        _this.s4ChartOptions.series[0].data = arr;
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
  width: 26%;
  height: calc(100% - 77px);
  float: left;
  position: absolute;
  top: 76px;
  left: 0px;
  background-color: #223c7580;
  box-shadow: 3px 0px 0px 0px #03a9f440;
}
.page_2 {
  width: 26%;
  height: calc(100% - 77px);
  float: right;
  position: absolute;
  top: 76px;
  right: 0;
  background-color: #223c7580;
  box-shadow: -3px 0px 0px 0px #03a9f440;
}
.showtext {
  position: absolute;
  top: 100px;
  left: 28%;
}
.showtext1 {
  position: absolute;
  top: 130px;
  left: 28%;
}
.showtext2 {
  position: absolute;
  top: 100px;
  right: 28%;
}
.cb_1 {
  width: 100%;
  height: 100%;
  float: left;
}
.card_tit {
  background: url(../images/ksh33.png) no-repeat;
  color: #73dee8;
  /* width: 100%; */
  height: 33px;
  padding: 0 10px;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  background-size: 100% 100%;
}
.card_tit span {
  color: #ff0000;
}
.timeline {
  position: absolute;
  top: 100px;
  left: 27%;
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
