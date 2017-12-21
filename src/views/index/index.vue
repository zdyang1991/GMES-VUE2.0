<template>
	<div class="hello-pad" @click="closeMenu">
	    <app-head></app-head>
	    <app-body class="content"></app-body>
		<app-foot @changeNavMenu="NavMenuEmit"></app-foot>
		<transition name="el-fade-in">
			<nav-menu v-show="isShowNavMenu" @closeMenuss="closeMenu"></nav-menu>
		</transition>
 	</div>
</template>

<script>

import appFoot from './foot.vue'
import appBody from './body.vue'
import appHead from './head.vue'

import navMenu from './navmenu/index.vue'

export default {
	data(){
		return {
     		isShowNavMenu:false,
    	}
    },
    created(){
      this.$store.dispatch('getUserData');
      this.$store.dispatch('getModuleMenus');
    },
    components:{
    	appFoot,
    	appBody,
    	appHead,
    	navMenu
    },
    methods:{
  		closeMenu() {
  			this.isShowNavMenu = false;
  		},
    	NavMenuEmit(data){
    		this.isShowNavMenu = !this.isShowNavMenu
    	}
    }
}
</script>

<style lang="less" scoped>
  .hello-pad{
  	display:flex;
  	flex-direction:column;
  	height:100%;
  	width:100%;
  	overflow:hidden;
  	.content{
  		flex:1;
  	}
  }
	
</style>