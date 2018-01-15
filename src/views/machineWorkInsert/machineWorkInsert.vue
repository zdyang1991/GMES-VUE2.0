<template>
  <div class="macheineWorkInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">产品序列号</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">
        </el-input>
        <el-button type="primary" @click="getOrderInfo()">确定</el-button>
      </div>
    </div>
    <div class="bottom-form" style="margin-top: 1rem;">
      <div id="subOutputRank-print">
        <el-table
          :data="tableData"
          border
          style="width: 100%;font-size: 1.2rem">
          <el-table-column
            label="序号"
            type="index"
            width="60">
          </el-table-column>
          <el-table-column
            prop="productionOrderNum"
            label="工单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="materialCode"
            label="物料编号">
          </el-table-column>
          <el-table-column
            prop="serialNo"
            width="240"
            label="产品序列号">
          </el-table-column>
          <el-table-column
            prop=""
            label="数量">
          </el-table-column>
          <el-table-column
            prop=""
            label="备注">
          </el-table-column>

        </el-table>
      </div>

    </div>
    <el-dialog  :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData">
        <el-table-column prop="productOrderNum" label="订单编号" >
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
    </el-dialog>
    <div class="fixed-box">
      <span @click="getHistoryInfo()">历史记录</span>
      <span @click="printContent()">补打印</span>
    </div>
  </div>
</template>

<script type="text/babel">
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  export default {
    data() {
      return {
        tableData:[],
        code:"",
        gridData:[],
        sequenceCount:0,
        dialogTableVisible:false,
        palletCount:3,
        //serialPort:new SerialPort(JSON.parse(window.localStorage.getItem('serialPort')).port,false),//扫描器端口
      }
    },
    created() {
      console.log("打开串口");
      this.openCom();
    },
    beforeDestroy: function () {
      console.log("销毁前关闭串口");
      this.closeCom();

    },
    methods:{
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
//      根据序列号工单信息查询
      getOrderInfo(){
        let body={
          serialNo:this.code
        };
//        接口暂时使用查询发动机的接口
        httpserver(api.getSerialNoInformation,body)
          .then((res) => {
            //6947463266069
            let resData = res.data.data;
            console.log(res);
            if(res.data.returnCode=='0'){
              this.tableData.push(res.data.data);
                console.log(this.sequenceCount);
              //打印条件 数量达到||这个订单号和上一个不一样了，打印
                if(this.sequenceCount==this.palletCount){
                  this.printContent();
                  this.tableData=[];
                }
              localStorage.setItem('sequenceCount',this.sequenceCount)
              this.sequenceCount=localStorage.getItem('sequenceCount');
              this.sequenceCount++;

            }

          })

      },
      printContent(e){
        let subOutputRankPrint = document.getElementById('subOutputRank-print');
        console.log(subOutputRankPrint.innerHTML);
        let newContent =subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
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
          _this.code = data;
          console.log(_this.code);
        })
      },
      closeCom() {
        let _this = this;
        _this.serialPort.close();
      },
//      键盘事件
      show: function (ev) {
        let _this = this;
        if (ev.keyCode == 13) {
          let body = {
            serialNo: _this.code
          };

          httpserver(api.getSerialNoInformation, body)
            .then((res) => {
              this.gridData = res.data.data;
            })
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  @import "../../css/machineWorkInsert/machineWorkInsert.less";
</style>
