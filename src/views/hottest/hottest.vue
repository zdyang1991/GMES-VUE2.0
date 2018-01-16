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
    data(){
      return{
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
//        接口暂时使用查询发动机的接口
        httpserver(api.getSerialNoInformation,body)
          .then((res) => {


          })

      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/hottest.less";
</style>
