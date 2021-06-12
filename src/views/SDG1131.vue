<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis3></MapStatis3>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis3 from "./MapStatis3.vue"
 
export default {
  name: "SDG1111",
  computed: {  
  },
  components: { MainFrame,MapStatis3 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1131"
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
