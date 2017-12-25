<!-- 底部栏 -->
<template>
	<div id="app-foot">
		<div class="btn-list">
			<div class="foot-btn f-cp" v-for="(item, index) in btnArr" @click.stop="dispatch(index)" v-bind:style="{background:item.bColor}">
				<i :class="item.class"></i>
			</div>
		</div>
		<el-popover ref="popover2" placement="bottom" trigger="click">
			<div class="f-tac">{{speeds}}</div>
		</el-popover>
		<div class="system-info" sw-role="cell">
			<div class="time" sw-role="cell" sw-mode="y" sw-valign="center">
				<div>{{systime}}</div>
				<div>{{sysdate}}/{{week}}</div>
			</div>
			<div class="signal">
				<canvas v-popover:popover2 id="canvas-signal" width="50" height="40"></canvas>
			</div>
		</div>

		<el-dialog title="添加快捷菜单" :visible.sync="dialogVisible">
			<el-form ref="form" :model="form" label-width="80px" label-position=top class="form-content">
				<el-form-item :label="item.data.menuText" v-for="item in moduleMenuList.navMenu" :key="item.key" v-if="item.children">
					<el-checkbox-group v-model="form.type">
						<el-checkbox v-for="child in item.children" :key="child.key" :label="child.data.menuText" :name="child.data.menuText" :checked="child.data.isFavorite"></el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item class="btn">
					<el-button type="primary" @click="onSubmit">确定</el-button>
					<el-button type="primary" @click="closeMenu">取消</el-button>
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
				speed: '0',
				btnArr: [
					{ name: 'menu', bColor: '#6f7d9b', class: 'icon-pad-menu', clickEvent: 'menuEvent' },
					{ name: 'share', bColor: '#6f7d9b', class: 'el-icon-pad-clock', clickEvent: '' },
					{ name: 'delete', bColor: '#6f7d9b', class: 'el-icon-pad-alarm', clickEvent: 'goMessage' },
					{ name: 'andon', bColor: '#6f7d9b', class: 'el-icon-pad-andon', clickEvent: '' },
					{ name: 'delete', bColor: '#6f7d9b', class: 'el-icon-pad-menu2', clickEvent: '' },
					{ name: 'delete', bColor: '#6f7d9b', class: 'el-icon-pad-edit', clickEvent: 'editMenu' },
				]
			}
		},
		created() {
			const _this = this;
			userinfo.loginUserDataInit().then((data) => {
				const date = getTime.gettime(data);
				_this.sysdate = getTime.five(date);
				_this.systime = getTime.six(date)
				_this.week = date.week;
				timer.register('systime', () => {
					_this.systime = getTime.six(data)
					data = data + 1000
				}, 1000)
			});
			if (config.apiBaseUrl.NODE_ENV === 'production' || config.apiBaseUrl.NODE_ENV === 'test') {
				timer.register('signal', async () => {
					const oldDate = new Date();
					const resp = await http.get('restful/heartbeat/connect');
					const curDate = new Date();
					if (resp.returnCode == 0) {
						_this.signalSpeed(curDate - oldDate)
						_this.speed = curDate - oldDate;
					}
					if (resp.returnCode == 8) {
						_this.signalSpeed(10000)
						_this.speed = 10000
					}
				}, 2000)
			}

		},

		methods: {
			async onSubmit() {
				const datas = [];
				const _datas = [];
				this.form.type.forEach((item,i)=>{
					this.moduleMenuList.navMenu.forEach((list)=>{
						if(list.children){
							list.children.forEach((child)=>{
								const { data }= child
								if(data.module){
									data.menuText == item ? datas.push({menuCode:data.menuCode,moduleCode:data.module.moduleCode,moduleGroupCode:data.module.moduleGroupCode,moduleType:data.module.moduleType}) : ''
								}
							});
						}
					})
				});
				datas.forEach((item,i)=>{
					Object.keys(item).forEach((child)=>{
						_datas[`userCollectionList[${i}].${child}`] = item[child]
					})
				})
				const resp = await http.post('/restful/userCollection/resetUserCollections',{body:_datas})
				this.$store.dispatch('getModuleMenus')
				this.closeMenu();
			},
			editMenu() {
				this.dialogVisible = true;
			},
			closeMenu(){
				this.dialogVisible = false;
			},
			dispatch(index) {
				const { clickEvent } = this.btnArr[index];
				clickEvent && this[clickEvent].call(this, index)
			},
			menuEvent(index) {
				this.$emit('changeNavMenu')
			},
			goMessage() {
				//userinfo.loginOut();
				router.push('message')
			},
			signalSpeed(time) {
				var canvas = document.getElementById("canvas-signal");
				if (canvas.getContext) {
					var ctx = canvas.getContext("2d");
					ctx.clearRect(0, 0, canvas.width, canvas.height)
					time < 1000 ? ctx.fillStyle = 'rgba(255,165,0,1)' : ctx.fillStyle = 'rgba(255,0,0,1)';
					ctx.arc(14, 32, 4, 0, 2 * Math.PI);
					ctx.fill();
					ctx.beginPath();
					time < 300 ? ctx.fillStyle = 'rgba(255,165,0,1)' : ctx.fillStyle = 'rgba(255,0,0,1)';
					ctx.moveTo(10, 21);
					ctx.quadraticCurveTo(25, 21, 25, 36);
					ctx.lineTo(30, 36)
					ctx.quadraticCurveTo(30, 16, 10, 16);
					ctx.lineTo(10, 21)
					ctx.fill();
					ctx.beginPath();
					time < 100 ? ctx.fillStyle = 'rgba(255,165,0,1)' : ctx.fillStyle = 'rgba(255,0,0,1)';
					ctx.moveTo(10, 9);
					ctx.quadraticCurveTo(37, 9, 37, 36);
					ctx.lineTo(42, 36);
					ctx.quadraticCurveTo(42, 4, 10, 4);
					ctx.lineTo(10, 9)
					ctx.fill();
				}
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
