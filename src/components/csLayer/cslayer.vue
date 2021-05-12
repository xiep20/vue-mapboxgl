<template>
  <div class="cslayer">
    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit"><span>城镇人口</span></div>
        <sm-chart icon-class="" :options="ChartOptions1"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit"><span>人口规模增长率(PGR)</span></div>
        <sm-chart icon-class="" :options="ChartOptions2"></sm-chart>
      </sm-border>
      <!-- 人口规模增长率(PGR) -->
      <sm-border type="border8" class="common-border cb_2">
        <div class="card_tit"><span>低保人口</span></div>
        <sm-chart icon-class="" :options="lineChartOptions"></sm-chart>
      </sm-border>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "cslayer",
  computed: {
    ...mapGetters(["getMapEchartsOptions"]),
  },
  data() {
    var edata = [
      [
        "16772",
        "10786",
        "7019",
        "6308",
        "4376",
        "10746",
        "5569",
        "9004",
        "11170",
        "8882",
        "28191",
        "5142",
        "9114",
        "7345",
        "4345",
        "6427",
        "9486",
        "8836",
      ],
      [
        "17274",
        "10147",
        "6711",
        "6287",
        "3786",
        "10537",
        "5454",
        "9531",
        "11221",
        "8869",
        "27908",
        "5392",
        "9682",
        "8451",
        "4654",
        "7313",
        "9563",
        "8847",
      ],
      [
        "13650",
        "8334",
        "5897",
        "5351",
        "3443",
        "9586",
        "4774",
        "7055",
        "11476",
        "8997",
        "27353",
        "5286",
        "8890",
        "7589",
        "4690",
        "6707",
        "9563",
        "7834",
      ],
      [
        "12103",
        "7761",
        "5778",
        "5020",
        "3050",
        "9531",
        "4340",
        "6294",
        "10294",
        "7383",
        "24622",
        "5316",
        "8890",
        "7728",
        "3893",
        "6712",
        "8713",
        "7954",
      ],
      [
        "11406",
        "5763",
        "4911",
        "3690",
        "2973",
        "8592",
        "3359",
        "5355",
        "9713",
        "6512",
        "22230",
        "4806",
        "7992",
        "5254",
        "3224",
        "6707",
        "6719",
        "7035",
      ],
      [
        "8830",
        "4735",
        "3825",
        "3159",
        "2707",
        "7767",
        "2942",
        "3850",
        "4804",
        "2555",
        "5898",
        "3825",
        "7874",
        "4338",
        "2559",
        "6880",
        "4249",
        "6689",
      ],
      [
        "6409",
        "2608",
        "3803",
        "2372",
        "2297",
        "6641",
        "2229",
        "4386",
        "5003",
        "2443",
        "6941",
        "3957",
        "6916",
        "3878",
        "2408",
        "5129",
        "3150",
        "6328",
      ],
      [
        "4796",
        "2411",
        "3713",
        "2223",
        "2197",
        "5115",
        "1989",
        "3081",
        "4579",
        "2443",
        "7031",
        "855",
        "6412",
        "2619",
        "2005",
        "2318",
        "2551",
        "5701",
      ],
      [
        "3536",
        "1961",
        "3741",
        "1744",
        "1175",
        "4247",
        "1582",
        "2508",
        "3775",
        "1774",
        "5220",
        "353",
        "5883",
        "2059",
        "1747",
        "1283",
        "1624",
        "5352",
      ],
    ];
    var ename = [
      "海口市",
      "三亚市",
      "五指山市",
      "文昌市",
      "琼海市",
      "万宁市",
      "定安县",
      "屯昌县",
      "澄迈县",
      "临高县",
      "儋州市",
      "东方市",
      "乐东黎族自治县",
      "琼中黎族苗族自治县",
      "保亭黎族苗族自治县",
      "陵水黎族自治县",
      "白沙黎族自治县",
      "昌江黎族自治县",
    ];
    return {
      edata,
      ename,

      // 和echarts一样的配置
      ChartOptions1: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          data: [],
          type: "scroll",
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          name: "",
          nameGap: 2,
          nameLocation: "end",
          type: "category",
        },
        yAxis: {
          name: "",
          axisLine: {
            lineStyle: {},
          },
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          splitArea: {
            show: false,
          },
          nameGap: 5,
          nameLocation: "end",
          type: "value",
          nameTextStyle: {
            padding: [0, 0, 5, 0],
          },
        },
        grid: {
          left: 50,
          right: 50,
          top: 35,
          bottom: 35,
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 20,
          },
          {
            start: 0,
            end: 20,
          },
        ],
        series: [],
      },
      ChartOptions2: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [],
          type: "scroll",
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          name: "",
          nameGap: 2,
          nameLocation: "end",
          type: "category",
        },
        yAxis: {
          name: "",
          axisLine: {
            lineStyle: {},
          },
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          splitArea: {
            show: false,
          },
          nameGap: 5,
          nameLocation: "end",
          type: "value",
          nameTextStyle: {
            padding: [0, 0, 5, 0],
          },
        },
        grid: {
          left: 50,
          right: 50,
          top: 35,
          bottom: 35,
        },
        series: [],
      },
      lineChartOptions: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [],
          type: "scroll",
        },
        xAxis: {
          data: [],
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          name: "",
          nameGap: 2,
          nameLocation: "end",
          type: "category",
        },
        yAxis: {
          name: "",
          axisLine: {
            lineStyle: {},
          },
          axisLabel: {
            rotate: 0,
            fontFamily: "MicrosoftYaHei",
          },
          show: true,
          splitArea: {
            show: false,
          },
          nameGap: 5,
          nameLocation: "end",
          type: "value",
          nameTextStyle: {
            padding: [0, 0, 5, 0],
          },
        },
        grid: {
          left: 50,
          right: 50,
          top: 35,
          bottom: 35,
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 50,
          },
          {
            start: 0,
            end: 50,
          },
        ],
        series: [],
      },
      timelist: [],
    };
  },
  props: {},
  mounted() {
    this.townPopulation();
    this.pgr();
    this.dibao();
    document.getElementsByTagName("body")[0].style.background =
      "rgba(0, 0, 0, 0.9)";
  },
  methods: {
    ...mapMutations({
      setMapEchartsOptions: "setMapEchartsOptions",
    }),

    // 城镇人口
    townPopulation() {
      var _this = this;
      _this.$http.get("data/townPopulation.json").then((data) => {
        var xdata = [];
        var ldata = [];
        var seriesdata = [];
        var xh = 0;
        for (var d1 in data["城镇人口"]) {
          xdata.push(d1);
          xh = 0;
          for (var d2 in data["城镇人口"][d1]) {
            if (xdata.length === 1) {
              ldata.push(d2);
              seriesdata.push({
                data: [],
                name: d2,
                type: "bar",
              });
            }
            seriesdata[xh].data.push(data["城镇人口"][d1][d2]);
            xh++;
          }
        }
        _this.ChartOptions1.legend.data = ldata;
        _this.ChartOptions1.xAxis.data = xdata;
        _this.ChartOptions1.series = seriesdata;
      });
    },
    // 人口规模增长率 PGR
    pgr() {
      var _this = this;
      _this.$http.get("data/pgr.json").then((data) => {
        var xdata = [];
        var ldata = [];
        var seriesdata = [];
        var xh = 0;
        for (var d1 in data["PGR"]) {
          xdata.push(d1);
          xh = 0;
          for (var d2 in data["PGR"][d1]) {
            if (xdata.length === 1) {
              ldata.push(d2);
              seriesdata.push({
                data: [],
                name: d2,
                type: "line",
              });
            }
            seriesdata[xh].data.push(data["PGR"][d1][d2]);
            xh++;
          }
        }
        _this.ChartOptions2.legend.data = ldata;
        _this.ChartOptions2.xAxis.data = xdata;
        _this.ChartOptions2.series = seriesdata;
      });
    },
    // 低保人口
    dibao() {
      var _this = this;
      _this.$http.get("data/dibao.json").then((data) => {
        var xdata = [];
        var ldata = [];
        var seriesdata = [];
        var xh = 0;
        for (var d1 in data["低保人口"]) {
          xdata.push(d1);
          xh = 0;
          for (var d2 in data["低保人口"][d1]) {
            if (xdata.length === 1) {
              ldata.push(d2);
              seriesdata.push({
                data: [],
                name: d2,
                emphasis: {
                  itemStyle: {},
                },
                type: "line",
              });
            }
            seriesdata[xh].data.push(data["低保人口"][d1][d2]);
            xh++;
          }
        }
        _this.lineChartOptions.legend.data = ldata;
        _this.lineChartOptions.xAxis.data = xdata;
        _this.lineChartOptions.series = seriesdata;
        _this.timelist = xdata;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cslayer {
  position: absolute;
  top: 75px;
  left: 0;
  bottom: 0;
  right: 70%;
}
.all-borders {
  width: 98%;
  margin: 0 auto;
  position: absolute;
  left: 1%;
  bottom: 0px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap-reverse;
  align-content: flex-start;
}
.common-border {
  margin-bottom: 10px;
  width: 300px;
  height: 230px;
  z-index: 1000;
}

.select-group {
  display: flex;
  align-items: center;
  position: absolute;
  width: 240px;
  left: 40px;
  top: 40px;
}
.select-group span {
  color: #fff;
  font-size: 15px;
  margin-right: 10px;
}
.select-border {
  width: 110px;
}
.sm-component-select-selection {
  background: #262626;
  color: #fff;
}
.sm-component-select-dropdown-content ul::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: rgba(245, 245, 245, 0);
}
.sm-component-select-dropdown-content ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: gray;
}
.sm-component-select-dropdown {
  background: #262626;
}
.sm-component-select-dropdown-menu-item {
  color: #909399;
}
.sm-component-select-dropdown-menu-item-active {
  background: #dddcdc !important;
  color: #4f4f4f !important;
}
.sm-component-select-dropdown-menu-item-selected,
.sm-component-select-dropdown-menu-item-selected:hover {
  background: #dddcdc !important;
  color: #4f4f4f !important;
}
.page_1 {
  width: 100%;
  height: 100%; /* calc(100% - 50px); */
  float: left;
}
.page_2 {
  width: 100%;
  height: 100%; /* calc(100% - 50px); */
  float: right;
}
.cb_1 {
  width: 100%;
  height: calc(30% - 8px);
  float: left;
}
.cb_2 {
  width: 100%;
  height: calc(40% - 15px);
  float: left;
}
.card_tit {
  background: url(../../images/ksh33.png) no-repeat;
    color: #73dee8;
    /* width: 100%; */
    height: 33px;
    padding: 0 10px;
    font-size: 18px;
    line-height: 30px;
    font-weight: 600;
    background-size: 100% 100%;     
}
.card_tit span{
    display: inline-block;
    color: #ffffff;
   
    position: absolute;
    top: -.3rem;
}
.sm-component-collapse-card {
  top: 30px;
  height: calc(100% - 40px);
}
</style>
