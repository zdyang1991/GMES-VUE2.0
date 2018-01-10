<template>
  <div class="machineplusOnline">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">零件条码</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">
        </el-input>
        <el-button type="primary" @click="getSerialNoInformation()">确定</el-button>
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
      <el-table :data="tableData" border style="width: 100%;"  highlight-current-row  @current-change="handleCurrentChange">
        <el-table-column type="index" label="顺序号" width="70">
        </el-table-column>
        <el-table-column prop="productOrderNum" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="productionOrderNum" label="工单编号">
        </el-table-column>
        <el-table-column prop="productModel" label="机型">
        </el-table-column>
        <el-table-column prop="materialCode" label="物料编码">
        </el-table-column>
        <el-table-column prop="materialText" label="物料描述">
        </el-table-column>
        <el-table-column prop="plannedQty" label="计划数量">
        </el-table-column>
        <el-table-column prop="orderNo" label="顺序号">
        </el-table-column>
      </el-table>
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
        gridData:[],
        proinfo:{},
        code: '',
        productCount:1,
        dialogTableVisible: false,
        formName: {
          workNum: "工单编号",
          machineType: '机型',
          matterDepict: '物料描述',
          matterDNum: "物料编号",
          planNum: '计划数量',
          properNum: "顺序号",
          motorNum: '发动机号',
          orderNum: "订单号"
        }
      }
    },
    created(){
      this.getData();
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
      getSerialNoInformation(){
        let body={
          serialNo:this.code
        };
        httpserver(api.materialSole,body)
          .then((res)=>{
              if(res.returnCode==0){
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
              }else{
                  console.log('信息重复')
              }

          })
      },
      getData: function () {
        console.log(2)
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          statuseCode: '7',
          endRow: 2
        };
        httpserver(api.getinitializeTable,body)
          .then((res) => {
            this.tableData = res.data.data;
          })
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        this.proinfo = val;
        console.log(this.proinfo.productModel)
      }
    }
  }

</script>


<style lang="less" scoped>
  @import "../../css/machineplusOnline.less";
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
  .unequal {
    height: 20%;
    padding: 20px;
    box-sizing: border-box;
  }
  .row {
    flex: 1;
    padding: 1rem;
    padding-top: 0;
    box-sizing: border-box;
    margin-top: 0.5rem;
  }
  .row:first-child {
    margin-top: 1rem;
  }

  .pictureRow {
    flex: 2;
    padding: 20px;
    box-sizing: border-box;
  }

  .upperTable {
    min-width: 1020px;
  }

  .right-container {
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .row-container {
    height: 65px;
    width: 100%;
  }

  .pictureRow-container {
    height: 100%;
    width: 100%;
  }

  /* 从第二个子元素开始生效 */
  /*.item-container{*/
  /*margin-top: 0.2rem;*/
  /*}*/

  .item-container:nth-child(n+2) {
    margin-left: 20px;
  }

  .label {
    color: #595959;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  .detail {
    color: #222222;
    font-weight: bolder;
    font-size: 1.8rem;
    border-bottom: 1px solid #CDCDCD;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 36px;
    margin-top: 0.8rem;
  }

  .remain-amount-box {
    margin-left: 20px;
  }

  .remain-amount-container {
    border: 1px dashed #EB6F83;
    height: 98%;
    display: flex;
    /* line-height: 63px;  */
  }

  .remain-amount {
    color: #E43246;
    font-size: 48px;
    font-weight: bold;
    align-items: center;
    display: flex;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
  }

  .remain-amount-label {
    color: #222222;
    display: flex;
    padding-left: 20px;
    font-weight: bold;
    align-items: center;
  }

  .confirmOnline {
    height: 100%;
    width: 100%;
    /* background: #00AFEB; */
    /* border-radius: 0px; */
    font-size: 20px;
  }

  .remark {
    min-height: 36px;
    line-height: 36px;
    /* line-height: 21px; */
    color: #222222;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #CDCDCD;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bottom thead {
    height: 50px;
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

  .blink {
    -webkit-animation: blink 1.5s 0s infinite;
    animation: blink 1.5s 0s infinite;
  }

  @keyframes blink {
    0% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
    50% {
      box-shadow: 0 0 40px #EB6F83 inset;
    }
    100% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
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
    height: 50px;
  }

  .bottom td {
    padding-left: 10px;
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
  }
  }
</style>
