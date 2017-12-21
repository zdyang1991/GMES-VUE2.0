<!-- 安灯多层 -->
<template>
	<div id="andonPullCordsMultilevelOperate" v-loading=loadFlag>
		<!-- 左侧菜单栏开始 -->
		<div class="left">
			<div class="pullRope">
				<div class="pullRopeTop">
					<label>拉绳按钮</label>
				</div>
				<!-- 点击框 -->
				<div class="andon-switch" :style="setBackground(pullAndon)" title="点击触发拉绳" @click="triggerSwitch"></div>
			</div>

			<div class="stationCont">
				<div class="nowStation" :title=nowWorkStation.stationText v-html=nowWorkStation.stationText></div>
			</div>

			<!-- 工位列表开始 -->
			<div class="list-block">
				<ul>
					<el-radio-group size="large" v-model="nowWorkStation">
						<li v-for="(item, index) in workStationList">
							<el-radio class="radio" :label="item">{{item.stationText}}</el-radio>
						</li>
					</el-radio-group>
				</ul>
			</div>
			<!-- 工位列表结束 -->
		</div>
		<!-- 左侧菜单栏结束 -->

		<!-- 右侧功能区开始 -->
		<div class="swiper-custom rightContent">

			<!-- 顶部菜单 -->
			<div class="andon-title">
				<template v-if="isMainShow === true">
					<div class="tabs on">拉绳首页</div>
				</template>
				<template v-else>
					<template v-if="showAll === true">
						<div class="tabs on f-cp">全部</div>
						<div @click="showAllEvent(false)" class="tabs f-ml5 f-cp">异常</div>
					</template>
					<template v-else>
						<div @click="showAllEvent(true)" class="tabs f-cp">全部</div>
						<div class="tabs f-ml5 f-cp on">异常</div>
					</template>
				</template>
				<div class="andon-return" v-show="isMainShow === false && singleLevel === false" @click="returnIndex">返回上层</div>
			</div>
			<!-- 顶部菜单结束 -->

			<div class="container">

				<!-- 主幻灯片contain开始 -->
				<el-carousel :autoplay="false" height="100%" :initial-index=0 arrow="always" v-show="isMainShow === true">

					<div v-if="compMainModule.length > 0">
						<el-carousel-item v-for="mainPage in compMainModule" :key="1">
							<!-- 弹性盒子容器开始 -->
							<div class="swiper-box">

								<!-- 单个安灯开始  -->
								<div v-for="item in mainPage" class="item-simple">
									<a class="enter-container">

										<div v-if="item.touchAble" class="enter-box" :style="setBackground(item)" @click="switchToSec(item)">
											<div class="item-text" :style="item.andonText | setFontSize">{{item.andonText}}</div>
											<div class="conut">({{item.childAndonTouchedCount}}/{{item.childAndonCount}})</div>
										</div>
										<div v-else class="enter-box andon-disabled">
											<div class="item-text" :style="item.andonText | setFontSize">{{item.andonText}}</div>
											<div class="conut">(需要先触发拉绳)</div>
										</div>

										<div v-if="item.touchAble === true" class="enter" @click="switchToSec(item)">进入详情</div>
										<div v-else class="enter f-cna">暂无详情</div>
									</a>
								</div>
								<!-- 单个安灯结束 -->
							</div>

							<!-- 弹性盒子容器结束 -->
						</el-carousel-item>
					</div>
					<div v-else class="img-container no-info"></div>
				</el-carousel>
				<!-- 主幻灯片contain结束 -->

				<!-- 次幻灯片contain开始 -->
				<el-carousel :autoplay="false" height="100%" :initial-index=0 arrow="always" v-show="isMainShow === false">

					<div v-if="compSecModule.length > 0">
						<el-carousel-item v-for="secPage in compSecModule" :key="1">

							<!-- 弹性盒子容器开始 -->
							<div class="swiper-box">

								<!-- 单个安灯开始  -->
								<div v-for="item in secPage" class="item-simple">
									<a class="enter-container" :style="setBackground(item)">
										<div class="sec-item-text">
											<div class="item-text" :style="item.andonText | setFontSize">{{item.andonText}}</div>
											<div v-if="item.touchAble && item.status == 1" class="item-time">{{item.finalTime}}</div>
										</div>

										<template v-if="item.touchAble">
											<div v-if="item.status == 3" class="operate">
												<b @click="andonOperate(item)" class="operate-item f-cp">ANDON</b>
											</div>
											<div v-else-if="item.status == 1" class="operate">
												<b @click="andonOperate(item)" class="operate-item f-cp">关闭</b>

												<el-dropdown v-if="item.extendFeatures" trigger="click" @click.native="nowItem = item">
													<el-button type="primary">
														操作
														<i class="el-icon-arrow-down el-icon--right"></i>
													</el-button>
													<el-dropdown-menu slot="dropdown">
														<template v-for="value in item.extendFeatures[0]">
															<el-dropdown-item v-if="value === 'messageUp'" @click.native="messageUpDialogVisible = true">消息升级</el-dropdown-item>
															<el-dropdown-item v-else-if="value === 'stopLine'" @click.native="stopLineDialogVisible = true;getStopLineItem(nowItem.andonCode)">预计停线</el-dropdown-item>
															<el-dropdown-item v-else-if="value === 'signIn'" @click.native="signInDialogVisible = true;;getSignInItem(nowItem.andonCode)">签到</el-dropdown-item>
														</template>
													</el-dropdown-menu>
												</el-dropdown>

											</div>
										</template>
										<template v-else>
											<div class="operate">
												<b class="w80p f-cna">不可操作</b>
											</div>
										</template>
									</a>
								</div>
								<!-- 单个安灯结束 -->
							</div>
							<!-- 弹性盒子容器结束 -->
						</el-carousel-item>
					</div>
					<div v-else class="img-container no-info"></div>
				</el-carousel>
				<!-- 次灯片contain结束 -->
			</div>
		</div>
		<!-- 右侧功能区结束 -->

		<!-- 消息升级弹窗 -->
		<el-dialog title="消息升级" :visible.sync="messageUpDialogVisible">
			<span class="f-fs18">是否确认消息升级并通知生产组，生产部门？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="messageUpDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="messageUpEvent(nowItem.andonCode)">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 预计停线弹窗 -->
		<el-dialog title="预计停线" :visible.sync="stopLineDialogVisible">
			<span class="f-fs18">请选择停线时间段，并通知相关人员</span>
			<div style="max-height:400px;overflow:auto;" >
				<template v-for="(item,index) in stopLine.stopLineList">
						<el-radio v-model="stopLine.stopLineId" :label="item.id" border>预计停线{{item.stopLineTimeSt}}-{{item.stopLineTimeEd}}分钟</el-radio>
				</template>
				
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="stopLineDialogVisible = false">取 消</el-button>
				<el-button v-loading=stopLine.stopLineloadFlag :disabled="!stopLine.stopLineId" type="primary" @click="stopLineEvent(nowItem.andonCode, stopLine.stopLineId)">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 签到弹窗 -->
		<el-dialog title="签到" :visible.sync="signInDialogVisible">
			<span class="f-fs18">签到人员列表</span>
			<div style="max-height:400px;overflow:auto;" >
				<template v-for="item in signIn.signInList">
						<el-radio v-model="signIn.signInId" :label="item.userCode" border>{{item.userText}}</el-radio>
				</template>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="signInDialogVisible = false">取 消</el-button>
				<el-button v-loading=signIn.signInloadFlag :disabled="!signIn.signInId" type="primary" @click="signInEvent(nowItem.andonCode, signIn.userCode)">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
	import util from "@/js/util";
	import { http, fetch } from '@/js/http';
	import { mapGetters, mapActions } from 'vuex';
	import userinfo from '@/js/userinfo';
	import { Message } from 'element-ui';
	var tool = require("@/js/vendors/kit/kit");
	var kit = tool.kit;

	export default {
		data() {
			return {
				stopLine: {
					stopLineloadFlag: false,
					stopLineList: [],
					stopLineId: "",
				},
				signIn: {
					signInloadFlag: false,
					signInList: [],
					signInId: "",
				},
				nowItem: null,// 当前被选中的item
				messageUpDialogVisible: false,
				stopLineDialogVisible: false,
				signInDialogVisible: false,
				loadFlag: false,
				nowWorkStation: {},// 工位选择
				serverTime: NaN,// 服务器时间
				nowSecGroupAndonCode: "",
				timeContainer: null,// 定时器容器
				showAll: true,// 显示全部异常
				mainContainer: null,// 主幻灯片容器
				secContainer: null,// 次幻灯片容器
				station: {
					stationCode: "",
					stationText: ""
				},
				workStationList: [
					// { stationText: "--", stationCode: "--"} // 工位列表
				],
				nowWorkStation: "当前工位：--",// 当前工位
				singleLevel: false,// 是否使用单层模式
				// 拉绳安灯
				pullAndon: {
					// normalColor: "",// 正常颜色
					// touchColor: "",// 触摸颜色
					// status: "",	/ /andon是否触发状态,3为不可触发
					// touchable: true,// 是否可触发
					// touchedTime: '2017-08-08 23:32:33',// 具体触发时间，当andon为正常时为null
					// andonText: "其他异常",// andon描述
					// andonCode: "QTYCAN"// andon编码
				},
				// 主模块数据
				mainModule: [
					// {
					// 	andonCode: "CSJD1_ZZC_TL01_SB",//安灯分类代码
					// 	andonText: "设备Andon", // 显示文案
					// 	childAndonCount: 2,// 子模块总数
					// 	childAndonTouchedCount: 2,// 子模块触发数
					// 	extendFeatures: null,// 扩展功能，目前主模块不需要
					// 	normalColor: "#00FF00",// 普通状态颜色
					// 	touchColor: "#FF0000",// 触发状态颜色
					// 	status: "3",// andon是否触发状态,3关闭状态,1触发状态,2（受理，暂不用）
					// 	touchAble: false, // 是否可用
					// 	touchedTime: null// 触发时间
					// }
				],
				// 子模块数据
				secModule: [
					// {
					// 	"normalColor" : "",
					// 	"touchColor" : "",
					// 	"status" : "",// andon是否触发状态,3关闭状态,1触发状态,2受理状态（暂不用）
					// 	"touchAble" false,
					// 	"touchedTime" : 100,
					// 	"andonText" : "其他异常",
					// 	"andonCode" : "QTYCAN",
					// 	"extendFeatures" : [{
					// 		"code" : ""
					// 	}]
					// }
				],
				isMainShow: true
			}
		},
		// 安装完毕
		mounted: function () {
			window.x = this;
			// 获取站点信息
			// userinfo.isUniqueOS().then((data) => {
				this.$store.dispatch('setTitle', '拉绳多层操作功能');

				// 获取服务器时间
				userinfo.loginUserDataInit().then((time) => {
					this.serverTime = time;
				});

				this._getWorkStation();

				this.timeContainer = setInterval(() => {
					this.serverTime += 1000;
					this.changeOpenTime();
				}, 1000);
			// })
		},
		destroyed: function () {
			//alert();
		},
		watch: {
			nowWorkStation: function (station) {
				this.nowWorkStation = station;
				this.isMainShow = true;
				this._getMainModule();
				this.secModule = [];// 防止跳变
			}
		},
		// 过滤器
		filters: {
			setFontSize: function (text) {
				var length = text.length;
				var fontSize = "36px";
				if (length > 5 && length < 15) {
					fontSize = "22px";
				} else if (length > 15) {
					fontSize = "18px";
				}
				return { fontSize: fontSize };
			}
		},
		// 计算属性
		computed: {
			...mapGetters({
				item: 'recordLists',
				operStationsL: 'recordoperStationsL',
				operuserStations: "recordoperuserStations"
			}),
			compMainModule: function () {
				setTimeout(() => {
					this.$children[1].resetItemPosition();
				}, 100)
				return this.createArrayGroup(this.mainModule);
			},
			compSecModule: function () {
				return this.createArrayGroup(this.secModule, this.showAll);
			}
		},
		// 方法
		methods: {
			// 格式化时间戳
			formatFunction: function (value) {
				var theTime = parseInt(value);// 秒
				var theTime1 = 0;// 分
				var theTime2 = 0;// 小时
				if (theTime > 60) {
					theTime1 = parseInt(theTime / 60);
					theTime = parseInt(theTime % 60);
					if (theTime1 > 60) {
						theTime2 = parseInt(theTime1 / 60);
						theTime1 = parseInt(theTime1 % 60);
					}
				}
				var result = "" + parseInt(theTime);

				if (theTime1 > 0) {
					result = "" + parseInt(theTime1) + ":" + result;
				} else {
					result = "00:" + result;
				}

				if (theTime2 > 0) {
					result = "" + parseInt(theTime2) + ":" + result;
				} else {
					result = "00:" + result;
				}
				return result;
			},
			changeOpenTime: function () {
				var data = [];
				if (this.isMainShow) {
					data = this.mainModule;
				} else {
					data = this.secModule;
				}

				kit.forEach(data, (value, key) => {
					if (data[key].status == 1) {
						var second = this.cerateSecond(data[key], 1);
						data[key].isMiddleColor = second >= 10 ? false : true;
						data[key].finalTime = this.formatFunction(second);
					}
				});
			},
			// 取得数据源时格式化时间戳
			formatSeconds: function (data) {

				kit.forEach(data, (value, key) => {
					if (data[key].status == 1) {
						var second = this.cerateSecond(data[key], 0);
						data[key].isMiddleColor = second >= 10 ? false : true;
						data[key].finalTime = this.formatFunction(second);
					}
				});
				return data;
			},
			cerateSecond: function (value, add) {
				var second = (this.serverTime - value.touchedTime) / 1000;
				second += add || 0;
				return second;
			},
			setBackground: function (item) {
				var _color = "linear-gradient(#ADB1BD, #586382)!important";
				var cursor = "";
				if (item.touchAble) {
					if (item.isMiddleColor) {
						_color = "rgb(233, 130, 45)";
					} else {
						if (item.status === "3") {
							// 子模块总数 // 子模块触发数
							if (item.childAndonCount && item.childAndonTouchedCount) {
								_color = item.touchColor;
							} else {
								_color = item.normalColor;
							}

						} else if (item.status === "1") {
							_color = item.touchColor;
						}
					}

				} else {
					cursor = "not-allowed";
				}
				return { background: _color, cursor: cursor };
			},
			// 创建安灯组（6个为一组）
			createArrayGroup: function (arr, flag) {
				var result = [];

				if (arguments.length > 1 && !flag) {
					arr = arr.filter(function (item) {
						if (item.status == "1" && item.touchAble === true) {
							return true;
						}
					});
				}

				for (var i = 0; i < arr.length; i += 6) {
					result.push(arr.slice(i, i + 6));
				}
				return result;
			},
			// 进行安灯操作
			andonOperate: function (item) {
				util.post({
					serviceCode: "GMES-CLIENT-ANDON016",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: item.andonCode,
					currentStatus: item.status
				})
					.then((resp) => {
						if (util.rightCode(resp)) {
							var andonCode = item.andonCode;
							var status = resp.data.status;
							if (andonCode !== status) {
								this._getSecModule(this.nowSecGroupAndonCode);

							}
						}

					});
			},
			// 筛选显示全部或已触发
			showAllEvent: function (flag) {
				this.showAll = flag;
				setTimeout(() => {
					this.$children[2].resetItemPosition();
				}, 100)
			},
			returnIndex: function () {
				this.isMainShow = true;
				this._getMainModule();
			},
			triggerSwitch: function () {
				this.loadFlag = true;
				util.post({
					serviceCode: "GMES-CLIENT-ANDON016",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: this.pullAndon.andonCode,
					currentStatus: this.pullAndon.status
				})
					.then((resp) => {
						if (util.rightCode(resp)) {
							Message({ type: "success", message: "拉绳成功！" });
							this._getMainModule();
						}
					});
			},
			switchToSec: function (item) {
				this.isMainShow = false;
				this.nowSecGroupAndonCode = item.andonCode;
				this._getSecModule(item.andonCode, true);
			},
			_getSecModule: function (andonCode, flag) {
				this.loadFlag = true;
				// this.secModule = [];

				util.post({
					serviceCode: "GMES-CLIENT-ANDON015",
					andonCode: andonCode,
					stationCode: this.nowWorkStation.stationCode,
				})
					.then((resp) => {
						this.loadFlag = false;
						if (util.existData(resp)) {
							this.secModule = this.formatSeconds(resp.data);

							if (flag) {
								// 这边需要个延时,重置插件去除隐藏BUG
								setTimeout(() => {
									this.$children[2].resetItemPosition();
								}, 100)
							}
						}
					});
			},
			// 获取安灯模块
			_getMainModule: function () {

				this.loadFlag = true;

				util.post({
					serviceCode: "GMES-CLIENT-ANDON014",
					stationCode: this.nowWorkStation.stationCode,
				})
					.then((resp) => {
						this.mainModule = [];
						this.loadFlag = false;
						if (util.existData(resp)) {
							var module = this.formatSeconds(resp.data.commomAndonList);

							// 如果是单层
							if (resp.data.singleLevel) {
								this.singleLevel = true;
								this.isMainShow = false;
								this.secModule = module;

								// 如果是多层,条件待定
							} else {
								this.singleLevel = false;
								this.isMainShow = true;
								this.mainModule = module;
							}

							//拉绳安灯处理
							this.pullAndon = resp.data.pullAndon;
						}
					});
			},
			// 获取工位
			_getWorkStation: function () {

				userinfo.terminalStation()
					.then((data) => {
						var stations = data;
						kit.forEach(stations, (value, key) => {
							this.workStationList.push({
								stationCode: key,
								stationText: value
							});
						});

						if (this.workStationList.length) {
							this.nowWorkStation = this.workStationList[0];
							this._getMainModule();
						} else {
							Message("暂无可用工位");
						}
					});
			},
			signInEvent: function (andonCode, userCode) {

				this.signIn.signInloadFlag = true;
				util.post({
					serviceCode: "GMES-CLIENT-ANDON018",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: andonCode,
					userCode: userCode
				})
					.then((resp) => {
						this.signIn.signInloadFlag = false;

						if (util.rightCode(resp)) {
							Message({ type: "success", message: "签到成功！" });
							this.signInDialogVisible = false;
							this.signIn.signInId = "";
						}
					});
			},
			getSignInItem: function(andonCode) {
				this.signIn.signInList = [];
				this.signIn.signInloadFlag = true;
				util.post( {
					serviceCode: "GMES-CLIENT-ANDON017",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: andonCode
				})
					.then((resp) => {
						this.signIn.signInloadFlag = false;
						if (util.existData(resp)) {
							this.signIn.signInList = resp.data;
						}
					});
			},
			getstopLineItem: function(andonCode) {
				this.stopLine.stopLineList = [];
				this.stopLine.stopLineloadFlag = true;
				util.post( {
					serviceCode: "GMES-CLIENT-ANDON019",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: andonCode
				})
					.then((resp) => {
						this.stopLine.stopLineloadFlag = false;
						if (util.existData(resp)) {
							this.stopLine.stopLineList = resp.data;
						}
					});
			},
			stopLineEvent: function (andonCode, id) {
				this.stopLine.stopLineloadFlag = true;
				util.post({
					serviceCode: "GMES-CLIENT-ANDON020",
					stationCode: this.nowWorkStation.stationCode,
					andonCode: andonCode,
					deployId: id
				})
					.then((resp) => {
						this.stopLine.stopLineloadFlag = false;

						if (util.rightCode(resp)) {
							Message({ type: "success", message: "停线成功！" });
							this.stopLineDialogVisible = false;
							this.stopLine.stopLineId = "";
						}
					});
			},
			messageUpEvent: function (andonCode) {

				util.post({
					serviceCode: "GMES-CLIENT-ANDON021", 
					stationCode: this.nowWorkStation.stationCode,
					andonCode: andonCode
				})
					.then((resp) => {
						if (util.rightCode(resp)) {
							this.messageUpDialogVisible = false;
							Message({ type: "success", message: "升级成功！" });
						}
					});
			}
		}
	}

</script>
<style scoped lang="less">
	/* 多层安灯开始 */

	.list-block::-webkit-scrollbar {
		width: 10px;
		border-radius: 5px;
		height: 10px;
	}

	/*滚动条整体部分*/

	.list-block::-webkit-scrollbar-track {
		background-color: #eaeff4;
		width: 10px;
	}

	/*滚动条轨道*/

	.list-block::-webkit-scrollbar-thumb {
		background-color: #a5b2c4;
		width: 10px;
		height: 10px;
		border-radius: 10px;
	}

	/*滚动条内的小方块*/

	.list-block::-webkit-scrollbar-thumb:hover {
		background-color: #a5b2c4;
	}

	#andonPullCordsMultilevelOperate {
		height: 100%;
		position: relative;
	}

	.left {
		width: 236px;
		border-right: #ddd solid 1px;
		height: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
	}

	.stationCont {
		height: 100px;
		display: table;
		width: 100%;
	}

	.pullRope {
		background: white;
		height: 275px;
		margin: 0 12px;
		border-bottom-left-radius: 102px;
		border-bottom-right-radius: 102px;
		border: #b5bed1 solid 1px;
		flex-direction: column;
		cursor: pointer;
	}

	.pullRopeTop {
		height: 70px;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		justify-content: center;
		label {
			font-size: 22px;
			color: #222222;
		}
	}

	.el-radio-group {
		width: 100%;
	}

	.el-radio {
		height: 60px;
		line-height: 60px;
		padding-left: 15px;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		font-weight: bolder;
	}


	.andon-switch {
		height: 198px;
		width: 198px;
		border-radius: 104px;
		margin: auto;
		margin-bottom: 4px;
		border: #b5bed1 solid 1px;
		align-items: center;
		justify-content: center;
		flex: 1;
	}

	.nowStation {
		font-size: 18px;
		font-weight: bold;
		color: black;
		text-align: center;
		display: table-cell;
		vertical-align: middle;
		text-align: center;
		padding: 5px;
	}

	.list-block {
		overflow: auto;
		height: 100%;
		border-top: 1px solid #D1D1D1;
		ul {
			height: 100%;
		}
		.item-content {
			min-height: 60px;
		}
	}

	.el-carousel {
		height: 100%;
	}

	.swiper-box {
		height: 100%;
		padding: 0px 20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		align-items: center;
	}

	.andon-disabled {
		background: linear-gradient(#ADB1BD, #586382) !important;
		height: 81%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-top-left-radius: 37px;
		border-top-right-radius: 37px;
		cursor: not-allowed;
	}

	.andon-drawstring-button-bar {
		button {
			width: 80px;
		}
	}

	.andon-drawstring-item-detail {
		height: 200px;
	}


	.rightContent {
		margin-left: 235px;
		height: 100%;
	}

	.swiper-custom {
		position: relative;
		height: 100%;
		top: 0px;
		min-width: 780px;
	}

	.swiper-container {
		height: 100%;
	}

	.andon-title {
		border-bottom: 1px solid #D1D1D1;
		height: 60px;
		padding-left: 36px;
	}

	.container {
		max-width: 950px;
		height: 89%;
		margin: 0 auto;
	}

	.andon-drawstring-dashed-line {
		display: block;
	}

	.tabs {
		display: inline-block;
		height: 100%;
		min-width: 90px;
		text-align: center;
		line-height: 70px;
		font-size: 18px;
		color: #777777;
	}

	.el-radio+.el-radio {
		margin-left: 0;
	}

	.on {
		border-bottom: 4px solid #3DAFEE;
		cursor: default;
	}

	.andon-return {
		float: right;
		margin-top: 10px;
		margin-right: 36px;
		border: 1px solid #CBCFD3;
		border-radius: 24px;
		padding: 7px 17px 7px 17px;
		font-size: 18px;
		color: #777777;
		background: #fff;
		cursor: pointer;
	}

	.item-title {
		font-weight: bold;
	}

	.item-simple {
		width: 210px;
		height: 210px;
		border-radius: 40px;
		background: #fff;
		margin: 0px 0px 11px 16px;
		flex: none;
		border: #b5bed1 solid 1px;
		border-radius: 40px;
		padding: 3px;

		a {
			height: 100%;
			border-radius: 35px;
			font-size: 22px !important;
			color: #fff;
		}
	}

	.enter-container {
		display: block;
		line-height: 36px;
		margin: 0;
		height: 100%;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 14px;
		font-family: inherit;
		padding: 0px;
		position: relative;
		cursor: pointer;
	}

	.enter {
		background: white;
		font-size: 18px;
		color: #3DAFEE;
		border-radius: 0 0 32px 32px;
		height: 20%;
	}

	.enter-box {
		height: 81%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		border-top-left-radius: 37px;
		border-top-right-radius: 37px;
	}

	.item-text {
		white-space: pre-line;
		padding-left: 20px;
		padding-right: 20px;
		text-overflow: ellipsis;
		overflow: hidden;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}

	.item-time {
		font-size: 36px;
		margin-top: 10px;
		width: 80%;
		padding-top: 10px;
		border-top: 1px dashed;
	}

	.count {
		font-size: 24px;
		margin-top: 10px;
	}

	.sec-item-text {
		height: 70%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.operate {
		cursor: default;
		height: 30%;
		font-size: 18px;
		color: #3DAFEE;
		border-radius: 0 0 32px 32px;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 10px 0 10px;
	}

	.operate-item {
		flex: 1;
	}

	.operate b {
		font-weight: normal;
		width: 80px;
		height: 40px;
		background: #717FA0;
		border-radius: 31px;
		line-height: 40px;
		font-size: 18px;
		color: white;
	}

	.el-dropdown {
		margin-left: 12px;
		flex: 1;
		height: 40px;
		font-size: 18px;
		.el-button {
			border-radius: 30px;
			height: 40px;
			font-size: 17px;
			background: #717FA0;
			border: none;
		}

	}

	.el-dropdown-menu {
		font-size: 17px;
	}
</style>