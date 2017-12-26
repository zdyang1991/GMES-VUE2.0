<template>
	<div class="hello-pad" @click="closeMenu">
	    <app-head></app-head>
	    <app-body class="content"></app-body>
		  <app-foot @changeNavMenu=""></app-foot>
 	</div>
</template>

<script>

import appFoot from './foot.vue'
import appBody from './body.vue'
import appHead from './head.vue'
//import navMenu from './navmenu/index.vue'

export default {
	data(){
		return {
     		isShowNavMenu:false,
    	}
    },
    created(){

    },

    components:{
    	appFoot,
    	appBody,
    	appHead,
    },
    methods:{
  		closeMenu() {
  			this.isShowNavMenu = false;
  		},
    	NavMenuEmit(data){
    		this.isShowNavMenu = !this.isShowNavMenu
    	},
      changeNavMenu(){
    	  console.log(q11)
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
