<!-- 上线指示防错版 -->
<template>
    <div class="bg" v-if="true" element-loading-text="拼命加载中">
        <div class="top" v-loading=historyLoadFlag>
            <div class="f-f1 f-df">
                <div class="item-container">
                    <label class="label">产品标识号</label>
                    <div class="detail">{{historyData.productNumFormat}}</div>
                </div>
                <div class="item-container">
                    <label class="label">生产管理号</label>
                    <div class="detail">{{historyData.productIdFormat}}</div>
                </div>
                <div class="item-container">
                    <label class="label">校验码</label>
                    <div class="detail" style="border:none;"><el-input :autofocus=true v-model="input" placeholder="请输入内容" @keyup.enter.native="verfy"></el-input></div>
                </div>
            </div>
            <div class="f-f1">
                <div class="item-container">
                        <label class="label">当前规格</label>
                        <div class="detail">{{historyData.carDescription}}</div>
                </div>
            </div>
        </div>
        <div class="body f-df">
            <div class="left">
                <div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>
                <div v-else class="img-container no-info"></div>
            </div>
            <div class="right">
                <template v-if="1">
                    <upper :upper-data=upperData :upper-config=upperConfig :load-flag=loadFlag v-on:jumpEvent=jumpEvent>
                    </upper>
                </template>
                <template v-else>
                    <div class="img-container no-info"></div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import upper from './component/upper.vue';
    import { Loading } from 'element-ui';
    import util from "@/js/util"
    import { http, fetch } from '@/js/http';
    import { mapGetters, mapActions } from 'vuex';
    import userinfo from '@/js/userinfo';
    import { Message } from 'element-ui';
    var tool = require("@/js/vendors/kit/kit");
    var kit = tool.kit;

    export default {
        data() {
            return {
                pageNum: 0,
                loadFlag: true,// 加载中
                historyLoadFlag: true,
                input: "",
                historyData: {},
                upperData: {},// 属性介绍见util.processResp方法,
                moduleConfig: {},
                // 组件显示模块配置
                upperConfig: {
                    enums: true,
                    picture: false,
                    jumpButton: true,
                    remark: true
                },
            }
        },
        components: {
            upper
        },
        computed: {
            ...mapGetters({moduleMenus: 'recordmoduleMenus'}),
            compParam: function() {
                return {
                    stationCode: this.moduleConfig.stationCode,
                    rowNum: this.moduleConfig.rowNum || 0,
                    num: this.moduleConfig.rowNum || 0,
                    getNum: 3,// 每页数量
                    stNum: 2,// 新增参数 初始位置
                }
            }
        },
        created() {
            util.getConfig.call(this, {
                moduleGroupCode: "PCS",
                moduleCode: "ONLINE_INDICATION",
                callback: (config) => {
                    this.moduleConfig = config;
                    this.loadFlag = true;
                    this._getData();
                    this._getHistory();
                }
            });
        },
        methods: {
            verfy() {
                if (!this.input) {
                    Message("请输入校验码");
                    return;
                }
                var arr = [{
                    siteCode: process.env.siteCode,// 这个接口没写好，在url中就有siteCode
                    productNumCheckCode: this.input,// 输入的数据
                    productionSeqNum: this.upperData.productId,// productId
                    stationCode: this.moduleConfig.stationCode,// 站点代码
                    productNum: this.upperData.productNum,// 产品标识号
                    productTrackNum: "1",// 产品跟踪号，填1，还没有，必要
                }];

                util.post({
                    subassemblyOnlinesJson: JSON.stringify(arr),
                    serviceCode: "GMES-CLIENT-PCS0014",
                })
                    .then((resp)=> {
                        if (util.rightCode(resp)) {
                            Message({ message: "检验通过，产品分装上线记录成功", type: "success" });
                            this.input = "";
                            this.pageNum = 0;
                            this._getData();
                            this._getHistory();
                        } else {
                            Message({ message: "验证未通过", type: "error" });
                        }

                        // _this.render(_this.type.history);

                        // // 初始化页面
                        // options.renderConfig.pageNum = 0;
                        // _this.render(_this.type.detail);
                    })
            },
            _getHistory() {
                this.historyLoadFlag = true;
                util.post({
                    ...this.compParam,
                    serviceCode: "GMES-CLIENT-PCS0012",
                    pageNum: -1,// 当前页码
                })
                    .then((response) => {
                        this.historyLoadFlag = false;
                        if (util.existData(response)) {
                            var arr = util.processResp(this.moduleConfig, response);

                            if (arr.length === 0) {
                                Message("当前站点无数据");
                                return;
                            }

                            this.historyData = arr[0];
                        } else {
                            this.historyData = {};
                        }
                    });
            },
            jumpEvent() {
                this.pageNum ++;
                this._getData();
                // utils.confirm(this.moduleConfig, [this.upperData])
                //     .then((response) => {
                //         if (utils.rightCode(response)) {
                //             this.upperData = {};

                //             Message({
                //                 message: "产品分装上线记录成功",
                //                 type: 'success'
                //             });

                //             this._getData();
                //         } else {
                //             Message({
                //                 message: "产品分装上线记录失败",
                //                 type: "error"
                //             });
                //         }
                //     });
            },
            // 获取数据并且渲染屏幕
            _getData: function () {
                this.loadFlag = true;
                util.post({
                    ...this.compParam,
                    serviceCode: "GMES-CLIENT-PCS0011",
                    pageNum: this.pageNum,// 当前页码
                })
                    .then((response) => {

                        if (this.loadFlag) {
                            this.loadFlag = false;// 第一次需要改变全局loading
                        }

                        if (util.existData(response)) {
                            var arr = util.processResp(this.moduleConfig, response);

                            if (arr.length === 0) {
                                Message("当前站点无数据");
                                return;
                            }

                            this.isUp = false;// 改变组件按钮状态
                            this.upperData = arr[0];
                        } else {
                            this.upperData = {};
                        }
                    });
            },
        }
    }

</script>
<style scoped>
    .bg {
        box-sizing: border-box;
        background: #ededed;
        height: 100%;
        padding: 10px;
        /* position: relative; */
        display: flex;
        flex-direction: column;
        font-size: 18px;
    }

    .body {
        /* bottom:150px;
        top: 10px;
        position: absolute; */
        width: 100%;
        flex: 1;
    }

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

    .item-container:nth-child(n+2) {
        margin-left: 20px;
    }
    .item-container{
        flex:1;
        padding:20px;
    }

    .label {
        color: #595959;
        font-size: 18px;
        line-height: 25px;
    }

    .detail {
        color: #222222;
        font-weight: bolder;
        font-size: 18px;
        border-bottom: 1px solid #CDCDCD;
        line-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-height: 36px;
    }

    .top tbody {
        background: #FFFFFF;
    }

    .top {
        height: 190px;
        margin-bottom: 10px;
        background: white;
        display: flex;
        flex-direction:column;
    }

</style>
