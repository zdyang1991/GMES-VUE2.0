<template>
	<div id="userCenter">
		<el-tabs type="border-card">
			<el-tab-pane label="用户资料">
				<el-form :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
					<el-form-item label="用户名">
						<el-input v-model="userData.username" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input v-model="userData.userText" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="工厂">
						<el-input v-model="userData.siteCode" :disabled=true></el-input>
					</el-form-item>

					<el-form-item label="站点">
						<el-input v-model="compStationStr" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="电话">
						<el-input v-model="userData.telephone" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<el-input v-model="userData.email" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="手机">
						<el-input v-model="userData.telephone" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="工作中心">
						<el-input v-model="userData.userTypeECode" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="工位">
						<el-input :disabled=true></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>

			<el-tab-pane label="修改密码">消息中心</el-tab-pane>

			<el-tab-pane label="环境信息">
				<el-form label-width="110px" :model="formInline" class="demo-form-inline">
					<el-form-item label="版本号">
						<el-input v-model="sysInfo.version" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="系统地址">
						<el-input v-model="sysInfo.address" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="系统说明">
						<el-input v-model="sysInfo.system" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="设备Mac地址">
						<el-input v-model="sysInfo.macAddress" :disabled=true></el-input>
					</el-form-item>
					<el-form-item label="可操作站点">
						<el-input v-model="compStationStr" :disabled=true></el-input>
					</el-form-item>
				</el-form>
			</el-tab-pane>

			<el-tab-pane label="意见反馈">
				<el-form :inline="true" label-width="80px" :model="formInline" class="demo-form-inline">
					<el-form-item label="活动区域">
						<el-select v-model="formInline.region" placeholder="活动区域">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域二" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import userinfo from '@/js/userinfo'
	import config from '@/js/config'
	export default {
		data() {
			return {
				formInline: {
					user: '',
					region: ''
				},
				sysInfo: userinfo.sysInfo(),
			}
		},
		created() {
			// userinfo.isUniqueOperableStation(this.opreStation);
			this.$store.dispatch('setTitle', '个人中心');

		},
		mounted: function () {
			// console.log(userinfo.aaa());
		},
		computed: {
			...mapGetters({
				userData: "recorduserData",
				operuserStations: "recordoperuserStations"
			}),
			compStationStr() {
				var str = "";
				for (var key in this.operuserStations) {
					str += key + " ";
				}
				return str;
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>
<style lang="less" scoped>
	#userCenter {
		display: flex;
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
	}

	.el-tabs {
		width: 100%;
	}
</style>
