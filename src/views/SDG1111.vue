<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis1></MapStatis1>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis1 from "./MapStatis1.vue"
 
export default {
  name: "SDG1111",
  computed: {  
  },
  components: { MainFrame,MapStatis1 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1111"
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
