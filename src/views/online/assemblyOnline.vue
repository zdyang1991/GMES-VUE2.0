<!-- 装配上线-assemblyOnline-->
<template>
  <div class="bg" v-if="true" element-loading-text="玩命加载中">
    <div class="body f-df">
      <div class="left">
        <AssemblyOrder></AssemblyOrder>
        <!--<div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>-->
        <!--<div v-else class="img-container no-info"></div>-->
      </div>
      <div class="right">
        <div class="img-container no-info engine"></div>
      </div>
    </div>
    <div class="bottom-table">
      <el-table :data="tableData"  style="width: 100%;">
        <el-table-column prop="productOrderNum" label="订单编号" width="">
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

    <!--按钮-->
    <div class="fixed-box">
      <span @click="getHistoryInfo()">历史记录</span>
      <span>TAG初始化</span>
    </div>
    <!--弹框-->
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  // import currentorder from './component/currentOrder.vue';
  import util from '../../utils/util.js';
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  export default{
  data() {
    return {
      tableData: [],
      dialogTableVisible:false,
      dialogFormVisible: false,
      gridData: [],
      pageNo:'',
      pageSize:""
    }
  },
    created() {
      this.getData();
    },
    methods: {
      getData: function () {

        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          statuseCode: '10',
          endRow: 5
        };
        httpserver(api.getAssemblyData,body)
          .then((response) => {
            this.tableData = response.data.data;
          })
      },
      getHistoryInfo(){
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo:"1",
          pageSize:"1"
        };
        httpserver(api.getHistoryInfo,body)
          .then((response) => {
            console.log(response.data);
            this.gridData = response.data.data;
          })
      },
//      控制每页几条
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
//      当前的页数
      handleCurrentChange(val) {

      }
    }

  }
</script>


<style lang="less" scoped>
  .bottom-table {
    /*height: calc(100% - 26rem);*/
    height:30%;
    background-color: #fff;
    .el-table {
      font-size: 1.2rem;
      .el-table__header-wrapper {
        color: #222;

      }

    }
  }
  .bg {
    box-sizing: border-box;
    background: #ededed;
    height: 100%;
    padding: 0.83rem;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
  }

  .body {
    width: 100%;
    flex: 1;
  }

  .left {
    width: 55%;
    /*height: 100%;*/
    background-color: white;
    margin-bottom: 20px;
  }

  .right {
    margin-left: 20px;
    width: 45%;
    /*height:100%;*/
    margin-bottom: 20px;
    background: white;
  }


  .engine {
  background: url("../../assets/engie.png") no-repeat center;
  }
  .fixed-box{

    span:first-child{
      margin-right: 2rem;
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 6.3rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      color: white;
    }
    span:last-child{
      margin-right: 2rem;
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 15rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: white;
    }
  }
  .el-pagination{
    margin-top: 1rem;
  }

  /* @import ""; */
</style>
