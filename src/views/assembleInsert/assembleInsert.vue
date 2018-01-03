<template>
  <div class="assembleInsert">
    <div class="convent">
      <div class="convent-input">
        <el-input v-model="code" :autosize="{ minRows: 4, maxRows: 4}" size="80">
          <template slot="append">确认</template>
        </el-input>
      </div>
      <el-button type="success">已扫数量：22222222</el-button>
    </div>
    <div class="topbox">
      <el-container>
        <el-aside width="50%">
          <proinfo :formName="formName"></proinfo>
        </el-aside>
        <el-main>
          <pro-gress></pro-gress>
        </el-main>
      </el-container>
    </div>
    <div class="bottom-box">
      <el-button type="danger">需要热试</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        code: '',
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
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        let _this = this;
        let serialPort = new SerialPort('COM3', function (err) {
          if (err) {
            return console.log('Error: ', err.message);
          }
        });
        let Readline = SerialPort.parsers.Readline;
        let parser = new Readline();
        serialPort.pipe(parser);
        serialPort.open(function (error){
          console.log("打开" + error);
        })
        parser.on('data', function (data) {
          console.log(data);
          _this.code = data;
          console.log(_this.code);
        })
      }

    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/assembleInsert.less";
  .convent {
    background-color: #fff;
    height: 7rem;
    align-items: center;
    display: flex;
    /*justify-content: center;!*水平居中*!*/
    padding-left: 4rem;
    .convent-input {
      align-items: center;
      justify-content: center; /*水平居中*/
      display: flex;
      .el-input-group {
        .el-input__inner {
          border: 1px solid #1dbf64;
          width: 39rem;
          height: 5rem;
        }
      }

    }
    .el-button {
      margin-left: 2rem;
    }
  }
</style>
