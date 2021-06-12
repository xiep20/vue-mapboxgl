<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis7></MapStatis7>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis7 from "./MapStatis7.vue"
 
export default {
  name: "SDG1311",
  computed: {  
  },
  components: { MainFrame,MapStatis7 },
  data() {
    return {
      mainType:"sdg13",
      subType:"sdg1311"
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
