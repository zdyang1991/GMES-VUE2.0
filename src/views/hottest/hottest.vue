<template>
  <div class="hottest">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">产品序列号</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">
        </el-input>
        <el-button type="primary" @click="getOrderInfo()">确定</el-button>
      </div>
    </div>
    <div class="topbox">
      <div id="currentorder" class="right-container">
        <!-- 第一行 -->
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">工单编号</label>
              <div class="detail">{{proinfo.productionOrderNum}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料编号</label>
              <div class="detail">{{proinfo.materialCode}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">物料描述</label>
              <div class="detail">{{proinfo.materialText}}</div>
            </div>
          </div>
        </div>
        <div class="row f-df">
          <div class="row-container f-df">
            <div class="item-container f-f1">
              <label class="label">产品机型</label>
              <div class="detail">{{proinfo.productModel}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">顺序号</label>
              <div class="detail">{{proinfo.orderNo}}</div>
            </div>
            <div class="item-container f-f1">
              <label class="label">计划数量</label>
              <div class="detail">{{proinfo.plannedQty}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">物料条码</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)">
        </el-input>
        <el-button type="primary" @click="getOrderInfo()">确定</el-button>
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
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  export default {
    data(){
      return{
        currentRow: '',
        productionOrderNum: '',
        tableData: [],
        gridData: [],
        code: '',
        productCount: 0,
        dialogTableVisible: false,
        currentRow:null,
        proinfo:{}
      }
    },
    methods:{
      show: function (ev) {
        let _this = this;
        if (ev.keyCode == 13) {
          let body = {
            serialNo: _this.code
          };

          httpserver(api.getSerialNoInformation, body)
            .then((res) => {
              this.gridData = res.data.data;
            })
        }
      },
      getOrderInfo(){
        let body={
          serialNo:this.code
        };
        //6947463266069
//            6944437047143
        httpserver(api.getSerialNoInformation,body)
          .then((res) => {
            console.log(res);
            this.proinfo = res.data.data;
          })

      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/hottest.less";
</style>
