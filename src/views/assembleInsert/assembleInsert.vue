<template>
  <div class="assembleInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">发动机号</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">

        </el-input>
        <el-button type="primary" @click="getSerialNoInformation()">确定</el-button>
      </div>
      <el-button type="success">已扫数量：22222222</el-button>
    </div>
    <div class="topbox">
      <el-container>
        <el-aside width="50%">
          <proinfo :formName="formName" :gridData="gridData"></proinfo>
        </el-aside>
        <el-main>
          <pro-gress></pro-gress>
        </el-main>
      </el-container>
    </div>
    <div class="fixed-box">
      <span @click="getHistoryInfo()">历史记录</span>
      <span>TAG初始化</span>
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
    <div class="bottom-box">
      <el-button type="danger">需要热试</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  export default {
    data() {
      return {
        //serialPort:new SerialPort('COM3',false),
        code: '',
        dialogTableVisible:false,
        tableData: [],
        gridData:{

        },
        formName: {
          workNum: "订单编号",
          machineType: '工单编号',
          matterDepict: '机型',
          matterDNum: "发动机号",
          planNum: '',
          properNum: "发动机号",
          motorNum: '产品编号',
          orderNum: "产品描述"
        }

      }
    },
    created() {
      console.log("打开串口");
      this.openCom();
    },
    beforeDestroy: function() {
      console.log("销毁前关闭串口");
      this.closeCom();

    },
    methods: {
      getHistoryInfo() {
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo:"1",
          pageSize:"1"
        };
       httpserver(api.getHistoryInfo,body)
         .then((res) => {
         this.tableData = res.data.data;
       })
      },
      openCom() {
        let _this = this;
        let Readline = SerialPort.parsers.Readline;
        let parser = new Readline();
        _this.serialPort.pipe(parser);
        _this.serialPort.open(function (error){
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
      getSerialNoInformation(){
        let body={
          serialNo:this.code
        }

        httpserver(api.getSerialNoInformation,body)
          .then((res) => {
          //6947463266069
            this.gridData = res.data.data
            console.log(res)
            console.log(this.gridData)
          })
      },
      show:function (ev) {
        let _this = this;
        console.log(this.code)
        if(ev.keyCode==13){
          let body={
            serialNo:_this.code
          }

          httpserver(api.getSerialNoInformation,body)
            .then((res) => {
              //6947463266069
              this.gridData = res.data.data
              console.log(res)
              console.log(this.gridData)
            })
        }
      }

      }

  }
</script>
<style lang="less" scoped>
  @import "../../css/assembleInsert.less";
  .convent {
    background-color: #fff;
    height: 7rem;
    align-items: center;
    display: flex;
    /*justify-content: center;!*水平居中*!*/
    padding-left: 4rem;
    .convent-input {
      align-items: center;
      justify-content: center; /*水平居中*/
      display: flex;
      .el-input-group {
        .el-input__inner {
          border: 1px solid #1dbf64;
          width: 39rem;
          height: 5rem;
        }
      }

    }
    .el-button {
      margin-left: 2rem;
    }
  }

  .fixed-box{
    span:first-child{
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 21rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      color: white;
    }
    span:last-child{
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 29rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: white;
    }
  }
</style>
