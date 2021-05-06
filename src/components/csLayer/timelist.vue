<template>
  <div class="timelist">
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
    return {
      edata,
      ename,

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
</style>
