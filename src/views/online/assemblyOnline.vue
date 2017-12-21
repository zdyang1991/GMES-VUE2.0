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
        <div class="img-container no-info"></div>
      </div>
    </div>
    <div class="bottom">
      <table>
        <thead>
        <tr>
          <td>序号</td>
          <td>订单编号</td>
          <td>工单编号</td>
          <td>物料编码</td>
          <td>物料描述</td>
          <td>计划数量</td>
          <td>机型</td>
          <td>顺序号</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  // import currentorder from './component/currentOrder.vue';
</script>


<style lang="less" scoped>
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
    height: 100%;
    background-color: white;
  }

  .right {
    width: 45%;
    background: white;
  }

  .bottom thead {
    background: #F9F9F9;
  }

  .bottom tbody {
    background: #FFFFFF;
  }

  .bottom {
    height: 161px;
    margin-top: 10px;
    background: white;
  }

  .bottom table {
    width: 100%;
    color: #222222;
  }

  .bottom table,
  .bottom table tr,
  .bottom table td {
    border: 1px solid #F1F1F1;
  }

  .bottom tr {
    height: 54px;
  }

  .bottom td {
    padding-left: 10px;
  }

  /* @import ""; */
</style>
