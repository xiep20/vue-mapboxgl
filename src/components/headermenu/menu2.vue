<template>
  <div class="headermenu">
    <div class="menu_item">
      <router-link
        :class="Isactive === '1' ? 'selIsactive' : 'isno'"
        to="/MapStatis1"
        >SDG1</router-link
      >
    </div>
    <div class="menu_item">
      <router-link
        :class="Isactive === '2' ? 'selIsactive' : 'isno'"
        to="/MapStatis2"
        >SDG2</router-link
      >
    </div>
    <div class="menu_item">
      <router-link
        :class="Isactive === '3' ? 'selIsactive' : 'isno'"
        to="/MapStatis3"
        >SDG3</router-link
      >
    </div>
    <div class="menu_item">
      <router-link
        :class="Isactive === '4' ? 'selIsactive' : 'isno'"
        to="/MapStatis4"
        >SDG4</router-link
      >
    </div>
    <div class="menu_item">
      <router-link
        :class="Isactive === '5' ? 'selIsactive' : 'isno'"
        to="/MapStatis5"
        >SDG5</router-link
      >
    </div>
    <div class="menu_item">
      <router-link
        :class="Isactive === '6' ? 'selIsactive' : 'isno'"
        to="/MapStatis6"
        >SDG6</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "headermenu",
  computed: {},
  data() {
    return {};
  },
  props: {
    Isactive: {
      type: String,
    },
  },
  mounted() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headermenu {
  font-size: 18px;
  position: absolute;
  top: 10px;
  right: 50px;
}
.menu_item {
  float: left;
  font-weight: 800;
  margin: 5px 10px;
  padding: 2px 8px;
  border-radius: 5px;
}
.isno {
  color: #b3b3b3;
}
.selIsactive {
  color: #3399e5;
}
</style>
