<!-- 底部栏 -->
<template>
  <div id="app-foot">
    <div class="btn-list">
      <div class="foot-btn f-cp icon-pad-menu" id="ment-list" v-on:click="menuClick()" style="color:#fff;">
        <div class="menu-img"></div>
      </div>
    </div>
    <div class="system-info" sw-role="cell">
      <div class="time" sw-role="cell" sw-mode="y" sw-valign="center">
        <div>{{systime}}</div>
        <div>{{sysdate}}/{{week}}</div>
      </div>
      <div class="signal" :class="this.wifiStatus==0?'success':'fail'">

      </div>
    </div>
    <navlist :isMenuShow='isMenuShow'></navlist>
  </div>
</template>

<script>
  import config from '../../js/config'
  import getTime from '@/js/timeFormat'
  import timer from '@/js/timerManager'

  export default {
    data() {
      return {
        sysdate: '',
        week: '',
        systime: '',
        isMenuShow: false,
        wifiStatus: ''
      }
    },
    computed: {},
    created() {
      let body = document.querySelector('body');
      body.addEventListener('click', (e) => {
        if (e.target.id !== 'ment-list') {
          this.isMenuShow = false;
        }
      }, false);
      const _this = this;
//      this.getServerTime = setInterval(() => {
//        _this.$http({
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//          },
//          method: 'get',
//          url: config.apiBaseUrl + 'restful/cm/getServerTime',
//        }).then((response) => {
//          console.log(response.data.returnCode)
//          this.wifiStatus = response.data.returnCode;
//          let data = (new Date(response.data.data)).getTime();//转换为毫秒数
//          const date = getTime.gettime(response.data.data);
//          _this.sysdate = getTime.five(date);
//          _this.systime = getTime.six(date)
//          _this.week = date.week;
//          timer.register('systime', () => {
//            console.log(2222222222222);
//            _this.systime = getTime.six(data)
//            data = data + 1000
//          }, 1000)
//        });
//      }, 2000)
      _this.$http({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'get',
        url: config.apiBaseUrl + 'restful/cm/getServerTime',
      }).then((response) => {
        //this.wifiStatus = response.data.returnCode;
        let data = (new Date(response.data.data)).getTime();//转换为毫秒数
        const date = getTime.gettime(data);
        _this.sysdate = getTime.five(date);
        _this.week = date.week;
        window.setInterval(function () {
          data = data + 1000
          _this.systime = getTime.six(data)
        }, 1000)
      });
    },


    methods: {
      menuClick() {
        this.isMenuShow = !this.isMenuShow
      },
    }
  }
</script>
<style lang="less" scoped>
  #app-foot {
    position: relative;
    height: 70px;
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

  .el-button {
    margin-left: 3rem;
  }
  .icon-pad-menu:before{
    content:'';
  }
  #ment-list{
    background-color: #fff;
    /*background-color: red;*/
    background-image:url("../../assets/menu.png") ;
    background-size: 100% 100%;
  }

  #nav-menu-list .bottom-con span{
    background-image: url("../../assets/layout.png");

  }
</style>
