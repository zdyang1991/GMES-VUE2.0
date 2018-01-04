<template>
  <div class="macheineWorkInsert">
    <convent></convent>
    <div class="bottom-form" style="margin-top: 1rem;">
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
</template>

<script type="text/babel">

</script>
<style lang="less" scoped>

</style>
