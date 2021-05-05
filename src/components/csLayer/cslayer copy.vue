<template>
  <div class="cslayer">
    <div class="page_0">
      <span>——————海南城市****分析</span>
    </div>
    <div class="page_1">
      <sm-border type="border1" class="common-border cb_1">
        <sm-chart icon-class="" :options="barChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border8" class="common-border cb_2">
        <sm-chart icon-class="" :options="lineChartOptions"></sm-chart>
      </sm-border>
    </div>
    <div class="page_2">
      <sm-border type="border9" class="common-border cb_3">
        <sm-chart icon-class="" :options="scatterChartOptions"></sm-chart>
      </sm-border>
      <sm-border type="border1" class="common-border cb_4">
        <sm-chart icon-class="" :options="radarChartOptions"></sm-chart>
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
    var chartXAxis = {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        rotate: 0,
        fontFamily: "MicrosoftYaHei",
      },
      show: true,
      name: "",
      nameGap: 2,
      nameLocation: "end",
      type: "category",
    };
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
      // 和echarts一样的配置
      barChartOptions: {
        xAxis: chartXAxis,
        yAxis: chartYAxis,
        grid: chartGrid,
        series: [
          {
            data: ["500", "800", "3000", "3617", "3400", "4200", "1842"],
            name: "Y2",
            type: "bar",
          },
          {
            data: ["100", "520", "2000", "3340", "3900", "3300", "2500"],
            name: "Y1",
            type: "bar",
          },
          {
            data: ["1", "1", "0", "0", "0", "1", "0"],
            name: "Y3",
            emphasis: {
              itemStyle: {},
            },
            type: "bar",
          },
        ],
      },
      lineChartOptions: {
        xAxis: chartXAxis,
        yAxis: chartYAxis,
        grid: chartGrid,
        series: [
          {
            data: ["3900", "3340", "3300", "2500", "2000", "520", "100"],
            name: "Y1",
            emphasis: {
              itemStyle: {},
            },
            type: "line",
            smooth: false,
          },
          {
            data: ["3400", "3617", "4200", "1842", "3000", "800", "500"],
            name: "Y2",
            emphasis: {
              itemStyle: {},
            },
            type: "line",
            smooth: false,
          },
        ],
      },
      scatterChartOptions: {
        xAxis: {
          data: [
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
            "乐东县",
            "琼中县",
            "保亭县",
            "陵水县",
            "白沙县",
            "昌江县",
          ],
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
            data: ["3900", "3340", "3300", "2500", "2000", "520", "100"],
            name: "Y1",
            emphasis: {
              itemStyle: {},
            },
            type: "scatter",
          },
          {
            data: ["3400", "3617", "4200", "1842", "3000", "800", "500"],
            name: "Y2",
            emphasis: {
              itemStyle: {},
            },
            type: "scatter",
          },
        ],
      },
      radarChartOptions: {
        radar: {
          indicator: [
            {
              max: "500",
              name: "Mon",
            },
            {
              max: "800",
              name: "Tue",
            },
            {
              max: "3000",
              name: "Wed",
            },
            {
              max: "3617",
              name: "Thu",
            },
            {
              max: "3400",
              name: "Fri",
            },
            {
              max: "4200",
              name: "Sat",
            },
            {
              max: "1842",
              name: "Sun",
            },
          ],
          shape: "circle",
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {},
          },
          name: {
            textStyle: {},
          },
          splitLine: {
            lineStyle: {},
          },
          splitNumber: 5,
          radius: "70%",
        },
        grid: {
          top: 35,
          left: 50,
          bottom: 25,
        },
        legend: {
          data: ["Y1"],
          textStyle: {},
          show: false,
          top: "auto",
          bottom: "auto",
        },
        series: [
          {
            barWidth: "80%",
            data: [
              {
                name: "Y1",
                value: ["100", "520", "2000", "3340", "3900", "3300", "2500"],
              },
            ],
            name: "示范数据",
            emphasis: {
              itemStyle: {},
            },
            type: "radar",
          },
        ],
        tooltip: {
          axisPointer: {
            shadowStyle: {},
            type: "shadow",
          },
          trigger: "axis",
          textStyle: {
            align: "left",
          },
        },
        textStyle: {
          fontFamily: "Microsoft YaHei Light",
        },
        title: {
          padding: [5, 0, 0, 20],
          x: "left",
          text: "",
          textStyle: {
            fontFamily: "Microsoft YaHei Light",
            fontWeight: "100",
          },
        },
      },
    };
  },
  props: {},
  mounted() {
    //{{resources.text_opt_border}}最好配上透明主题， body设置一个底色
    window.SuperMap.Components.setTheme({
      textColor: "#eee",
      background: "rgba(0,0,0,0)",
      colorGroup: [
        "#3fb1e3",
        "#6be6c1",
        "#626c91",
        "#a0a7e6",
        "#c4ebad",
        "#96dee8",
      ],
    });
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
.page_0 {
  width: 100%;
  height: 50px;
  background: #38757b;
  font-size: 24px;
  padding: 0 20px;
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
  height: 50%;
  float: left;
}
.cb_2 {
  width: 100%;
  height: 50%;
  float: left;
}
.cb_3 {
  width: 100%;
  height: 50%;
  float: right;
}
.cb_4 {
  width: 100%;
  height: 50%;
  float: right;
}
</style>
