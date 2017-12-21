<template>
  <div id="app-head">
      <a href="/#home" class="f-df"><img src="../../assets/logo.png"/></a>
      <div class="title">{{title}}</div>
      <img src="../../assets/evun_logo.png"/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
	data() {
		return {

    }
	},  
  computed:{
    title(){
      return this.$store.state.common.headTitle;
    }
  }
 
}
</script>
<style lang="less" scoped>
  #app-head{
    height:50px;
    width:100%;
    background: #2F6298;
    box-shadow: 0px 1px 4px #FF5000;
    display:flex;
    align-items: center;
    color:#FFF;
    img{
      padding:0 20px;
    }
    .title{
      flex:1;
      font-size: 0.8rem;
    }
  }
	
</style>