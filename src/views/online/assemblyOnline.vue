<!-- 装配上线-assemblyOnline-->
<template>
  <div class="bg" v-if="true" element-loading-text="玩命加载中">
    <div class="body f-df">
      <div class="left">
        <!--<AssemblyOrder></AssemblyOrder>-->
        <!--<div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>-->
        <!--<div v-else class="img-container no-info"></div>-->
        <div id="currentorder" class="right-container">
          <!-- 第一行 -->
          <div class="row f-df">
            <div class="row-container f-df">
              <div class="item-container f-f1">
                <!--订单编号-->
                <label class="label">工单编号</label>
                <div class="detail"></div>
              </div>
              <div class="item-container f-f1">
                <!--工单编号-->
                <label class="label">机型</label>
                <div class="detail"></div>
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="row f-df">
            <div class="row-container f-df">
              <div class="item-container f-f1">
                <!--发动机号-->
                <label class="label">序列号</label>
                <div class="detail"></div>
              </div>
              <div class="item-container f-f1">
                <!--机型-->
                <label class="label">物料描述</label>
                <div class="detail"></div>
              </div>
            </div>
          </div>
          <!-- 第三行 -->
          <div class="row f-df">
            <div class="row-container f-df">
              <div class="item-container f-f1">
                <label class="label">计划数量</label>
                <div class="detail"></div>
              </div>
              <div class="item-container f-f1">
                <label class="label">顺序号</label>
                <div class="detail"></div>
              </div>
            </div>
          </div>
          <!--<div class="row f-df">-->
            <!--<div class="row-container f-df">-->
              <!--<div class="item-container f-f1">-->
                <!--<label class="label"></label>-->
                <!--<div class="detail"></div>-->
              <!--</div>-->
              <!--<div class="item-container f-f1">-->
                <!--<label class="label"></label>-->
                <!--<div class="detail"></div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
      <div class="right">
        <div class="img-container no-info engine"></div>
      </div>
    </div>
    <div class="bottom-table">
      <el-table :data="tableData" style="width: 100%;">
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

    <!--按钮-->
    <div class="fixed-box">
      <span @click="getHistoryInfo()">历史记录</span>
      <span>TAG初始化</span>
    </div>
    <!--弹框-->
    <el-dialog :visible.sync="dialogTableVisible" width="80%">
      <el-table :data="gridData">
        <el-table-column prop="productOrderNum" label="订单编号">
        </el-table-column>
        <el-table-column prop="workOrderNum" label="工单编号">
        </el-table-column>
        <el-table-column prop="productModel" label="机型">
        </el-table-column>
        <el-table-column prop="materialCode" label="物料编码">
        </el-table-column>
        <el-table-column prop="materialText" label="物料描述">
        </el-table-column>
        <el-table-column prop="quanlity" label="计划数量">
        </el-table-column>
        <el-table-column prop="orderNo" label="顺序号">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
  // import currentorder from './component/currentOrder.vue';
  import util from '../../utils/util.js';
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';

  export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        gridData: [],
        pageNo: '',
        pageSize: ""
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData: function () {

        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          statuseCode: '10',
          endRow: 5
        };
        httpserver(api.getAssemblyData, body)
          .then((response) => {
            this.tableData = response.data.data;
          })
      },
      getHistoryInfo() {
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo: "1",
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
            console.log(response.data);
            this.gridData = response.data.data;
          })
      },
//      控制每页几条
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
//      当前的页数
      handleCurrentChange(val) {

      }
    }

  }
</script>


<style lang="less" scoped>
  .bottom-table {
    /*height: calc(100% - 26rem);*/
    height: 30%;
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

  .engine {
    background: url("../../assets/engie.png") no-repeat center;
  }

  .fixed-box {

  span:first-child {
    margin-right: 2rem;
    width: 7rem;
    height: 7rem;
    background-color: #009DD9;
    position: fixed;
    top: 6.3rem;
    right: 0;
    border-radius: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    color: white;
  }

  span:last-child {
    margin-right: 2rem;
    width: 7rem;
    height: 7rem;
    background-color: #009DD9;
    position: fixed;
    top: 15rem;
    right: 0;
    border-radius: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    color: white;
  }

  }
  .el-pagination {
    margin-top: 1rem;
  }

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

  /* @import ""; */
</style>
