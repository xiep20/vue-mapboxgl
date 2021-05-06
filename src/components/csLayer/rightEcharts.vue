<template>
  <div class="rightEcharts">
    <div class="page_2">
      <sm-border type="border9" class="common-border cb_3">
        <div class="card_tit">[海口市]低保人口</div>
        <sm-chart icon-class="" :options="s2ChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">[海口市]低保人口</div>
        <sm-chart icon-class="" :options="s3ChartOptions"></sm-chart>
      </sm-border>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "rightEcharts",
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
      "澄迈县 ",
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
    var eyear = [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018 ",
    ];
    var chartGrid = {
      left: 50,
      right: 50,
      top: 35,
      bottom: 35,
    };
    return {
      edata,
      ename,
      eyear,

      s2ChartOptions: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: chartGrid,
        xAxis: [
          {
            type: "category",
            data: eyear,
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
            name: ename[0],
            type: "bar",
            barWidth: "60%",
            data: edata[0],
          },
        ],
      },
      s3ChartOptions: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: ename[0],
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
            data: [
              { value: edata[0][0], name: eyear[0] },
              { value: edata[0][1], name: eyear[1] },
              { value: edata[0][2], name: eyear[2] },
              { value: edata[0][3], name: eyear[3] },
              { value: edata[0][4], name: eyear[4] },
              { value: edata[0][5], name: eyear[5] },
              { value: edata[0][6], name: eyear[6] },
              { value: edata[0][7], name: eyear[7] },
              { value: edata[0][8], name: eyear[8] },
            ],
          },
        ],
      },
      timelist: eyear,
    };
  },
  props: {},
  mounted() {
    document.getElementsByTagName("body")[0].style.background =
      "rgba(0, 0, 0, 0.9)";
  },
  methods: {
    ...mapMutations({
      setMapEchartsOptions: "setMapEchartsOptions",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rightEcharts {
  position: absolute;
  top: 50px;
  left: 70%;
  bottom: 0;
  right: 0;
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
.page_2 {
  width: 100%;
  height: 100%;
  float: right;
}
.cb_3 {
  width: 100%;
  height: calc(50% - 15px);
  float: right;
}
.cb_4 {
  width: 100%;
  height: calc(50% - 15px);
  float: right;
}
.card_tit {
  background-color: #3e4241;
  color: #73dee8;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  font-size: 18px;
  line-height: 30px;
  font-weight: 600;
}
.sm-component-collapse-card {
  top: 30px;
  height: calc(100% - 40px);
}
</style>
