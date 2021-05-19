<template>
  <div class="rightEcharts">
    <div class="page_2">
      <sm-border type="border1" class="common-border cb_3">
        <div class="card_tit">
          <span style="color: #ff0000">[{{ this.selname }}]</span>低保人口
        </div>
        <sm-chart icon-class="" :options="s2ChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_4">
        <div class="card_tit">
          <span style="color: #ff0000">[{{ this.selname }}]</span>低保人口
        </div>
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
    return {
      ename: [],
      selnum: 0,
      selname: "",

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
      seriesdata: [],
    };
  },
  props: {},
  mounted() {
    this.dibao();
    document.getElementsByTagName("body")[0].style.background =
      "rgba(0, 0, 0, 0.9)";
    this.timechange();
  },
  methods: {
    ...mapMutations({
      setMapEchartsOptions: "setMapEchartsOptions",
    }),

    // 低保
    dibao() {
      var _this = this;
      _this.$http.get("data/dibao.json").then((data) => {
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

        _this.s2ChartOptions.xAxis[0].data = year;
        _this.s2ChartOptions.series[0].name = ldata[0];
        _this.s2ChartOptions.series[0].data = seriesdata[0];

        _this.s3ChartOptions.series[0].name = ldata[0];

        var arr = [];
        for (var a = 0; a < year.length; a++) {
          arr.push({ value: seriesdata[0][a], name: year[a] });
        }
        _this.s3ChartOptions.series[0].data = arr;

        _this.selnum = 0;
        _this.timelist = year;
        _this.ename = ldata;
        _this.selname = ldata[0];
        _this.seriesdata = seriesdata;
      });
    },
    timechange() {
      var _this = this;
      setInterval(() => {
        if (_this.selnum === 17) {
          _this.selnum = 0;
        } else {
          _this.selnum = _this.selnum + 1;
        }

        _this.selname = _this.ename[_this.selnum];

        _this.s2ChartOptions.series[0].name = _this.ename[_this.selnum];
        _this.s2ChartOptions.series[0].data = _this.seriesdata[_this.selnum];

        _this.s3ChartOptions.series[0].name = _this.selname;

        var arr = [];
        for (var a = 0; a < _this.timelist.length; a++) {
          arr.push({
            value: _this.seriesdata[_this.selnum][a],
            name: _this.timelist[a],
          });
        }
        _this.s3ChartOptions.series[0].data = arr;
      }, 5000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rightEcharts {
  position: absolute;
  top: calc(30% + 50px);
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
