<template>
    <div class="machineplusOnline">
      <convent></convent>
      <div class="topbox">
      </div>
      <div class="bottom-form">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
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
            label="工单编号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="机型">
          </el-table-column>
          <el-table-column
            prop="address"
            label="物料编码">
          </el-table-column>
          <el-table-column
            prop="address"
            label="物料描述">
          </el-table-column>
          <el-table-column
            prop="address"
            label="计划数量">
          </el-table-column>
          <el-table-column
            prop="address"
            label="顺序号">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script type="text/babel">
  export default {
    data(){
      return{
        tableData:[],
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
    }
  }
</script>


<style lang="less" scoped>
  @import "../../css/machineplusOnline.less";
</style>
