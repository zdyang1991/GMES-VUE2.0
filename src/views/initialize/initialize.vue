<template>
  <div class="initialize">
    <div class="topbox">
      <el-container>
        <el-aside width="60%">
          <proinfo :formName="formName"></proinfo>

        </el-aside>
        <el-main>
          <pro-gress></pro-gress>
        </el-main>
      </el-container>
      <!--<button @click="setReviseInfo()">2222222</button>-->
    </div>
    <div class="bottom-form">
      <el-table :data="tableData" border style="width: 100%;" >
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
    <div class="fixed-box">
      <span>历史记录</span>
      <span>TGA初始化</span>
    </div>

  </div>
</template>
<script>
  import util from '../../utils/util.js';
  export default {
    data() {
      return {
        tableData:[],
        ReviseInfo: {
            siteCode:'',//工单编码
            statuseCode:'',//工单状态
            productionOrderNum:"NO_0000000167"//工单编号
          },
        formName:{
          workNum:"工单编号",
          machineType:'机型',
          matterDepict:'物料描述',
          matterDNum:"物料编号",
          planNum:'计划数量',
          properNum:"顺序号",
          motorNum:'发动机号',
          orderNum:"订单号"
        }

      }
    },
    computed: {},
    created() {
      this.getData();
      this.setReviseInfo();
    },
    methods: {
      getData: function () {

        let loc=JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          siteCode: loc.siteCode,
          workCenterCode: loc.workCenterCode,
          statuseCode: '7',
          endRow:2
        };
        this.$http({
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'get',
          url: 'http://10.200.151.229:8021/pcs/restful/pp/getProcutionOrderQueue',
          params:body
        })
          .then((response)=>{
           this.tableData= response.data.data;
           console.log(response)
          })
      },
      //工单修改信息上传
      setReviseInfo:function(){
        let loc=JSON.parse(window.localStorage.getItem('terminal'));

        this.ReviseInfo.siteCode ='1001';
        this.ReviseInfo.statuseCode = '10';
        console.log(this.ReviseInfo);
        this.$http({
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            url: 'http://10.200.151.229:8021/pcs/restful/pp/changeProductionOrder',//测试地址
            params:this.ReviseInfo
          })
          .then((response)=>{

          })

      }
    }

  }

</script>
<style lang="less" >
  @import "../../css/initialize.less";
  .el-table th div, .el-table th>.cell{
    color: #222;
  }
</style>
