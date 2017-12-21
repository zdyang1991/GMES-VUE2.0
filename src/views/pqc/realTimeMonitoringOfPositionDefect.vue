<!-- 上线指示 - queuingIndication -->
<template>
    <div class="bg" v-if="true" element-loading-text="拼命加载中">
        <div class="realTimeTop">
            <div class="select-one">
                <!-- <label>时间：</label> -->
                <input name="date" type=radio value="0" checked=checked>
                <span class="day">当日（--）</span>
                <input name="date" type=radio value="1">
                <span class="week">本周（--）</span>
                <input name="date" type=radio value="2">
                <span class="month">本月（--）</span>
                <!-- <label class="f-ml10">频次：</label> -->
                <input name="frequency" type=radio value="1" checked=checked>
                <span class="frequency1 f-ml10">频次≥1</span>
                <input name="frequency" type=radio value="2">
                <span class="frequency2">频次≥2</span>
                <input name="frequency" type=radio value="3">
                <span class="frequency3">频次≥3</span>
            </div>
        </div>
        <el-table :data="tableData3" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
        <div class="table-panel realTimeTable">
            <table class="table-bordered table-striped">
                <thead>
                    <th>序号</th>{{this.operuserStations}}
                    <th>产品标识</th>
                    <th>部位</th>
                    <th>方位</th>
                    <th>缺陷类型</th>
                    <th>责任类型</th>
                    <th>严重度</th>
                    <th>安装工位</th>
                    <th>检验时间</th>
                    <th>检验人</th>
                    <th>问题状态</th>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
    import { Loading } from 'element-ui';
    import util from "@/js/util"
    import { http, fetch } from '@/js/http';
    import { mapGetters, mapActions } from 'vuex'
    import mqttLib from '@/js/mqtt';;
    import userinfo from '@/js/userinfo';
    import { Message } from 'element-ui';
    var tool = require("@/js/vendors/kit/kit");
    var kit = tool.kit;

    export default {
        data() {
            return {
                totalCount1: "--",
                totalCount2: "--",
                totalCount3: "--",
                workStationList: [],
                workTime: "0",// 时间0当天，1本周，2本月
                frequency: "1",// 频次1是大于1   /2是大于2/ 3是大于3  
                station: undefined,
                dataTable: undefined,

                tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
            }
        },
        computed: {
            // ...mapGetters({
            //     operuserStations: "recordoperuserStations"
            // }),
            aaa:() => {
                return 123123123;
            }
        },
        mounted: function () {
            console.log(this.aaa)
            console.log(this.operuserStations())
            // console.log(this.$store.state)
            // console.log(this.$store.commit('increment'))
            // this.$store.commit('increment')
            this.$store.dispatch('setTitle', '工位缺陷实时监控');
            // this._getWorkStation();
        },
        methods: {
            ...mapGetters({
                operuserStations: "recordoperuserStations"
            }),
            // ...mapActions([
            //     'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

            //     // `mapActions` 也支持载荷：
            //     'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
            //     ]),
            //     ...mapActions({
            //     add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
            //     }),
            getCount: function (response) {
                util.post({
                    serviceCode: "GMES-CLIENT-PQC0008",
                    statusECode: "1",
                    typeCode: "",
                    stationCodeArray: this.workStationList,
                    workTime: this.workTime,
                    frequency: this.frequency
                })
                    .then((response) => {
                        this.totalCount1 = response.data.totalCount1;
                        this.totalCount2 = response.data.totalCount2;
                        this.totalCount3 = response.data.totalCount3;
                    });

            },
            _getWorkStation: function () {
                var arr = "";

                kit.forEach(this.operuserStations, function (value, key) {

                    arr += value.stationCode + ",";
                });

                this.workStationList = arr;
                if (this.workStationList.length) {
                    this.loadPage();
                    this.subscribeMessageTopic();

                } else {
                    Message({ message: "暂无可用工位" });
                }
            },
            // 主题监听
            subscribeMessageTopic: function () {
                var topic = "defectReport/PQC/" + security.getSiteCode() + "/DefectAcquisition/defective";
                mqttLib.subscribe(topic);
                mqttLib.registerMessageHandler(topic, "andonMonitoring.andonMonitoringMessageHandler", function (message) {
                    this.loadPage();
                })
            },
            loadPage: function () {
                var _this = this;
                this.getCount();
                //表格加载
                var scrollY = ($(".pqc_realTimeMonitoringOfPositionDefect").height() - 220);
                this.dataTable = util.dataTable($('.table-panel table', this.page), {

                    scrollY: scrollY,
                    "order": [],
                    "ajax": {
                        serviceCode: "GMES-CLIENT-PQC0008",
                        param: {
                            serviceCode: "GMES-CLIENT-PQC0008",
                            statusECode: "1",
                            typeCode: "",
                            stationCodeArray: this.workStationList,
                            workTime: this.workTime,
                            frequency: this.frequency
                        },
                    },
                    "columns": [
                        {
                            "data": "id",
                            "orderable": false,
                            "render": function (data, type, row, meta) {
                                return meta["settings"]["_iDisplayStart"] + meta.row + 1
                            }
                        },
                        {
                            "data": "productNum",
                            "name": "productNum"
                        },
                        {
                            "data": "positionText",
                            "name": "positionText"
                        },
                        {
                            "data": "directionText",
                            "name": "directionText"
                        },
                        {
                            "data": "defectTypeText",
                            "name": "defectTypeText",
                            // "width": "55px",                     
                        },
                        {
                            "data": "responSibilityTypeText",
                            "name": "responSibilityTypeText",
                            "orderable": false
                        },
                        {
                            "data": "severityText",
                            "name": "severityText"
                        },
                        {
                            "data": "stationText",
                            "name": "stationText"
                        },
                        {
                            "data": "pqcdateTime",
                            "name": "pqcdateTime"
                        },
                        {
                            "data": "pqcuser",
                            "name": "pqcuser"
                        },
                        {
                            "data": "eCodeText",
                            "name": "eCodeText"
                        }
                    ]
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