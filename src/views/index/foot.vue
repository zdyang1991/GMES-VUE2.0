<!-- 底部栏 -->
<template>
  <div id="app-foot">
    <div class="btn-list">
      <div class="foot-btn f-cp icon-pad-menu" id="ment-list" v-on:click="menuClick()" style="color:#fff;">

      </div>
      <router-link :to="{name:'消息'}">
        <div class="foot-btn f-cp icon-pad-message">
        </div>
      </router-link>


      <div class="foot-btn f-cp icon-pad-fullscreen" v-on:click="requestFullScreen()">
      </div>
      <el-dialog title="测试消息" :visible.sync="messageDialogVisible" width="80%" center>
        <span class="message">{{messages}}</span>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subscribe()">订阅消息</el-button>
        <el-button type="primary" @click="unsubscribe()">取消订阅</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="system-info" sw-role="cell">
      <div class="time" sw-role="cell" sw-mode="y" sw-valign="center">
        <div>{{systime}}</div>
        <div>{{sysdate}}/{{week}}</div>
      </div>
        <div class="signal" :class="wifiStatus=='0'?'success':'fail'">

          <!--<div class="infoStrong"  v-if="this.connectTime<30"></div>-->
          <!--<div class="infoStrong1" v-if="this.connectTime<25"></div>-->
          <!--<div class="infoStrong2" v-if="this.connectTime<20"></div>-->
          <!--<div class="infoStrong3" v-if="this.connectTime<15"></div>-->
          <!--<div class="infoStrong4" v-if="this.connectTime<10"></div>-->
          <!--<div class="infoStrong5" v-if="this.connectTime<5"></div>-->
        </div>
    </div>
    <navlist :isMenuShow='isMenuShow'></navlist>
  </div>
</template>

<script>
  import config from '../../js/config'
  import getTime from '@/js/timeFormat'
  import timer from '@/js/timerManager'
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  import mqttLib from '../../utils/mqtt.js';

  export default {
    data() {
      return {
        fullscreen: true,
        messages: '',
        messageDialogVisible: false,
        sysdate: '',
        week: '',
        systime: '',
        isMenuShow: false,
        wifiStatus: '0',
//        connectTime:0
      }
    },
    computed: {
      time:{
        set(val){
          this.$store.state.timer1 = val;
        },
        get() {
          return this.$store.state.timer1;
        }
      }
    },
    created() {
      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.id !== 'ment-list') {
          this.isMenuShow = false;
        }
      }, false);
      this.getServertime();
      if ( this.time ) {
        clearInterval(this.time);
      }
      this.gettest();
    },
    methods: {
//      全屏
      requestFullScreen() {
        var element = document.documentElement;
        if (this.fullscreen == true) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
          this.fullscreen = !this.fullscreen;
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          this.fullscreen = !this.fullscreen;
        }
      },
//      菜单
      menuClick() {
        this.isMenuShow = !this.isMenuShow
      },
      getMessage() {
        this.messageDialogVisible = true
      },
      gettest() {
        this.$store.state.timer1=window.setInterval(()=>{
        this.getServertime();
        },20000);
      },
//      时间+信号
      getServertime() {
        let _this = this;
       httpserver(api.getServertime)
          .then((response) => {
            let data = (new Date(response.data.data)).getTime();//转换为毫秒数
            const date = getTime.gettime(data);
            _this.sysdate = getTime.five(date);
            _this.week = date.week;
            window.setInterval(function () {
              data = data + 1000
              _this.systime = getTime.six(data)
            }, 1000)
          })
      },
      subscribe() {
        let _this = this;
        let topic = "/logs";
        console.log("begin----------");
        mqttLib.subscribe(topic, "message");
        mqttLib.registerMessageHandler(topic, "message", function (message) {
          _this.messages = message.payloadString;
          console.log(_this.messages);
        });
      },
      unsubscribe() {
        console.log("close----------");
        mqttLib.unsubscribe("/message", "message");
      }
    }
  }
</script>
<style lang="less">
  #app-foot {
    position: relative;
    height: 60px;
    width: 100%;
    box-shadow: 0px -2px 5px #cdcdcd;
    display: flex;
    color: #222222;
    align-items: center;
    .btn-list {
      display: flex;
      flex: 1;
    }
    .system-info {
      .time {
        text-align: right;
        font-size: 16px;
      }
    }
    .signal {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      margin-left: 2rem;
      margin-right: 2rem;
    }
    .success {
      background: url("../../assets/WIFI-success.png");
      background-size: 100% 100%;
    }
    .fail {
      background: url("../../assets/WIFI-faile.png");
      background-size: 100% 100%;
    }
    .el-checkbox-group label {
      margin-left: 15px;
    }
    .form-content {
      width: 100%;
      height: 400px;
      overflow: auto;
      margin-bottom: 20px;
      .btn {
        position: absolute;
        bottom: -10px;
      }
    }
  }

  .title {
    flex: 1;
  }

  .foot-btn {
    margin-left: 20px;
  }

  .foot-btn {
    width: 50px;
    height: 50px;
    background: #0e69b0;
    line-height: 50px;
    text-align: center;
    color: #FFF;
    border-radius: 5px;
    font-size: 20px;
  }

  #app-foot .el-button {
    margin-left: 3rem;
  }

  .icon-pad-menu:before {
    content: '';
  }

  #ment-list {
    background-color: #fff;
    /*background-color: red;*/
    background-image: url("../../assets/menu.png");
    background-size: 100% 100%;
  }

  #nav-menu-list .bottom-con span {
    background-image: url("../../assets/layout.png");

  }

  #app-foot .el-dialog {
    height: 30rem;
    .el-dialog__header {
      .el-dialog__title {
        font-family: "Bell MT";
        font-size: 2rem;
        color: blue;
      }
      height: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-dialog__body {
      height: 10rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .message {
      font-family: "Bell MT";
      font-size: 2rem;
      color: darkred;
    }
  }

  .icon-pad-message {
    background: url("../../assets/message.png");
    background-size: 100% 100%;
  }

  .icon-pad-fullscreen {
    background: url("../../assets/fullscreen.png");
    background-size: 100% 100%;
  }
  .infoStrong{
    height: 5px;
    width: 2px;
    background-color: #6FFC77;
    display: flex;
    align-self: flex-end;
  }
.infoStrong1{
  height: 10px;
  width: 2px;
  margin-left: 2px;
  background-color: #6FFC77;
  display: flex;
  align-self: flex-end;
}
  .infoStrong2{
    height: 15px;
    width: 2px;
    margin-left: 2px;
    background-color: #6FFC77;
    display: flex;
    align-self: flex-end;
  }
  .infoStrong3{
    height: 20px;
    width: 2px;
    margin-left: 2px;
    background-color: #6FFC77;
    display: flex;
    align-self: flex-end;
  }
  .infoStrong4{
    height: 25px;
    width: 2px;
    margin-left: 2px;
    background-color: #6FFC77;
    display: flex;
    align-self: flex-end;
  }
  .infoStrong5{
    height: 30px;
    width: 2px;
    margin-left: 2px;
    background-color: #6FFC77;
    display: flex;
    align-self: flex-end;
  }
</style>
