<!-- 装配上线-assemblyOnline-->
<template>
  <div class="assemblyOnline">
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
      <div class="icon-pad-history" @click="getHistoryInfo()">
      </div>
      <!--弹框-->
      <el-dialog :visible.sync="dialogTableVisible" width="80%">
        <el-table :data="gridData">
          <el-table-column prop="productOrderNum" label="订单编号">
          </el-table-column>
          <el-table-column prop="productionOrderNum" label="工单编号">
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
          :page-sizes="[1]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  // import currentorder from './component/currentOrder.vue';
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';

  export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        gridData: [],
        pageNo: '',
        total:0,

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
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      },
//      控制每页几条
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
//      当前的页数
      handleCurrentChange(val) {
        console.log(val)
        this.dialogTableVisible = true;
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workStationCode: loc.workStationCode,
          pageNo:val ,
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      }
    }

  }
</script>


<style lang="less" scoped>
  @import "../../css/online/assemblyOnline.less";

</style>
