<template>
      <div class="initialize">
         <div class="topbox">
           <el-container>
             <el-aside width="50%">
               <proinfo></proinfo>

             </el-aside>
             <el-main>
               <pro-gress></pro-gress>
             </el-main>
           </el-container>
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
        <div class="fixed-box">
          <span>历史记录</span>
          <span>TGA初始化</span>
        </div>
      </div>
</template>
<script>
  export default {
    data(){
      return{
        name:'2',
        info:[{
          department:'装配车间',
          site:'CB-CP005',
          user:'张三',
          date:'2017-11-12',
          stute:'正常'
        }],
        tableData:[]
      }
    },
    computed: {

    },

  }

</script>
<style lang="less" scoped>
  @import "../../css/initialize.less";
</style>
