<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis6></MapStatis6>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis6 from "./MapStatis6.vue"
 
export default {
  name: "SDG1171",
  computed: {  
  },
  components: { MainFrame,MapStatis6 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1171"
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
