<!-- 上线指示批量 - queuingIndication -->
<template>
    <div class="bg" v-if="true" element-loading-text="拼命加载中">
        <div class="body f-df">
            <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" label="产品顺序" width="100">
                    </el-table-column>
                <el-table-column prop="carDescription" label="车型描述">
                </el-table-column>
                <el-table-column prop="productNumFormat" label="标识号明细" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="productIdFormat" label="生产管理号" show-overflow-tooltip>
                    </el-table-column>
            </el-table>
        </div>
        <div class="bottom">
            <bottom-upper :page-container=pageContainer :upper-array=upperArray :load-flag=loadFlag v-on:left=left v-on:right=right v-on:refresh=refresh
                v-on:confirm=confirm></bottom-upper>
        </div>
    </div>
</template>
<script>
    import upper from './component/upper.vue';
    import bottomUpper from './component/bottom-upper.vue';
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
                upperArray: [],
                tableData: [],
                loadFlag: true,
                upperConfig: {
                    enums: true,
                    remainAmount: false,
                    picture: true,
                    confirmButton: false,
                    historyButton: false,
                    remark: false
                },
                pageContainer: {
                    nowPage: 0,
                    dln: 0,// 列队总页数
                    lsn: 0,// 历史总列数
                }
            }
        },
        components: {
            bottomUpper,
            upper
        },
        computed: mapGetters({
            moduleMenus: 'recordmoduleMenus',

        }),
        created() {
            util.getConfig.call(this, {
                moduleGroupCode: "PCS",
                moduleCode: "DOUBLE_ONLINE_INDICATION",
                callback: (config) => {
                    this.moduleConfig = config;
                    this.loadFlag = true;
                    this._getData(this.moduleConfig);
                }
            });
        },
        methods: {
            left() {
                this.pageContainer.nowPage--;
                this._getData();
            },
            right() {
                this.pageContainer.nowPage++;
                this._getData();
            },
            refresh() {
                this.pageContainer.nowPage = 0;
                this.loadFlag = true;
                this._getData();
            },
            handleSelectionChange(val) {
                this.upperArray = val;
            },
            confirm() {

                this.loadFlag = true;
                util.confirm(this.moduleConfig, this.upperArray)
                    .then((resp) => {
                        if (util.rightCode(resp)) {
                            Message({ type: "success", message: "上件成功！" });
                            this.upperArray = [];
                            this.tableData = [];
                            this.pageContainer.nowPage = 0;
                            this._getData();
                        }
                    });
            },

            // 获取数据并且渲染屏幕
            _getData() {

                if (this.loadFlag === false) {
                    this.loadFlag = true;
                }

                const data = {
                    siteCode: process.env.siteCode,
                    serviceCode:  util.compServiceCode(this.pageContainer),
                    stationCode: this.moduleConfig.stationCode,
                    rowNum: this.moduleConfig.rowNum || 0,
                    num: this.moduleConfig.rowNum || 0,
                    pageNum: this.pageContainer.nowPage,// 当前页码
                    getNum: 8,// 每页数量  pageSize已弃用              
                    stNum: 2,// 新增参数 初始位置
                };

                fetch.post('restful/service/execute', { body: data })
                    .then((response) => {

                        if (util.existData(response)) {

                            var arr = util.processResp(this.moduleConfig, response);
                            
                            if (arr.length === 0) {
                                Message("当前站点无数据");
                                return;
                            }

                            this.tableData = arr;

                            this.pageContainer.dln = response.data.dln;
                            this.pageContainer.lsn = response.data.lsn;


                        } else {
                            this.upperArray = [{}, {}];
                        }

                        if (this.loadFlag) {
                            this.loadFlag = false;// 改变组件按钮状态
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
        width: 100%;
        flex: 1;
    }

    .half {
        width: 50%;
        height: 100%;
        background: white;
    }

    .half:nth-child(2) {
        margin-left: 10px;
    }
</style>