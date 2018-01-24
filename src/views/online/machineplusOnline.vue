<template>
  <div class="machineplusOnline">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.4rem;color: #000000;font-weight: bold">零件条码</span>
        <el-input :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">
        </el-input>
        <el-button type="primary" @click="validplannedQty()">确定</el-button>
      </div>
      <el-button type="success">已扫数量：{{productCount}}</el-button>
    </div>
    <div class="topbox">
      <div id="currentorder" class="right-container">
        <!-- 第一行 -->
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">工单编号</label>
              <div class="detail">{{proinfo.productionOrderNum}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料编号</label>
              <div class="detail">{{proinfo.materialCode}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料描述</label>
              <div class="detail">{{proinfo.materialText}}</div>
            </div>
          </div>
        </div>
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">产品机型</label>
              <div class="detail">{{proinfo.productModel}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">顺序号</label>
              <div class="detail">{{proinfo.orderNo}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">计划数量</label>
              <div class="detail">{{proinfo.plannedQty}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-form">
      <el-table :data="tableData" border ref="table" style="width: 100%;" highlight-current-row
                @current-change="handleCurrentChange">
        <el-table-column prop="orderNo" label="顺序号"  width="240">
        </el-table-column>
        <el-table-column prop="productionOrderNum" label="工单编号"  width="230">
        </el-table-column>
        <!--<el-table-column prop="productModel" label="机型">-->
        <!--</el-table-column>-->
        <el-table-column prop="materialCode" label="物料编码"  width="180">
        </el-table-column>
        <!--<el-table-column prop="materialText" label="物料描述">-->
        <!--</el-table-column>-->
        <el-table-column prop="plannedQty" label="计划数量"  width="180">
        </el-table-column>
        <el-table-column prop="scanQty" label="已扫数量"  width="190">
        </el-table-column>
      </el-table>
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
    </el-dialog>
    <el-dialog
      title="注意"
      :visible.sync="centerDialogVisible"
      width="50%"
      top="30vh"
      :show-close="false"
      center>
      <span>已扫数量超出计划数量</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click=continueON()>继续</el-button>
    <el-button type="primary" @click="onFinish()">完成</el-button>
  </span>
    </el-dialog>

    <div class="icon-pad-history" @click="getHistoryInfo()">
    </div>
  </div>
</template>

<script type="text/babel">
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';

  export default {
    data() {
      return {
        centerDialogVisible:false,
        productionOrderNum: '',
        tableData: [],
        gridData: [],
        proinfo: {},
        plannedQty: 0,
        code: '',
        productCount: 0,
        dialogTableVisible: false,
        currentRow: null,
        serialPort:'',
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log("open mmm");
    //   // this.openCom();
    //   next()
    // },
    beforeRouteLeave(to, from, next) {
      console.log("close");
      this.closeCom();
      next()
    },
    created() {
      console.log("open");
      this.openCom();
      this.getMachiningProductionQueue();
    },
    methods: {
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
            if(err){
              console.log(err);
            }else{
              console.log("串口关闭成功");
            }
          })
        }
      },
      setCurrent(row) {
        this.$refs.table.setCurrentRow(row)
      },
      validplannedQty(){
         if(this.productCount<this.plannedQty){

           this.validMachiningProductRecord();
         }else{
            this.centerDialogVisible=true;
         }
      },
      continueON(){
        this.centerDialogVisible = false;
        this.validMachiningProductRecord();
      },
      onFinish(){
        this.centerDialogVisible = false;
        let body={
          productionOrderNum: this.productionOrderNum
        };
        this.$confirm('确认完成该工单？')
          .then(_ => {
           httpserver(api.updateMachiningProduction,body).then((res)=>{
            if(res.data.returnCode=="0"){
               this.getMachiningProductionQueue();
             }
           })
          })
          .catch(_ => {});
      },
      validMachiningProductRecord() {
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          scanCode: this.code,
          productionOrderNum: this.productionOrderNum
        };
        httpserver(api.validMachiningProductRecord, body)
          .then((response) => {
            console.log(response);
            if (response.data.returnCode == '0') {
              this.productCount++;
              this.getMachiningProductionQueue();
            }
          })
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
          })
      },
      getMachiningProductionQueue: function () {
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          endRow: 4
        };
        httpserver(api.getMachiningProductionQueue, body)
          .then((res) => {
            console.log(res);
            this.tableData = res.data.data;
          })
      },
      handleCurrentChange(val, old) {
        if (val != null) {
          this.currentRow = val;
          this.proinfo = val;
          this.productCount = this.currentRow.scanQty;
          this.plannedQty = this.currentRow.plannedQty
          this.productionOrderNum = this.currentRow.productionOrderNum;
        } else {
          this.tableData.forEach((value, index, table) => {
            if (table[index].productionOrderNum == old.productionOrderNum) {
              this.setCurrent(this.tableData[index])
            }
          })
        }


      }
    }
  }
</script>

<style lang="less">
  @import "../../css/online/machineplusOnline.less";

</style>
