<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis4></MapStatis4>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis4 from "./MapStatis4.vue"
 
export default {
  name: "SDG1151",
  computed: {  
  },
  components: { MainFrame,MapStatis4 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1151"
    }
  },
  props: {},
  watch: {
   
  },
  mounted() {},
  methods: {
    
  },
};
</script>
 
<style scoped> 
</style>
