<template>
	<div style="color:#FFF;" class="tab-pane"  v-show="active">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				scrollH:'',
			}
		},
		props:{
	       label: String,
	       name: String,
		},
		computed:{
			active(){
				return this.$parent.currentName == this.name ;
			}
		},
		methods:{
			
		},
		mounted() {
	        this.$parent.addPanes(this);
	    },
		
	}
</script>
<style lang="less" scoped>
	.tab-pane{
		overflow:auto;
		height:100%;
	}

</style>



