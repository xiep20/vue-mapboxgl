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
      :header="textlistheader"
      :fields="textlistfields"
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
    return {
      ename: [],

      timelist: [],
      seriesdata: [],
      seltime: "",

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
            type: "bar",
            barWidth: "60%",
            data: [],
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
      textlistheader: [],
      textlistfields: [],
    };
  },
  props: {},
  mounted() {
    this.dibao();
    document.getElementsByTagName("body")[0].style.background =
      "rgba(0, 0, 0, 0.9)";
  },
  methods: {
    ...mapMutations({
      setMapEchartsOptions: "setMapEchartsOptions",
    }),

    // 低保人口
    dibao() {
      var _this = this;
      _this.$http.get("data/dibao.json").then((data) => {
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
        this.textcontent = arr;
        this.textlistheader = ["低保人口"].concat(xdata);
        this.textlistfields = ["city"].concat(xdata);
        _this.s2ChartOptions.xAxis[0].data = ldata;
        _this.s2ChartOptions.series[0].data = seriesdata[0];
        _this.timelist = xdata;
        _this.ename = ldata;
        _this.seltime = xdata[0];
        _this.seriesdata = seriesdata;
      });
    },
    timelinechange(current) {
      var minnum = 10000000000000000000000;
      var maxnum = -10000000000000000000000;
      for (var i = 0; i < this.seriesdata[current.currentIndex].length; i++) {
        var value = Number(this.seriesdata[current.currentIndex][i]);
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
      for (var n = 0; n < this.seriesdata[current.currentIndex].length; n++) {
        var value2 = Number(this.seriesdata[current.currentIndex][n]);
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
          data: this.seriesdata[current.currentIndex],
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
  top: 0px;
  /* height: calc(100% - 40px); */
  height: 100%;
}
.sm-component-time-line {
  width: 38%;
  position: absolute;
  left: 31%;
  bottom: 10px;
}
.page_3 {
  position: fixed;
  top: 75px;
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
.sm-component-text-list {
  position: fixed;
  top: 74px;
  left: 31%;
  width: 38%;
}
.sm-component-text-list .sm-component-text-list__list {
  color: #ff0000;
}
.sm-component-text-list {
  height: 130px;
}
</style>
