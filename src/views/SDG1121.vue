<template>
   <MainFrame :mainType="mainType" :subType="subType">
     <MapStatis2></MapStatis2>
   </MainFrame>
</template>

<script>
import MainFrame from "@/components/frame/MainFrame"
import MapStatis2 from "./MapStatis2.vue"
 
export default {
  name: "SDG1111",
  computed: {  
  },
  components: { MainFrame,MapStatis2 },
  data() {
    return {
      mainType:"sdg11",
      subType:"sdg1121"
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
