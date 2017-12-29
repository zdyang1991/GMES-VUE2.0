<template>
 	<div class="content-body">

    <router-view></router-view>
	</div>
</template>

<script>


export default {
	data(){
		return {}
	}

}
</script>
<style lang="less" scoped>
  .content-body{
  	width:100%;
  	height:100%;
  	background: #ededed;
  	overflow:hidden;
  }

</style>
