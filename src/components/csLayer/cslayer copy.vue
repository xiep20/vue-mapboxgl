<template>
  <div class="cslayer">
    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">城镇人口</div>
        <sm-chart icon-class="" :options="barChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_1">
        <div class="card_tit">人口规模增长率(PGR)</div>
        <sm-chart icon-class="" :options="ChartOptions2"></sm-chart>
      </sm-border>
      <!-- 人口规模增长率(PGR) -->
      <sm-border type="border8" class="common-border cb_2">
        <div class="card_tit">低保人口</div>
        <sm-chart icon-class="" :options="lineChartOptions"></sm-chart>
      </sm-border>
    </div>
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
    <sm-time-line
      :data="timelist"
      autoPlay="true"
      @timelinechanged="timelinechange"
    >
    </sm-time-line>
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
    var eyear = [
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
    ];
    // 城镇人口
    var citypeop = [
      [
        "484000",
        "173600",
        "48214",
        "90500",
        "90500",
        "78200",
        "52213",
        "45059",
        "78654",
        "68605",
        "216100",
        "85600",
        "67069",
        "39339",
        "27750",
        "57440",
        "19865",
        "68552",
      ],
      [
        "864900",
        "256200",
        "55273",
        "117500",
        "140800",
        "172600",
        "91825",
        "99910",
        "79308",
        "131444",
        "391100",
        "106900",
        "110297",
        "100127",
        "75445",
        "86353",
        "23198",
        "85587",
      ],
      [
        "967300",
        "287900",
        "54363",
        "125700",
        "153100",
        "185300",
        "98749",
        "104913",
        "97509",
        "143897",
        "402300",
        "110500",
        "149790",
        "107477",
        "79624",
        "97018",
        "25847",
        "92959",
      ],
      [
        "981100",
        "283000",
        "28510",
        "116000",
        "146900",
        "197200",
        "129202",
        "76782",
        "169429",
        "168944",
        "406000",
        "112600",
        "135025",
        "113931",
        "56722",
        "81745",
        "82981",
        "87792",
      ],
      [
        "985500",
        "281100",
        "50561",
        "113200",
        "145300",
        "200000",
        "106122",
        "95946",
        "224660",
        "129026",
        "411000",
        "114000",
        "129555",
        "65526",
        "56362",
        "163594",
        "45872",
        "107742",
      ],
    ];
    var cname = [
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
    var cyear = ["2000", "2005", "2010", "2015", "2020(2018)"];
    var cprg = [
      [
        "0.116105797",
        "0.077840917",
        "0.027327022",
        "0.052217697",
        "0.088398119",
        "0.158341426",
        "0.112910617",
        "0.159259408",
        "0.001656104",
        "0.130043097",
        "0.118644404",
        "0.044441707",
        "0.099490957",
        "0.186844597",
        "0.200033615",
        "0.081540524",
        "0.031021336",
        "0.044388164",
      ],
      [
        "0.022378958",
        "0.023330962",
        "-0.003320154",
        "0.013491956",
        "0.016750172",
        "0.014199871",
        "0.014539337",
        "0.009772331",
        "0.041321135",
        "0.018103372",
        "0.005646959",
        "0.006624341",
        "0.061211517",
        "0.014167498",
        "0.010782328",
        "0.023290596",
        "0.021625694",
        "0.016525027",
      ],
      [
        "0.002833141",
        "-0.00343326",
        "-0.129085774",
        "-0.016061585",
        "-0.008267844",
        "0.012448462",
        "0.053759159",
        "-0.06243224",
        "0.110497856",
        "0.032093907",
        "0.001831016",
        "0.003765239",
        "-0.020754873",
        "0.011663226",
        "-0.067830682",
        "-0.034258376",
        "0.233283425",
        "-0.011437631",
      ],
      [
        "0.001491578",
        "-0.002245473",
        "0.190975208",
        "-0.008144675",
        "-0.003650504",
        "0.004699641",
        "-0.065595898",
        "0.074271765",
        "0.094051396",
        "-0.089851122",
        "0.004080018",
        "0.002471347",
        "-0.013784815",
        "-0.184381997",
        "-0.002122323",
        "0.231261034",
        "-0.197585586",
        "0.068256367",
      ],
    ];
    var cprgyear = ["2000-2005", "2005-2010", "2010-2015", "2015-2018"];
    var chartYAxis = {
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
    };
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
      citypeop,
      cname,
      cyear,
      cprg,
      cprgyear,

      // 和echarts一样的配置
      barChartOptions: {
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          data: cyear,
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
        yAxis: chartYAxis,
        grid: chartGrid,
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
        series: [
          {
            data: [
              citypeop[0][0],
              citypeop[1][0],
              citypeop[2][0],
              citypeop[3][0],
              citypeop[4][0],
            ],
            name: cname[0],
            type: "bar",
          },
          {
            data: [
              citypeop[0][1],
              citypeop[1][1],
              citypeop[2][1],
              citypeop[3][1],
              citypeop[4][1],
            ],
            name: cname[1],
            type: "bar",
          },
          {
            data: [
              citypeop[0][2],
              citypeop[1][2],
              citypeop[2][2],
              citypeop[3][2],
              citypeop[4][2],
            ],
            name: cname[2],
            type: "bar",
          },
          {
            data: [
              citypeop[0][3],
              citypeop[1][3],
              citypeop[2][3],
              citypeop[3][3],
              citypeop[4][3],
            ],
            name: cname[3],
            type: "bar",
          },
          {
            data: [
              citypeop[0][4],
              citypeop[1][4],
              citypeop[2][4],
              citypeop[3][4],
              citypeop[4][4],
            ],
            name: cname[4],
            type: "bar",
          },
          {
            data: [
              citypeop[0][5],
              citypeop[1][5],
              citypeop[2][5],
              citypeop[3][5],
              citypeop[4][5],
            ],
            name: cname[5],
            type: "bar",
          },
          {
            data: [
              citypeop[0][6],
              citypeop[1][6],
              citypeop[2][6],
              citypeop[3][6],
              citypeop[4][6],
            ],
            name: cname[6],
            type: "bar",
          },
          {
            data: [
              citypeop[0][7],
              citypeop[1][7],
              citypeop[2][7],
              citypeop[3][7],
              citypeop[4][7],
            ],
            name: cname[7],
            type: "bar",
          },
          {
            data: [
              citypeop[0][8],
              citypeop[1][8],
              citypeop[2][8],
              citypeop[3][8],
              citypeop[4][8],
            ],
            name: cname[8],
            type: "bar",
          },
        ],
      },
      ChartOptions2: {
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: cprgyear,
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
        yAxis: chartYAxis,
        grid: chartGrid,
        series: [
          {
            data: [cprg[0][0], cprg[1][0], cprg[2][0], cprg[3][0]],
            name: cname[0],
            type: "line",
          },
          {
            data: [cprg[0][1], cprg[1][1], cprg[2][1], cprg[3][1]],
            name: cname[1],
            type: "line",
          },
          {
            data: [cprg[0][2], cprg[1][2], cprg[2][2], cprg[3][2]],
            name: cname[2],
            type: "line",
          },
          {
            data: [cprg[0][3], cprg[1][3], cprg[2][3], cprg[3][3]],
            name: cname[3],
            type: "line",
          },
          {
            data: [cprg[0][4], cprg[1][4], cprg[2][4], cprg[3][4]],
            name: cname[4],
            type: "line",
          },
          {
            data: [cprg[0][5], cprg[1][5], cprg[2][5], cprg[3][5]],
            name: cname[5],
            type: "line",
          },
          {
            data: [cprg[0][6], cprg[1][6], cprg[2][6], cprg[3][6]],
            name: cname[6],
            type: "line",
          },
          {
            data: [cprg[0][7], cprg[1][7], cprg[2][7], cprg[3][7]],
            name: cname[7],
            type: "line",
          },
          {
            data: [cprg[0][8], cprg[1][8], cprg[2][8], cprg[3][8]],
            name: cname[8],
            type: "line",
          },
        ],
      },
      lineChartOptions: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ename,
        },
        xAxis: {
          data: eyear,
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
        yAxis: chartYAxis,
        grid: chartGrid,
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
        series: [
          {
            data: [
              edata[0][0],
              edata[1][0],
              edata[2][0],
              edata[3][0],
              edata[4][0],
              edata[5][0],
              edata[6][0],
              edata[7][0],
              edata[8][0],
            ],
            name: ename[0],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][1],
              edata[1][1],
              edata[2][1],
              edata[3][1],
              edata[4][1],
              edata[5][1],
              edata[6][1],
              edata[7][1],
              edata[8][1],
            ],
            name: ename[1],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][2],
              edata[1][2],
              edata[2][2],
              edata[3][2],
              edata[4][2],
              edata[5][2],
              edata[6][2],
              edata[7][2],
              edata[8][2],
            ],
            name: ename[2],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][3],
              edata[1][3],
              edata[2][3],
              edata[3][3],
              edata[4][3],
              edata[5][3],
              edata[6][3],
              edata[7][3],
              edata[8][3],
            ],
            name: ename[3],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][4],
              edata[1][4],
              edata[2][4],
              edata[3][4],
              edata[4][4],
              edata[5][4],
              edata[6][4],
              edata[7][4],
              edata[8][4],
            ],
            name: ename[4],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][5],
              edata[1][5],
              edata[2][5],
              edata[3][5],
              edata[4][5],
              edata[5][5],
              edata[6][5],
              edata[7][5],
              edata[8][5],
            ],
            name: ename[5],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][6],
              edata[1][6],
              edata[2][6],
              edata[3][6],
              edata[4][6],
              edata[5][6],
              edata[6][6],
              edata[7][6],
              edata[8][6],
            ],
            name: ename[6],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][7],
              edata[1][7],
              edata[2][7],
              edata[3][7],
              edata[4][7],
              edata[5][7],
              edata[6][7],
              edata[7][7],
              edata[8][7],
            ],
            name: ename[7],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
          {
            data: [
              edata[0][8],
              edata[1][8],
              edata[2][8],
              edata[3][8],
              edata[4][8],
              edata[5][8],
              edata[6][8],
              edata[7][8],
              edata[8][8],
            ],
            name: ename[8],
            emphasis: {
              itemStyle: {},
            },
            type: "line",
          },
        ],
      },
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
    timelinechange(current) {
      var minnum = 10000000000000000000000;
      var maxnum = -10000000000000000000000;
      for (var i = 0; i < this.edata.length; i++) {
        var value = Number(this.edata[i][current.currentIndex]);
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
      for (var n = 0; n < this.edata.length; n++) {
        var value2 = Number(this.edata[n][current.currentIndex]);
        fc.push(this.ename[n]);
        fc.push(colorarr[Math.floor((value2 - minnum) / sf)]);
      }
      fc.push("#bebebe");
      window.map.setPaintProperty("geojsonid", "fill-color", fc);
      // window.map.setPaintProperty("geojsonid", "fill-color", [
      //   "match",
      //   ["get", "name"],
      //   "海口市",
      //   "#FFD273",
      //   "文昌市",
      //   "#E86D68",
      //   "#A880FF",
      // ]);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cslayer {
  position: absolute;
  top: 0;
  left: 0;
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
.page_1 {
  width: 30%;
  height: calc(100% - 50px);
  float: left;
}
.page_2 {
  width: 30%;
  height: calc(100% - 50px);
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
.sm-component-time-line {
  width: 38%;
  position: absolute;
  left: 31%;
  bottom: 10px;
}
</style>
