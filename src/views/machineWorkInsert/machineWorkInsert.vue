<template>
  <div class="macheineWorkInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 11rem;font-size: 1.4rem;color: rgb(0, 0, 0);font-weight: bold;">产品序列号</span>
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
          style="width: 100%;font-size: 1.2rem;max-height: 10rem">
          <el-table-column
            label="序号"
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            prop="productionOrderNum"
            label="工单编号"
            width="180">
          </el-table-column>
          <el-table-column
            width="150"
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
      <el-table :data="gridData" style="width: 100%">
        <el-table-column type="index" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="materialCode" label="物料编号">
        </el-table-column>
        <el-table-column prop="materialText" label="物料描述">
        </el-table-column>
        <el-table-column prop="quanlity" label="产品序列号">
        </el-table-column>
        <el-table-column prop="orderNo" label="下线时间">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--托条码打印弹出窗口-->
    <el-dialog  :visible.sync="dialogVisible" width="80%" title="托条码补打印">
      <div class="linear-input">
        <span>托条码</span>
        <el-input v-model="pallinfo" placeholder="请输入内容" width="300"></el-input>
        <el-button type="primary" @click="collectPall()">确认</el-button>
      </div>
      <el-table :data="palletizedData">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="index" prop="palletBarCode" label="托条码" width="100">
        </el-table-column>
        <el-table-column prop="materialCode" label="物料编号">
        </el-table-column>
        <el-table-column prop="materialText" label="物料描述">
        </el-table-column>
        <el-table-column prop="roundtripTime" label="装托时间">
        </el-table-column>
      </el-table>
      <!--<el-button type="primary">主要按钮</el-button>-->
      <button class="print" @click="replenishPrint()">补打印</button>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>
    <div class="icon-pad-history" @click="getHistoryInfo()"></div>
    <div class="icon-pad-save" @click="replenishPrint()">保存</div>
    <!--<div class="fixed-box">-->
      <!--<span @click="getHistoryInfo()">历史记录</span>-->
      <!--<span @click="replenishPrint()">补打印</span>-->
    <!--</div>-->
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
        input:'',
        palletizedData:[],
        sequenceCount:0,
        dialogTableVisible:false,
        dialogVisible:false,
        isHistory:false,
        isPrint:false,
        gridData:[],
        pallinfo:'',
        total:0,
        serialPort:'',//扫描器端口
      }
    },
    beforeRouteLeave(to, from, next) {
      this.closeCom();
      next()
    },
    created() {
    },
    mounted() {
      this.openCom();
    },
    methods:{
      getHistoryInfo() {
        this.isHistory = true;
        if(this.isHistory == true){
          this.dialogTableVisible = true;
        }
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo: "1",
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
          console.log(response)
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
          console.log(res)
            //6947463266069
//            6944437047143
            let resData = res.data.data;
            let productOrderNums = '';
            if(res.data.returnCode=='0'){
              this.tableData.push(res.data.data);
                console.log(this.sequenceCount);
              //打印条件 数量达到||这个订单号和上一个不一样了，打印
              let palletCount=res.data.data.trayNumber;
              console.log(res.data.data)
                if(this.sequenceCount==palletCount){
                  this.printContent();
                  this.tableData=[];
                }

              productOrderNums=localStorage.getItem('productOrderNums');
                console.log(productOrderNums)
              if(res.data.data.productOrderNum!=productOrderNums&&productOrderNums!==null){
                this.printContent();
                localStorage.removeItem('productOrderNums');
              }
              localStorage.setItem('productOrderNums',res.data.data.productOrderNum);
              localStorage.setItem('sequenceCount',this.sequenceCount);
              this.sequenceCount=localStorage.getItem('sequenceCount');
              this.sequenceCount++;
            }
          })
      },

//      补打印
      replenishPrint(){
        this.dialogVisible = true;
//        查询托条码
        let body={
          palletBarCode:'evn1',
          pageNo:1,
          pageSize:3
        }
        httpserver(api.getPalletizedRecords, body)
          .then((response) => {
          var resData=response.data.data;
            this.palletizedData = resData.palletizedRecords;
            this.total = resData.toalCount;
            console.log( this.total)
          })

      },
//查询物料
      collectPall(){
//        palletBarCode = this.pallinfo;
        let body={
          palletBarCode:this.pallinfo,
          pageNo:1,
          pageSize:3
        }
        httpserver(api.getPalletizedRecords, body)
          .then((response) => {
            var resData=response.data.data;
            this.palletizedData = resData.palletizedRecords;
            this.total = resData.toalCount;
            console.log(response)
          })
      },
//      调用打印机接口
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
        try {
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
        }
        catch (err) {
          // console.log(err);
        } finally {
          this.$message({
            message:'窗口打开失败',
            type:'error'
          });
        }

      },
      closeCom() {
        try {
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
        }
        catch (err) {
          // console.log(err);
        } finally {
          this.$message({
            message:'窗口关闭失败',
            type:'error'
          });
        }
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
//      分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="less">
  @import "../../css/machineWorkInsert/machineWorkInsert.less";
</style>
