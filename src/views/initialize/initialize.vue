<template>
  <div class="initialize">
    <div class="topbox">
      <el-container>
        <el-aside width="60%">
          <!--<proinfo :formName="formName"></proinfo>-->
          <div>
            <div id="currentorder" class="right-container">
              <!-- 第一行 -->
              <div class="row f-df">
                <div class="row-container f-df">
                  <div class="item-container f-f1">
                    <!--订单编号-->

                    <label class="label">工单编号</label>
                    <div class="detail">{{proinfo.productionOrderNum}}</div>

                  </div>
                  <div class="item-container f-f1">
                    <!--工单编号-->
                    <label class="label">机型</label>
                    <div class="detail">{{proinfo.productModel}}</div>
                  </div>
                </div>
              </div>
              <!-- 第二行 -->
              <div class="row f-df">
                <div class="row-container f-df">
                  <div class="item-container f-f1">
                    <!--发动机号-->
                    <label class="label">物料编号</label>
                    <div class="detail">{{proinfo.materialCode}}</div>
                  </div>
                  <div class="item-container f-f1">
                    <!--机型-->
                    <label class="label">订单编号</label>
                    <div class="detail">{{proinfo.productOrderNum}}</div>
                  </div>
                </div>
              </div>
              <!-- 第三行 -->
              <div class="row f-df">
                <div class="row-container f-df">
                  <div class="item-container f-f1">
                    <label class="label">计划数量</label>
                    <div class="detail">{{proinfo.plannedQuantity}}</div>
                  </div>
                  <div class="item-container f-f1">
                    <label class="label">顺序号</label>
                    <div class="detail">{{proinfo.orderNo}}</div>
                  </div>
                </div>
              </div>
              <div class="row f-df">
                <div class="row-container f-df">
                  <div class="item-container f-f1">
                    <label class="label">发动机号</label>
                    <div class="detail"></div>
                  </div>
                  <!--<div class="item-container f-f1">-->
                    <!--<label class="label">订单编号</label>-->
                    <!--<div class="detail">{{proinfo.productOrderNum}}</div>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="progress">
            <div class="container">
              <el-steps direction="vertical" :active=index>
                <el-step title="托盘已到位,准备初始化！" description=""></el-step>
                <el-step title="正在请求订单数据！" description=""></el-step>
                <el-step title="正在下发TAG数据！" description=""></el-step>
                <el-step title="初始化成功！" description=""></el-step>
              </el-steps>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="bottom-form">
      <el-table :data="tableData" border  style="width: 100%">
        <el-table-column prop="productOrderNum" label="订单编号" width="230">
        </el-table-column>
        <el-table-column prop="productionOrderNum" label="工单编号" width="230">
        </el-table-column>
        <!--<el-table-column prop="productModel" label="机型" width="100" >-->
        <!--</el-table-column>-->
        <el-table-column prop="materialCode" label="物料编码" width="140">
        </el-table-column>
        <!--<el-table-column prop="materialText" label="物料描述" width="200">-->
        <!--</el-table-column>-->
        <el-table-column prop="orderNo" label="顺序号" width="260">
        </el-table-column>
        <el-table-column prop="plannedQty" label="计划数量" width="162">
        </el-table-column>
      </el-table>
    </div>
    <!--<div class="fixed-box">-->
      <!--<span>手动初始化</span>-->
    <!--</div>-->
    <div class="icon-pad-history" @click="getHistoryInfo()">
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData">
        <el-table-column prop="productOrderNum" label="订单编号">
        </el-table-column>
        <el-table-column prop="productionOrderNum" label="工单编号">
        </el-table-column>
        <el-table-column prop="productModel" label="机型">
        </el-table-column>
        <el-table-column prop="materialCode" label="物料编码">
        </el-table-column>
        <el-table-column prop="materialText" label="物料描述">
        </el-table-column>
        <el-table-column prop="quanlity" label="计划数量">
        </el-table-column>
        <el-table-column prop="orderNo" label="顺序号">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../utils/util.js';
  import api from '../../utils/api.js';
  import mqttLib from '../../utils/mqtt.js';
  import httpserver from '../../utils/http.js';

  export default {
    data() {
      return {
        proinfo: {},
        index: 0,
        tableData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        gridData: [],
        total: 0

      }
    },
    computed: {},
    created() {
      this.getData();
//      this.setReviseInfo();
      this.subscribe();
    },
    beforeDestroy: function () {
      this.unsubscribe();

    },
    methods: {
      getData: function () {

        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          statuseCode: '7',
          endRow: 3
        };
        httpserver(api.getinitializeTable, body)
          .then((res) => {
            this.tableData = res.data.data;
          })
      },
      //工单修改信息上传
//      setReviseInfo: function () {
//        let loc = JSON.parse(window.localStorage.getItem('terminal'));
//        this.ReviseInfo.statuseCode = '10';
//        httpserver(api.setReviseInfo, this.ReviseInfo)
//          .then((response) => {
//          })
//      },
      getHistoryInfo() {
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo: "1",
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
            console.log(response);

            if (response.data.returnCode == "0") {
              let resData = response.data.data;
              this.gridData = resData.productionStnRecords;
              this.total = resData.toalCount;
            }

          })
      },
//      控制每页几条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
//      当前的页数
      handleCurrentChange(val) {
        console.log(val)
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo: val,
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
            console.log(333)
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      },
      subscribe() {
        let _this = this;
        let topic = "/logs/STN3010";
        let record
        let data
        console.log("begin----------");
        mqttLib.subscribe(topic, "message");
        mqttLib.registerMessageHandler(topic, "message", function (message) {
            record = JSON.parse(message.payloadString).Content.Step;
            data = JSON.parse(message.payloadString).Content.Data;
            console.log(data);
            switch (record) {
              case "Init":
                _this.index = 1;
                break;
              case "Ready":
                _this.index = 2;
                break;
              case "Download":
                _this.index = 3;
                let body = {
                  workOrderNum: data
                };
                httpserver(api.getCurrentProductionOrder, body)
                  .then((response) => {
                   _this.proinfo=response.data.data;
                  });
                break;
              case "Complete":
                _this.index = 4;
                break;
            }
          }
        );
      },
      unsubscribe() {
        let topic = "/logs";
        mqttLib.unsubscribe(topic, "message");
      }
    }

  }

</script>
<style lang="less">
  @import "../../css/initialize/initialize.less";
</style>
