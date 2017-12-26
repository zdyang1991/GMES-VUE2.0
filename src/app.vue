<template>
	<div id="app">
		<!-- 内置动画 -->
		<transition name="el-fade-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import './css/iconfont.css'
	export default {
		name: 'app',
		data() {
			return {

			}
		},
		methods: {
			// 设置缩放比
			// pad 1024*700
			// 普通电视机 960*484
			// 盒子电视机 1920*1020
			setViewport() {
				var vp = jQuery("meta[name=viewport]")[0];
				var sw = jQuery(window).width();
				var sh = jQuery(window).height();
				var stand = 1400;
				var sca = sw / stand;

				// pad不需要处理
				if ((sh > 600) && (sw < 1100)) {
					return;
				}

				//
				vp.content = "width=device-width,initial-scale=" + sca 　+ ", maximum-scale=" + sca 　+ ", minimum-scale=" + sca 　+ ", user-scalable=no";
			}
		},
		created() {
			if (!localStorage.access_token) {
				router.push('/login')
			} else {
				userinfo.isLogin(() => {
					router.push('/login')
				})
			}
			//this.setViewport();
		}
	}

</script>
<style>
	html,
	body {
		height: 100%;
		margin: 0;
	}

	#app {
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		display: flex;
		flex-direction: column;
		min-width: 1024px;
	}
</style>
