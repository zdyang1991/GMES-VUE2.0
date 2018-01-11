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
  @import "../../css/online/machineplusOnline.less";

</style>
