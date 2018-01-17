<template>
  <div class="assembleInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">发动机号</span>
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
              <el-steps direction="vertical" :active="1">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤 4" description="这是一段很长很长很长的描述性文字"></el-step>
                <el-step title="步骤 5" description="这是一段很长很长很长的描述性文字"></el-step>
              </el-steps>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
    <div class="fixed-box">
      <span>TAG初始化</span>
    </div>
    <div class="icon-pad-history" @click="getHistoryInfo()">
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData">
        <el-table-column prop="productOrderNum" label="订单编号">
        </el-table-column>
        <el-table-column prop="workOrderNum" label="工单编号">
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

  export default {
    data() {
      return {
        //serialPort:new SerialPort(JSON.parse(window.localStorage.getItem('serialPort')).port,false),
        name: 'pro-gress',
        code: '',
        dialogTableVisible: false,
        tableData: [],
        total: 0,
        gridData: [],
        productCount: 0
      }
    },
    created() {
      console.log("打开串口");
//      this.openCom();
      this.init();
    },
    beforeDestroy: function () {
      console.log("销毁前关闭串口");
//      this.closeCom();

    },
    methods: {
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
        let Readline = SerialPort.parsers.Readline;
        let parser = new Readline();
        _this.serialPort.pipe(parser);
        _this.serialPort.open(function (error) {
          console.log("打开" + error);
        })
        parser.on('data', function (data) {
          console.log(data);
          _this.code = data;
          console.log(_this.code);
        })
      },
      closeCom() {
        let _this = this;
        _this.serialPort.close();
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
             if(res.data.data.hotTest=="0") {
               console.log(document.getElementById("ishotTest").style.display="flex");
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
<style lang="less" scoped>
  @import "../../css/assmbleInsert/assembleInsert.less";

</style>
