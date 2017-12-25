<template>
  <div class="hottest">
    <convent></convent>
    <div class="pro-info">
      <proinfo></proinfo>
    </div>
    <convent></convent>
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

</script>
<style lang="less" scoped>
  @import "../../css/hottest.less";
</style>
