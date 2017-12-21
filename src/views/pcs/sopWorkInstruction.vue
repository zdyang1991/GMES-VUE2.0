<!-- 作业指导书-分装线 -->
<template>
    <div class="bg" element-loading-text="拼命加载中" v-loading=loadFlag>
        <div class="body f-df">
            <div class="top">
                <template v-if="1">
                    <upper :upper-data=upperData :upper-config=upperConfig>
                    </upper>
                </template>
                <template v-else>
                    <div class="img-container no-info"></div>
                </template>
            </div>
            <div class="f-f1 f-df f-mt10">
                <div class="left">
                    <el-tabs type="border-card">
                        <el-tab-pane label="基本描述">
                            <div class="item-box">
                                <label>步骤描述</label>
                                <div class="detial">{{nowStepData.stepText}}</div>
                            </div>
                            <div class="item-box">
                                <label>注意事项</label>
                                <div class="detial">{{nowStepData.attensionText}}</div>
                            </div>
                            <div class="item-box">
                                <label>条件</label>
                                <div class="detial">{{nowStepData.variableFormula}}</div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="详细描述">
                            <div class="item-box">
                                <label>详细描述</label>
                                <div class="detial">{{nowStepData.detailText}}</div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="right">
                    <div class="step">
                        <span>倒计时：
                            <b>{{stepConfig.duration}}S</b>
                        </span>
                        <span class="f-ml20">步骤：
                            <b>{{stepConfig.nowStep + 1}}</b> / {{stepConfig.stepNumber}}</span>
                    </div>
                    <div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>
                    <div v-else class="img-container no-info"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import upper from './component/upper.vue';
    import { Loading } from 'element-ui';
    import util from "@/js/util";
    import mqttLib from '@/js/mqtt';
    import { http, fetch } from '@/js/http';
    import { mapGetters, mapActions } from 'vuex';
    import userinfo from '@/js/userinfo';
    import { Message } from 'element-ui';
    var kit = require("@/js/vendors/kit/kit").kit;

    export default {
        data() {
            return {
                intervalCont: null,// 定时器执行函数容器
                loadFlag: true,// 加载中
                upperData: {},// 属性介绍见util.processResp方法,
                moduleConfig: {},
                // 组件显示模块配置
                upperConfig: {
                    enums: false,
                    remainAmount: true,
                    picture: false,
                    confirmButton: false,
                    historyButton: false,
                    remark: true
                },
                stepArr: [],
                stepConfig: {
                    stepNumber: 0,// 总步骤数
                    nowStep: 0,
                    duration: 0,
                },
                nowStepData: {
                    stepText: "",// 步骤描述
                    attensionText: "",// 注意事项
                    variableFormula: "",// 条件
                    detailText: ""// 详细描述
                }
            }
        },
        destroyed: function () {
            this.clear();
        },
        components: {
            upper
        },
        computed: {},
        created() {
            util.getConfig.call(this, {
                moduleGroupCode: "PCS",
                moduleCode: "SOP_WORK_INSTRUCT",
                callback: (config) => {
                    this.moduleConfig = config;
                    this._getData();
                }
            });
        },
        methods: {
            clear: function() {
                clearInterval(this.intervalCont);
            },
            // 获取数据并且渲染屏幕
            _getData: function () {
                this.loadFlag = true;

                util.post({
                    serviceCode: "GMES-CLIENT-PCS0010",
                    rowNum: this.moduleConfig.rowNum || 0,
                    assemblyStationCode: this.moduleConfig.assemblyStationCode,
                    stationCode: this.moduleConfig.stationCode,
                    onlineStationCode: this.moduleConfig.onlineStationCode
                })
                    .then((response) => {

                        this.loadFlag = false;// 第一次需要改变全局loading

                        if (util.existData(response)) {

                            this.upperData = util.processData(this.moduleConfig, response.data);
                            this.subscribeNotify();

                            // 执行定时器
                            this.steps(response.data.workSteps);
                        } else {
                            Message("暂无数据");
                        }
                    });
            },
            // webSocket通知
            subscribeNotify: function () {

                var topic = "subassembly/" + process.env.siteCode + "/" + this.moduleConfig["onlineStationCode"]; //主题 subassembly/1310/IP

                if (this.flag) {
                    topic = "productStationConfirm/" + 6321 + "/" + this.moduleConfig["onlineStationCode"]; //主线
                }

                this.topic = topic;

                mqttLib.subscribe(topic, "pcs_sopWorkInstruction");

                mqttLib.registerMessageHandler(topic, "pcs_sopWorkInstruction.pcs_sopWorkInstruction", () => {
                    this.clear();
                    this._getData();
                });
            },
            steps: function(arr) {
                
                this.stepConfig.stepNumber = arr.length;
                this.stepConfig.stepArr = arr;
                this.stepConfig.duration = arr[this.stepConfig.nowStep].duration;
                this.nowStepData = arr[this.stepConfig.nowStep];
                this.startInterval();
            },
            startInterval: function() {
                var config = this.stepConfig;
                this.intervalCont = setInterval(() => {

                    if (config.duration > 0) {
                        config.duration --;
                    } else {
                        if (config.nowStep < (config.stepNumber - 1)) {
                            config.nowStep ++;
                            config.duration = config.stepArr[config.nowStep].duration;
                            this.nowStepData = config.stepArr[config.nowStep];
                        } else {
                            config.nowStep = 0;
                        }

                    }
                    
                }, 1000);
            }
        }
    }

</script>
<style scoped>
    .bg {
        box-sizing: border-box;
        background: #ededed;
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        font-size: 18px;
    }

    .body {
        width: 100%;
        flex: 1;
        flex-direction: column;
    }

    /* .el-tabs__nav {
        width: 100%;
    }
    .el-tabs__item {
        width: 50%;
    } */

    .left {
        width: 45%;
        height: 100%;
        background-color: white;
    }

    .right {
        width: 55%;
        margin-left: 10px;
        background: white;
    }

    .step {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
    }

    .step b {
        color: #fd2222;
    }

    .top {
        height: 261px;
        background: white;
        width: 100%;
    }

    .item-box {
        margin-top: 10px;
    }

    .detial {
        min-height: 37px;
        line-height: 37px;
        font-weight: bold;
        border-bottom: 1px solid #CDCDCD;
        background-color: white;
    }
</style>