<template>
  <div class="initialize">
    <div class="topbox">
      <el-container>
        <el-aside width="60%">
          <!--<proinfo :formName="formName"></proinfo>-->
          <div>
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
                    <label class="label">物料编号</label>
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
              <div class="row f-df">
                <div class="row-container f-df">
                  <div class="item-container f-f1">
                    <label class="label">发动机号</label>
                    <div class="detail"></div>
                  </div>
                  <div class="item-container f-f1">
                    <label class="label">订单编号</label>
                    <div class="detail"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
        <el-main>
          <pro-gress></pro-gress>
        </el-main>
      </el-container>
      <!--<button @click="setReviseInfo()">2222222</button>-->
    </div>
    <div class="bottom-form">
      <el-table :data="tableData" border style="width: 100%;">
        <el-table-column prop="productOrderNum" label="订单编号" width="180">
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
    <div class="fixed-box">
      <span @click="getHistoryInfo()">历史记录</span>
      <span>TAG初始化</span>
    </div>
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
        :page-sizes="[1]"
        :page-size="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-dialog>
  </div>
</template>
<script>
  import util from '../../utils/util.js';
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';

  export default {
    data() {
      return {
        tableData: [],
        dialogTableVisible: false,
        dialogFormVisible: false,
        gridData: [],
        total: 0,
        ReviseInfo: {
          statuseCode: '',//工单状态
          productionOrderNum: "NO_0000000167"//工单编号
        }

      }
    },
    computed: {},
    created() {
      this.getData();
      this.setReviseInfo();
    },
    methods: {
      getData: function () {

        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        let body = {
          workCenterCode: loc.workCenterCode,
          statuseCode: '7',
          endRow: 2
        };
        httpserver(api.getinitializeTable, body)
          .then((res) => {
            this.tableData = res.data.data;
          })
      },
      //工单修改信息上传
      setReviseInfo: function () {
        let loc = JSON.parse(window.localStorage.getItem('terminal'));
        this.ReviseInfo.statuseCode = '10';
        httpserver(api.setReviseInfo, this.ReviseInfo)
          .then((response) => {
          })
      },
      //弹窗
      open4() {
        this.$alert('', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
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
            console.log(response);

            if (response.data.returnCode == "0") {
              let resData = response.data.data;
              this.gridData = resData.productionStnRecords;
              this.total = resData.toalCount;
            }

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
          pageNo: val,
          pageSize: "1"
        };
        httpserver(api.getHistoryInfo, body)
          .then((response) => {
            console.log(333)
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      }

    }

  }

</script>
<style lang="less">
  @import "../../css/initialize/initialize.less";
</style>
