<template>
  <div>
    <div class="convent">
      <div class="convent-input">
        <el-input placeholder=""  :autosize="{ minRows: 4, maxRows: 4}" size="80">
          <template slot="append">确认</template>
        </el-input>
      </div>
      <el-button type="success">已扫数量：22222222</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'convent'
  }

</script>
<style lang="less" scoped>
  .convent{
    background-color: #fff;
    height: 7rem;
    align-items: center;
    display: flex;
    /*justify-content: center;!*水平居中*!*/
    padding-left:5rem;
    .convent-input{
      align-items: center;
      justify-content: center;/*水平居中*/
      display: flex;
      .el-input-group{
          .el-input__inner{
          width: 39rem;
          height: 5rem;
        }
      }

    }
  .el-button{
    margin-left: 2rem;
  }
  }
</style>

