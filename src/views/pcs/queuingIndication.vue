<!-- 上线指示 - queuingIndication -->
<template>
    <div class="bg" v-if="true" element-loading-text="拼命加载中">
        <div class="body f-df">
            <div class="left">
                <div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>
                <div v-else class="img-container no-info"></div>
            </div>
            <div class="right">
                <template v-if="1">
                    <upper 
                        :upper-data=upperData 
                        :upper-config=upperConfig 
                        :load-flag=loadFlag 
                        v-on:confirmEvent=confirmEvent
                        v-on:getTable=getTable>
                    </upper>
                </template>
                <template v-else>
                    <div class="img-container no-info"></div>
                </template>
            </div>
        </div>
        <div class="bottom">
            <table>
                <thead>
                    <tr>
                        <td>产品顺序</td>
                        <td>后续规格</td>
                        <td>数量</td>
                        <td>标识号明细</td>
                        <td>生产管理号</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="tableArr.length">
                        <tr v-for="(item, index) in tableArr">
                            <td>{{index + 1}}</td>
                            <td>{{item.carDescription}}</td>
                            <td>{{item.remainingQuantity}}</td>
                            <td>{{item.productNumFormat}}</td>
                            <td>{{item.productIdFormat}}</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td colspan="6" class="f-tac">暂无数据</td>
                        </tr>
                    </template>

                </tbody>
            </table>
        </div>

        <el-dialog size=large class="upperTable" title="上件指示历史记录" :visible.sync="dialogTableVisible" :close-on-click-modal="false">
            <div v-loading="gridData.tableLoadFlag">
                <el-table height="300" :data="gridData.data">
                    <el-table-column property="id" label="产品顺序" width="120"></el-table-column>
                    <el-table-column property="stationCode" label="站点编号" width="150"></el-table-column>
                    <el-table-column property="productionSeqNum" label="生产管理号"></el-table-column>
                    <el-table-column property="productNum" label="产品跟踪号"></el-table-column>
                    <el-table-column property="materialText" label="物料描述"></el-table-column>
                    <el-table-column property="createDateTime" label="创建时间"></el-table-column>
                </el-table>
                <div class="block f-mt15">
                    <el-pagination 
                        @current-change="handleCurrentChange" 
                        :current-page="1"
                        :page-size="gridData.pageData.pageSize" 
                        layout="total, prev, pager, next, jumper" 
                        :total="gridData.pageData.totalCount">
                    </el-pagination>
                </div>
            </div>

        </el-dialog>
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
                loadFlag: true,// 加载中
                dialogTableVisible: false,// 是否显示遮罩
                tableArr: [],// 底部表格数组
                upperData: {},// 属性介绍见util.processResp方法,
                moduleConfig: {},
                // 组件显示模块配置
                upperConfig: {
                    enums: true,
                    remainAmount: true,
                    picture: false,
                    confirmButton: true,
                    historyButton: true,
                    remark: true
                },
                // 弹层表格数据源
                gridData: {
                    nowPage: 1,// 当前页码
                    data: [],// 表格数据源
                    tableLoadFlag: false,// 表格加载状态
                    // 分页数据源
                    pageData: {
                        totalCount: 0,// 总页数
                        pageSize: 8,// 每页数量
                    }
                },
            }
        },
        components: {
            upper
        },
        computed: mapGetters({
            moduleMenus: 'recordmoduleMenus',
        }),
        created() {
            util.getConfig.call(this, {
                moduleGroupCode: "PCS",
                moduleCode: "ONLINE_INDICATION",
                callback: (config) => {
                    this.moduleConfig = config;
                    this.loadFlag = true;
                    this._getData();
                }
            });
        },
        methods: {
            handleCurrentChange(val) {
                console.log(val)
                this.gridData.nowPage = val;// 当前页
                this.getTable();
            },
            getTable(isReset) {
                if (isReset) {
                    this.gridData.nowPage = 1;
                }
                this.dialogTableVisible = true;
                this.gridData.tableLoadFlag = true;
                var data = {
                    serviceCode: "GMES-CLIENT-PCS0007",
                    stationCode: this.moduleConfig.stationCode,
                    // userCode: this.userData.userCode,
                    languageCode: "zh",
                    pageNum: this.gridData.nowPage,
                    numPerPage: this.gridData.pageData.pageSize// 每页条数
                };

                fetch.post('restful/service/execute', { body: data })
                    .then((response) => {
                        if (util.existData(response)) {
                            this.gridData.data = response.data.data;// 这里居然有两层？！！重名
                            this.gridData.pageData.totalCount = response.data.totalCount;

                            this.gridData.tableLoadFlag = false;
                        }

                    });
            },
            confirmEvent() {
                this.loadFlag = true;

                util.confirm(this.moduleConfig, [this.upperData])
                    .then((response) => {
                        if (util.rightCode(response)) {
                            this.tableArr = [];
                            this.upperData = {};

                            Message({
                                message: "产品分装上线记录成功",
                                type: 'success'
                            });
                            
                            this._getData();
                        } else {
                            Message({
                                message: "产品分装上线记录失败",
                                type: "error"
                            });
                        }
                    });
            },
            // 获取数据并且渲染屏幕
            _getData: function () {
                this.loadFlag = true;
                const data = {
                    serviceCode: "GMES-CLIENT-PCS0011",
                    stationCode: this.moduleConfig.stationCode,
                    rowNum: this.moduleConfig.rowNum || 0,
                    num: this.moduleConfig.rowNum || 0,
                    pageNum: 0,// 当前页码
                    getNum: 3,// 每页数量
                    stNum: 2,// 新增参数 初始位置
                };

                fetch.post('restful/service/execute', { body: data })
                    .then((response) => {

                        if (this.loadFlag) {
                            this.loadFlag = false;// 第一次需要改变全局loading
                        }

                        if (util.existData(response)) {
                            var arr =  util.processResp(this.moduleConfig, response);

                            if (arr.length === 0) {
                                Message("当前站点无数据");
                                return;
                            }

                            this.isUp = false;// 改变组件按钮状态
                            this.upperData = arr[0];
                            this.tableArr = arr.slice(1);
                        } else {
                            this.upperData = [];
                            this.tableArr = [];
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

    .bottom thead {
        background: #F9F9F9;
    }

    .bottom tbody {
        background: #FFFFFF;
    }

    .bottom {
        height: 161px;
        margin-top: 10px;
        background: white;
    }


    .bottom table {
        width: 100%;
        color: #222222;
    }

    .bottom table,
    .bottom table tr,
    .bottom table td {
        border: 1px solid #F1F1F1;
    }

    .bottom tr {
        height: 54px;
    }

    .bottom td {
        padding-left: 10px;
    }
</style>