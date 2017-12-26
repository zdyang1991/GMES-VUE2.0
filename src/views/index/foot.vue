<!-- 底部栏 -->
<template>
	<div id="app-foot">
		<div class="btn-list">
			<div class="foot-btn f-cp" v-on:click="menuClick()">
				<i class="icon-pad-menu" style="color:#6f7d9b;"></i>
			</div>
		</div>
    <navlist  :isMenuShow='isMenuShow'></navlist>
	</div>
</template>

<script>
	export default {
		data(){
			return {
        isMenuShow:false
			}
		},
		created() {


		},

		methods: {
      menuClick(){
        this.isMenuShow = !this.isMenuShow
        console.log(this.isMenuShow)
      }
    }
	}
</script>
<style lang="less" scoped>
	#app-foot {
		position: relative;
		height: 70px;
		width: 100%;
		box-shadow: 0px -2px 5px #cdcdcd;
		display: flex;
		color: #222222;
		align-items: center;
		.btn-list {
			display: flex;
			flex: 1;
		}
		.system-info {
			.time {
				text-align: right;
				font-size: 16px;
			}
		}
		.signal {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.el-checkbox-group label{
			margin-left:15px;
		}
		.form-content{
			width:100%;
			height:400px;
			overflow:auto;
			margin-bottom:20px;
			.btn{
			    position: absolute;
				bottom: -10px;
			}
		}
	}

	.title {
		flex: 1;
	}

	.foot-btn {
		margin-left: 20px;
	}

	.foot-btn {
		width: 50px;
		height: 50px;
		background: #0e69b0;
		line-height: 50px;
		text-align: center;
		color: #FFF;
		border-radius: 5px;
		font-size: 20px;
	}
</style>
