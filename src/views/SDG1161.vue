<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis5></MapStatis5>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis5 from "./MapStatis5.vue"
 
export default {
  name: "SDG1161",
  computed: {  
  },
  components: { MainFrame,MapStatis5 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1161"
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
