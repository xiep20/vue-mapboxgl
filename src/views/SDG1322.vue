<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis8></MapStatis8>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis8 from "./MapStatis8.vue"
 
export default {
  name: "SDG1111",
  computed: {  
  },
  components: { MainFrame,MapStatis8 },
  data() {
    return {
      mainType:"sdg13",
      subType:"sdg1322"
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
