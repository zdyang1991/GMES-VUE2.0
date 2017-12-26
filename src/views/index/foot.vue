<!-- 底部栏 -->
<template>
	<div id="app-foot">
		<div class="btn-list">
			<div class="foot-btn f-cp">
				<i class="icon-pad-menu" style="color:#6f7d9b;"></i>
			</div>
		</div>
    <navlist class="body"></navlist>
		<el-popover ref="popover2" placement="bottom" trigger="click">
			<div class="f-tac"></div>
		</el-popover>
		<div class="system-info" sw-role="cell">
			<div class="time" sw-role="cell" sw-mode="y" sw-valign="center">
				<div>{{systime}}</div>
				<div>{{sysdate}}/{{week}}</div>
			</div>
			<div class="signal">
				<canvas  id="canvas-signal" width="50" height="40"></canvas>
			</div>
		</div>

		<el-dialog title="添加快捷菜单" :visible.sync="dialogVisible">
			<el-form ref="form" :model="form" label-width="80px" label-position=top class="form-content">
				<el-form-item>
					<el-checkbox-group v-model="form.type">
						<el-checkbox ></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary">确定</el-button>
					<el-button type="primary">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					type: [],
				},
				dialogVisible: false,
				disabled: false,
				sysdate: '',
				week: '',
				systime: '',
			}
		},
		created() {


		},

		methods: {

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
