<!-- 侧边栏 -->
<template>
	<div id="nav-menu" @click.stop>
		<router-link :to="'\/userCenter'">
		<div class="head" @click="closeMenus">
			<div class="logo"></div>
			<div class="info">
					<div class="info-name f-ell" :title="userData.userText"><span class="f-fs16">{{userData.userText}}</span><span class="f-fs12 f-ml3" :title="userData.userCode">({{userData.userCode}})</span></div>
				<div class="f-fs12 f-mt3 f-ell">用户站点 ({{station}})</div>
			</div>

		</div>
		</router-link>
		<nav-list class="body" @closeMenu="closeMenus"></nav-list>
		<div class="foot">
			<el-button @click="loginOut" type="primary" icon="pad-off" class="loginOut">退出登录</el-button>
		</div>
	</div>
</template>

<script>
	import navList    from './navlist.vue'

	export default {
		data(){
			return {
				navMenuList:[],
				jobInfo: "暂无岗位信息",
				stationInfo: "暂无站点信息"
			}
		},

		components:{
			navList,
		},
		methods:{
			loginOut(){
				userinfo.loginOut()
			},
			closeMenus(data){
				this.$emit('closeMenuss')
			}
		}
	}
</script>

<style scoped>
	/* 滚动条样式 */
	.body::-webkit-scrollbar { width:7px;border-radius:5px;height:10px;}/* 滚动条整体部分 */
	.body::-webkit-scrollbar-track { background-color:#324157;width:7px; }/* 滚动条轨道 */
	.body::-webkit-scrollbar-thumb { background-color: rgb(110, 114, 121);width:7px;height:10px; border-radius:10px;}/* //滚动条内的小方块 */
	.body::-webkit-scrollbar-thumb:hover {background-color:#a5b2c4;}

	#nav-menu{
		border: 1px solid #2e547e;
		width:225px;
		top:55px;
		display:flex;
		flex-direction:column;
		position:absolute;
		bottom:70px;
		left:10px;
		background-color:#0e69b0;
		border-radius: 3px;
		color: #fff;
		box-sizing: border-box;
		z-index:999;
	}

	.head{
		width:100%;
		height: 65px;
		display:flex;
		align-items:center;
		background: #26588c;
		color:#FFF;
	}

	.logo{
		width:42px;
		height:42px;
		border-radius:100%;
		background-image:url("../../../assets/avatar.png");
		background-size:cover;
		background-color:#FFF;
		margin:0 16px;
	}

	.info {
		width: 150px;
	}

	.info a {
		color:#f1f5f8;
	}

	.body{
		flex:1;
		overflow:auto;
		background: #324157;
	}

	.foot{
		width:100%;
		height:50px;
		display:flex;
		align-items:center;
		text-align:center;
		justify-content: center;
		border-top:1px solid #26588c;
		background:#26588c;
	}

	.foot span {
		margin-left:8px;
	}
	#nav-menu:after{
		content: '';
		display: block;
		width: 0;
		height: 0;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		border-top: 15px solid #26588c;
		position: absolute;
		left: 22px;
		bottom: -10px;
	}
	.loginOut {
		border-width:0px;
		background-color:#26588c;
	}
	.loginOut:hover {
		background-color:#16487A;
	}
</style>
