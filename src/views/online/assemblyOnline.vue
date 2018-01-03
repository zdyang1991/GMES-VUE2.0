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
    <div class="bottom">
      <el-table :data="tableData" stripe="true" style="width: 100%;">
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
  </div>
</template>

<script>
  // import currentorder from './component/currentOrder.vue';
  import util from '../../utils/util.js';
  export default{
  data() {
    return {
      tableData: [],
    }
  },
    created() {
      this.getData();
    },
    methods: {
      getData: function () {

        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          siteCode: loc.siteCode,
          workCenterCode: loc.workCenterCode,
          statuseCode: '10',
          endRow: 5
        };
        this.$http({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'get',
          url: 'http://10.200.151.229:8021/pcs/restful/pp/getProcutionOrderQueue',
          params: body
        })
          .then((response) => {
            this.tableData = response.data.data;
          })
      }
    }

  }
</script>


<style lang="less" scoped>
  .bottom {
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

  /*.bottom thead {*/
    /*background: #F9F9F9;*/
  /*}*/

  /*.bottom tbody {*/
    /*background: #FFFFFF;*/
  /*}*/

  /*.bottom {*/
    /*height: 170px;*/
    /*!*margin-top: 10px;*!*/
    /*background: white;*/
  /*}*/

  /*.bottom table {*/
    /*width: 100%;*/
    /*color: #222222;*/
  /*}*/

  /*.bottom table,*/
  /*.bottom table tr,*/
  /*.bottom table td {*/
    /*border: 1px solid #F1F1F1;*/
  /*}*/

  /*.bottom tr {*/
    /*height: 54px;*/
  /*}*/

  /*.bottom td {*/
    /*padding-left: 10px;*/
  /*}*/

  .engine {
  background: url("../../assets/engie.png") no-repeat center;
  }

  /* @import ""; */
</style>
