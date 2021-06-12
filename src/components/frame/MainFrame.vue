<template>
  <div id="app">
    <div class="pageRootContainer">
      <div class="banner">
        <div class="subtitle">
          {{
            mainType in SDGTypes
              ? `${SDGTypes[mainType]["name"]} --- ${SDGTypes[mainType]["subTypes"][subType]}`
              : ""
          }}
        </div>
        <div class="mainMenuBts">
          <router-link to="sdg1111">
            <div class="SdgBtDiv" style="background-image: url('/SDG2.jpg')">
              <div class="textDiv">SDG1</div>
            </div>
          </router-link>
          <router-link to="sdg1121">
            <div class="SdgBtDiv" style="background-image: url('/SDG6.jpg')">
              <div class="textDiv">SDG2</div>
            </div>
          </router-link>
          <router-link to="sdg1131">
            <div class="SdgBtDiv" style="background-image: url('/SDG11.jpg')">
              <div class="textDiv">SDG3</div>
            </div>
          </router-link>
          <router-link to="sdg1151">
            <div class="SdgBtDiv" style="background-image: url('/SDG13.jpg')">
              <div class="textDiv">SDG4</div>
            </div>
          </router-link>
          <router-link to="sdg1161">
            <div class="SdgBtDiv" style="background-image: url('/SDG14.jpg')">
              <div class="textDiv">SDG5</div>
            </div>
          </router-link>
          <router-link to="sdg1171">
            <div class="SdgBtDiv" style="background-image: url('/SDG15.jpg')">
              <div class="textDiv">SDG6</div>
            </div>
          </router-link>
          <!-- <span class="colors">2021</span>年 <span class="colors">06</span>月
          <span class="colors">09</span>日 <span class="weeks">星期三</span
          ><span class="colors">10:33:47</span> -->
        </div>
        <div class="back">
          <!-- <i  class="el-icon-switch-button"></i> -->
        </div>
        <div class="bannerTitle">
          <h1>海南省城市可持续发展指标监测与评估系统</h1>
        </div>
      </div>
      <div class="FrameMainPanel">
        <div class="Nav" @mouseover="enter">
          <transition-group
            enter-active-class="fadeInLeft"
            leave-active-class="fadeOutLeft"
            :duration="{ enter: 300, leave: 800 }"
          >
            <div
              key="1"
              :class="{
                'nav-unactive': true,
                'nav-inner': true,
                animated: true,
              }"
              v-show="!bShowMenu"
            ></div>

            <div
              key="11"
              v-show="bShowMenu"
              :class="{
                'nav-active': true,
                'nav-inner': true,
                animated: true,
                centerbox: true,
              }"
              @mouseleave="leave"
            >
              <div class="menuContainer" v-if="mainType in SDGTypes">
                <div
                  v-for="(item, i) in Object.keys(
                    SDGTypes[mainType]['subTypes']
                  )"
                  :class="{ menuItem: true, currentMenuItem: item == subType }"
                  :key="i"
                >
                  <router-link :to="item">
                    <div>{{ SDGTypes[mainType]["subTypes"][item] }}</div>
                  </router-link>
                  <div class="hr"></div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <div class="MainContainer">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // class="nav-inner nav-unactive"
  // class="nav-inner nav-active centerbox"
  props: ["mainType", "subType"],
  name: "MainFrame",
  computed: {},
  components: {},
  data() {
    return {
      bShowMenu: false,
      SDGTypes: {
        sdg11: {
          name: "SDG11",
          subTypes: {
            sdg1111: "低保人数",
            sdg1121: "公共交通",
            sdg1131: "城市土地利用效率",
            sdg1151: "城市灾害",
            sdg1161: "城市环境",
            sdg1171: "城市公共开放空间",
          },
        },
        sdg13: {
          name: "SDG13",
          subTypes: {
            sdg1311: "灾害评估",
            sdg1322: "温室气体排放量",
          },
        },
      },
    };
  },
  watch: {},
  mounted() {},
  methods: {
    enter: function () {
      this.bShowMenu = true;
    },
    leave: function () {
      this.bShowMenu = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only
<style src="@/styles/app.css"  scoped></style> -->
<style scoped>
.Nav {
  position: absolute;
  width: 0.35rem;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 9;
}

.Nav .nav-inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: pointer;
}
.Nav .menuContainer {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.Nav .menuItem {
  width: 100%;
  padding: 0.2rem 0.2rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 1rem;
  text-align: center;
  position: relative;
}
.Nav .menuItem .children-nav {
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  margin: auto;
  width: 2rem;
  padding: 0.1rem;
  display: none;
}
.Nav .menuItem .children-nav .children-inner {
  padding: 0.16rem;
  width: 100%;
  background: #02194c;
  -webkit-box-shadow: 6px 6px 6px #5896ff;
  box-shadow: 6px 6px 6px #5896ff;
}
.Nav .menuItem .children-nav .children-inner .children-item {
  padding: 0.1rem 0;
}
.Nav .menuItem .children-nav .children-inner .children-item:hover,
.Nav .menuItem:hover {
  color: #24ace1;
}
.Nav .menuItem:hover .children-nav {
  display: block;
}
.Nav .nav-inner .currentMenuItem .hr {
  width: 0;
  height: 0.04rem;
  margin-top: 0.04rem;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.Nav .nav-inner .currentMenuItem .hr {
  width: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#0f8be6),
    to(#08fff6)
  );
  background: linear-gradient(90deg, #0f8be6, #08fff6);
}
.Nav .nav-inner .currentMenuItem {
  color: #24ace1;
}
.Nav .nav-unactive {
  width: 35px;
  height: 100%;
  background: url(../../assets/nav-unactive.png) no-repeat;
  background-size: 100% 100%;
}
.Nav .nav-active {
  width: 132px;
  height: 100%;
  background: url(../../assets/nav-active.png) no-repeat;
  background-size: 100% 100%;
}
.pageRootContainer {
  width: 100%;
  height: 100%;
  background: url(../../assets/homebg.png) 50% no-repeat;
  background-size: 100% 100%;
}
.pageRootContainer .banner {
  width: 100%;
  height: 81px;
  background: url(../../assets/title.png) 50% no-repeat;
  background-size: 100% 81px;
  position: relative;
}
.pageRootContainer .banner .subtitle {
  left: 60px;
  width: 230px;
  background: url(../../assets/subtitle.png) no-repeat;
  background-size: 100% 100%;
  font-weight: 400;
  color: #eaeaf1;
}
.pageRootContainer .banner .subtitle {
  position: absolute;
  top: 35px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 16px;
  right: 5px;
}
.pageRootContainer .banner .mainMenuBts {
  position: absolute;
  top: 20px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-size: 16px;
  right: 5px;
}
.SdgBtDiv {
  position: relative;
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-right: 8px;
  /* background:url("../../assets/SDG11.jpg"); */
  border: 5px solid #06b6d8;
  box-shadow: 0 0 7px 2px #06b6d8;
  border-radius: 50%;
  background-size: 100% 100%;
  cursor: pointer;
  transition: 0.2s linear;
}
.SdgBtDiv .textDiv {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 10px;
  top: 8px;
  font-weight: bold;
  height: 18px;
  line-height: 18px;
  /* color: #052636;
  text-shadow: 1px 1px 2px #0c7399; */
      color: #c2c2c2;
    text-shadow: 1px 1px 2px #1d1045;
}
.SdgBtDiv:hover {
  /* width:52px;
  height:52px; */
  border-radius: 0;
}
.SdgBtDiv:hover .textDiv {
  display: none;
}
.SdgBtDiv img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.pageRootContainer .banner .time {
  right: 50px;
  width: 300px;
}
.pageRootContainer .banner .time .colors {
  color: #2ba0ff;
  font-family: DINPRO;
}
.pageRootContainer .banner .time .weeks {
  display: inline-block;
  margin: 0 20px;
}
.pageRootContainer .banner .back {
  position: absolute;
  top: 40px;
  right: 20px;
  font-size: 28px;
  cursor: pointer;
}
.pageRootContainer .FrameMainPanel {
  width: 100%;
  height: calc(100% - 81px);
  position: relative;
}
.pageRootContainer .FrameMainPanel .MainContainer {
  position: relative;
  margin-left: 35px;
  width: calc(100% - 35px);
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 2;
}

.bannerTitle {
  margin-left: 30.5%;
  width: 40%;
  height: 1rem;
  background-size: 100% 100%;
  text-align: center;
  line-height: 1rem;
  height: 75px;
}
h1 {
  font-size: 21pt;
  color: #ffffff;
  letter-spacing: 0.2rem;
  text-shadow: 0 0 0.5rem #00d8ff;
  padding-left: 0.15rem;
  padding-top: 24px;
}
</style>
