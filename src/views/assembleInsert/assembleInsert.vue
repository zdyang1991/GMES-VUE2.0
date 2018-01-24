<template>
  <div class="assembleInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.4rem;font-weight: bold;color:#000000">发动机号</span>
        <el-input :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">

        </el-input>
        <el-button type="primary" @click="getSerialNoInformation()">确定</el-button>
      </div>
      <el-button type="success">已扫数量：{{productCount}}</el-button>
    </div>
    <div class="topbox">
      <el-container>
        <el-aside width="50%">
          <div id="currentorder" class="right-container">
            <!-- 第一行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                  <!--订单编号-->
                  <label class="label">订单编号</label>
                  <div class="detail">{{gridData.productOrderNum}}</div>
                </div>
                <div class="item-container f-f1">
                  <!--工单编号-->
                  <label class="label">工单编号</label>
                  <div class="detail">{{gridData.productionOrderNum}}</div>
                </div>
              </div>
            </div>
            <!-- 第二行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                  <!--发动机号-->
                  <label class="label">发动机号</label>
                  <div class="detail">{{gridData.serialNo}}</div>
                </div>
                <div class="item-container f-f1">
                  <!--机型-->
                  <label class="label">机型</label>
                  <div class="detail">{{gridData.productModel}}</div>
                </div>
              </div>
            </div>
            <!-- 第三行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                  <label class="label">产品描述</label>
                  <div class="detail">{{gridData.materialText}}</div>
                </div>
                <div class="item-container f-f1">
                  <label class="label">产品编号</label>
                  <div class="detail">{{gridData.materialCode}}</div>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <div class="progress">
            <div class="container">
              <el-steps direction="vertical" :active=index>
                <el-step title="托盘已到位,准备初始化!" description=""></el-step>
                <el-step title="正在请求订单数据！" description=""></el-step>
                <el-step title="正在下发TAG数据！" description=""></el-step>
                <el-step title="初始化成功！" description=""></el-step>
              </el-steps>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <!--<div class="fixed-box">-->
    <!--<span>TAG初始化</span>-->
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
    <div class="bottom-box">
      <div id="ishotTest">需要热试</div>
    </div>
  </div>
</template>

<script type="text/babel">
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  import mqttLib from '../../utils/mqtt.js';

  export default {
    data() {
      return {
        serialPort: '',
        name: 'pro-gress',
        code: '',
        index: 0,
        dialogTableVisible: false,
        tableData: [],
        total: 0,
        gridData: [],
        productCount: 0
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log("open aaaa");
    //   next(vm =>{
    //     this.openCom();
    //   })
    // },
    beforeRouteLeave(to, from, next) {
      console.log("close");
      this.closeCom();
      next()
    },
    created() {
      this.subscribe();
    },
    mounted() {
      console.log("open");
      this.openCom();
    },
    beforeDestroy() {
      this.unsubscribe();
    },
    methods: {
      subscribe() {
        let _this = this;
        let topic = "/logs/STN3010";
        let record;
        let data;
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
                    _this.proinfo = response.data.data;
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
      },
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
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      },
//      控制每页几条
      handleSizeChange(val) {


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
      openCom() {
        let _this = this;
        let port = new SerialPort(JSON.parse(window.localStorage.getItem('serialPort')).port, {autoOpen: false});
        let Readline = SerialPort.parsers.Readline;
        let parser = new Readline();
        port.pipe(parser);
        port.open(function (error) {
          if (error) {
            return console.log("Error opening port:", error.message);
          } else {
            console.log("串口打开成功");
          }
        });
        parser.on('data', function (data) {
          _this.code = data;
        });
        _this.serialPort = port;
      },
      closeCom() {
        if (this.serialPort.isOpen) {
          let _this = this;
          _this.serialPort.close(function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("串口关闭成功");
            }
          })
        }
      },
      getSerialNoInformation() {
        let body = {
          serialNo: this.code
        };

        httpserver(api.getSerialNoInformation, body)
          .then((res) => {
            console.log(res);
            //6947463266069
            this.gridData = res.data.data;
            if (res.data.returnCode == "0") {
              this.productCount++;
              if (res.data.data.hotTest == "0") {
                console.log(document.getElementById("ishotTest").style.display = "flex");
              }
            }
          })
      },
      init: function () {
        this.bsStep(2)
      },
      bsStep: function (i) {

      }

    }

  }
</script>
<style lang="less">
  @import "../../css/assmbleInsert/assembleInsert.less";

</style>
