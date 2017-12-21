<template>
  <div class="assembleInsert">
    <convent></convent>
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
    <div class="bottom-box">

    </div>
  </div>
</template>

<script type="text/babel">
  export  default {
    data(){
      return{
        tableData:[]
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/assembleInsert.less";
</style>
