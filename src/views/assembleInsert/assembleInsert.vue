<template>
  <div class="assembleInsert">
    <div class="convent">
      <div class="convent-input">
        <span style="width: 8rem;font-size: 1.2rem;">发动机号</span>
        <el-input  :autosize="{ minRows: 4, maxRows: 4}" size="80" @keyup.enter.native="show($event)" v-model="code">

        </el-input>
        <el-button type="primary" @click="getSerialNoInformation()">确定</el-button>
      </div>
      <el-button type="success">已扫数量：{{productCount}}</el-button>
    </div>
    <div class="topbox">
      <el-container>
        <el-aside width="50%">
          <div id="currentorder" class="right-container">
            <!-- 第一行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                  <!--订单编号-->
                  <label class="label">订单编号</label>
                  <div class="detail"></div>
                </div>
                <div class="item-container f-f1">
                  <!--工单编号-->
                  <label class="label">工单编号</label>
                  <div class="detail"></div>
                </div>
              </div>
            </div>
            <!-- 第二行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                  <!--发动机号-->
                  <label class="label">发动机号</label>
                  <div class="detail"></div>
                </div>
                <div class="item-container f-f1">
                  <!--机型-->
                  <label class="label">机型</label>
                  <div class="detail"></div>
                </div>
              </div>
            </div>
            <!-- 第三行 -->
            <div class="row f-df">
              <div class="row-container f-df">
                <div class="item-container f-f1">
                <label class="label">产品描述</label>
                <div class="detail"></div>
                </div>
                <div class="item-container f-f1">
                  <label class="label">产品编号</label>
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
        </el-aside>
        <el-main>
          <pro-gress></pro-gress>
        </el-main>
      </el-container>
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
    <div class="bottom-box">
      <el-button type="danger">需要热试</el-button>
      <el-button type="primary">保存</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  export default {
    data() {
      return {
        //serialPort:new SerialPort('COM3',false),
        code: '',
        dialogTableVisible:false,
        tableData: [],
        total:0,
        gridData:[],
        productCount:1


      }
    },
    created() {
      console.log("打开串口");
      this.openCom();
    },
    beforeDestroy: function() {
      console.log("销毁前关闭串口");
      this.closeCom();

    },
    methods: {
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
            console.log(333)
            let resData = response.data.data;
            this.gridData = resData.productionStnRecords;
            this.total = resData.toalCount;

          })
      },
      openCom() {
        let _this = this;
        let Readline = SerialPort.parsers.Readline;
        let parser = new Readline();
        _this.serialPort.pipe(parser);
        _this.serialPort.open(function (error){
          console.log("打开" + error);
        })
        parser.on('data', function (data) {
          console.log(data);
          _this.code = data;
          console.log(_this.code);
        })
      },
      closeCom() {
        let _this = this;
        _this.serialPort.close();
      },
      getSerialNoInformation(){
        let body={
          serialNo:this.code
        };

        httpserver(api.getSerialNoInformation,body)
          .then((res) => {
          //6947463266069
            this.gridData = res.data.data;


            if(res.returnCode==0){
              localStorage.setItem('Procount',this.productCount)
              this.productCount=localStorage.getItem('Procount');
              this.productCount++
            }
          })
      },
      show:function (ev) {
        let _this = this;
        console.log(this.code);
        if(ev.keyCode==13){
          let body={
            serialNo:_this.code
          };

          httpserver(api.getSerialNoInformation,body)
            .then((res) => {
              //6947463266069
              this.gridData = res.data.data;
            })
        }
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

  .fixed-box{
    span:first-child{
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 21rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.4rem;
      color: white;
    }
    span:last-child{
      width: 7rem;
      height: 7rem;
      background-color: #009DD9;
      position: fixed;
      top: 29rem;
      right: 0;
      border-radius: 8rem ;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.2rem;
      color: white;
    }
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
</style>
