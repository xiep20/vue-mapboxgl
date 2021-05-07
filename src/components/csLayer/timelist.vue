<template>
  <div class="timelist">
    <sm-time-line
      :data="timelist"
      autoPlay="true"
      @timelinechanged="timelinechange"
    >
    </sm-time-line>
    <sm-text-list
      :content="textcontent"
      :header="[
        '低保人口',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
      ]"
      :fields="[
        'city',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
      ]"
      :headerStyle="headerStyle"
      :rowStyle="rowStyle"
      :rows="rows"
      :autoResize="true"
      :autoRolling="true"
    ></sm-text-list>
    <div class="page_3">
      <sm-border type="border9" class="common-border cb_5">
        <div class="card_tit">
          <span style="color: #ff0000">[{{ this.seltime }}年]</span> 低保人口
        </div>
        <sm-chart icon-class="" :options="s2ChartOptions"></sm-chart>
      </sm-border>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "timelist",
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
    return {
      edata,
      ename,

      timelist: eyear,
      seltime: eyear[0],

      s2ChartOptions: {
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
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
          },
          {
            start: 0,
            end: 100,
          },
        ],
        xAxis: [
          {
            type: "category",
            data: ename,
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
            type: "bar",
            barWidth: "60%",
            data: edata[0],
          },
        ],
      },
      rows: 3,
      headerStyle: {},
      rowStyle: {
        oddStyle: {
          background: "#5278b1bb",
        },
        evenStyle: {
          background: "#2196F3bb",
        },
        height: 36,
      },
      textcontent: [],
    };
  },
  props: {},
  mounted() {
    var arr = [];
    for (var i = 0; i < this.edata.length; i++) {
      for (var ii = 0; ii < this.edata[i].length; ii++) {
        if (i === 0) {
          arr.push({ city: this.ename[ii] });
        }
        arr[ii][this.timelist[i]] = this.edata[i][ii];
      }
    }
    this.textcontent = arr;
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
      for (var i = 0; i < this.edata[current.currentIndex].length; i++) {
        var value = Number(this.edata[current.currentIndex][i]);
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
      for (var n = 0; n < this.edata[current.currentIndex].length; n++) {
        var value2 = Number(this.edata[current.currentIndex][n]);
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
      this.seltime = this.timelist[current.currentIndex];
      this.s2ChartOptions.series = [
        {
          type: "bar",
          barWidth: "60%",
          data: this.edata[current.currentIndex],
        },
      ];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timelist {
  position: absolute;
  top: 80%;
  left: 0;
  bottom: 0;
  right: 0;
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
.page_3 {
  position: fixed;
  top: 50px;
  right: 0%;
  width: 30%;
  height: 30%;
  float: right;
}
.cb_5 {
  width: 100%;
  height: calc(100% - 15px);
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
.sm-component-text-list {
  position: fixed;
  top: 60px;
  left: 31%;
  width: 38%;
}
.sm-component-text-list .sm-component-text-list__list {
  color: #ff0000;
}
</style>
