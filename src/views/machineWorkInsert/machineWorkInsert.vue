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
            prop="date"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="订单编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="物料编号">
          </el-table-column>
          <el-table-column
            prop="address"
            width="240"
            label="产品序列号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="address"
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
        tableData: [],
        code:"",
        gridData:[],
        dialogTableVisible:false
      }
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
      getOrderInfo(){
        let body={
          serialNo:this.code
        };
//        接口暂时使用查询发动机的接口
        httpserver(api.getSerialNoInformation,body)
          .then((res) => {
            //6947463266069
            this.gridData = res.data.data;
            if(res.returnCode==0){
              localStorage.setItem('Partcount',this.productCount)
              this.productCount=localStorage.getItem('Partcount');
              this.productCount++
            }
          })

      },
      printContent(e){
        console.log(e)
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
    }
  }
</script>
<style lang="less" scoped>
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
    top: 11rem;
    right: 0;
    border-radius: 8rem ;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    color: white;
    margin-right: 2rem;
    opacity: .5;
  }
  span:last-child {
    margin-right: 2rem;
    width: 7rem;
    height: 7rem;
    background-color: #009DD9;
    position: fixed;
    top: 20rem;
    right: 0;
    border-radius: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: white;
  }
  }
</style>
