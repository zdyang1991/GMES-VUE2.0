<template>
  <div class="machineplusOnline">
    <convent></convent>
    <div class="topbox">
      <div id="currentorder" class="right-container">
        <!-- 第一行 -->
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">工单编号</label>
              <div class="detail">222222112</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料编号</label>
              <div class="detail"></div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料描述</label>
              <div class="detail"></div>
            </div>
          </div>
        </div>
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">产品机型</label>
              <div class="detail">222222112</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">顺序号</label>
              <div class="detail"></div>
            </div>
            <div class="item-container f-f1">
              <label class="label">计划数量</label>
              <div class="detail"></div>
            </div>
          </div>
        </div>
      </div>
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
    data() {
      return {
        tableData: [],
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
  .unequal {
    height: 20%;
    padding: 20px;
    box-sizing: border-box;
  }

  .row {
    flex: 1;
    padding: 1rem;
    padding-top: 0;
    box-sizing: border-box;
    margin-top: 0.5rem;
  }

  .row:first-child {
    margin-top: 1rem;
  }

  .pictureRow {
    flex: 2;
    padding: 20px;
    box-sizing: border-box;
  }

  .upperTable {
    min-width: 1020px;
  }

  .right-container {
    height: 100%;
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .row-container {
    height: 65px;
    width: 100%;
  }

  .pictureRow-container {
    height: 100%;
    width: 100%;
  }

  /* 从第二个子元素开始生效 */
  /*.item-container{*/
  /*margin-top: 0.2rem;*/
  /*}*/

  .item-container:nth-child(n+2) {
    margin-left: 20px;
  }

  .label {
    color: #595959;
    font-size: 1.4rem;
    line-height: 2rem;
  }

  .detail {
    color: #222222;
    font-weight: bolder;
    font-size: 1.8rem;
    border-bottom: 1px solid #CDCDCD;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 36px;
    margin-top: 0.8rem;
  }

  .remain-amount-box {
    margin-left: 20px;
  }

  .remain-amount-container {
    border: 1px dashed #EB6F83;
    height: 98%;
    display: flex;
    /* line-height: 63px;  */
  }

  .remain-amount {
    color: #E43246;
    font-size: 48px;
    font-weight: bold;
    align-items: center;
    display: flex;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
  }

  .remain-amount-label {
    color: #222222;
    display: flex;
    padding-left: 20px;
    font-weight: bold;
    align-items: center;
  }

  .confirmOnline {
    height: 100%;
    width: 100%;
    /* background: #00AFEB; */
    /* border-radius: 0px; */
    font-size: 20px;
  }

  .remark {
    min-height: 36px;
    line-height: 36px;
    /* line-height: 21px; */
    color: #222222;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #CDCDCD;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bottom thead {
    height: 50px;
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

  .blink {
    -webkit-animation: blink 1.5s 0s infinite;
    animation: blink 1.5s 0s infinite;
  }

  @keyframes blink {
    0% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
    50% {
      box-shadow: 0 0 40px #EB6F83 inset;
    }
    100% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
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
    height: 50px;
  }

  .bottom td {
    padding-left: 10px;
  }
</style>
