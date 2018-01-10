<template>
  </div>
  <transition name="router-slid">
    <div id="nav-menu-list" v-if="isMenuShow">
      <div class="user-info">
        <div class="image">
        </div>
        <span>{{userName}}</span>
      </div>
      <ul>
        <li v-for="(item,index) in MenuListData" @click="getTitle(index)" ref='menuTitle'>
          <router-link :to="{name:item.menuText}" tag="div">
            {{item.menuText}}
          </router-link>
        </li>
      </ul>
      <!--<button class="bottom-con">-->
      <!--<div v-on:click="quit()" style="display: flex">-->
      <!--<span class="el-icon-pad-off"></span>-->
      <!--退出登录-->
      <!--</div>-->
      <!--</button>-->
      <button class="bottom-full">
        <div style="display: flex;width: 6rem" @click="requestFullScreen()">
          <span></span>
          {{screentitle}}
        </div>
      </button>
      <button class="bottom-con">
        <div v-on:click="quit()" style="display: flex">
          <span class="el-icon-pad-off"></span>
          退出登录
        </div>
      </button>
    </div>
  </transition>

</template>
<script type="text/babel">
  import util from '../../../utils/util.js';
  import config from '../../../js/config';
  import httpserver from '../../../utils/http.js';
  import api from '../../../utils/api.js';

  export default {
    name: 'navlist',
    props: ['isMenuShow'],
    fullscreen: false,
    userName: '',
    screentitle: '进入全屏',
    computed: {
      MenuListData() {
        let obj = JSON.parse(localStorage.getItem("list"));
        return obj
      }
    },
    created() {
      this.userinfo();
      this.requestFullScreen()
    },
    data() {
      return {
        showColor: true,
      };
    },
    methods: {
      quit() {
            httpserver(api.logout)
          .then((res) => {
            util.sessionClean();
            this.$router.push('/login');
          })
//            headers: {
//              'Content-Type': 'application/x-www-form-urlencoded',
//            },
//            method: 'post',
//            url: config.apiBaseUrl + 'restful/loginOut',
//          })
//          .then((response) => {
//            util.sessionClean();
//            this.$router.push('/login');
//          })
//          .catch((error) => {
//
//          })
      },
      userinfo() {
        this.userName = sessionStorage.getItem("userCode");

      },
      getTitle(index) {
        let getMenuText = this.$refs.menuTitle[index].innerText;
        this.$store.state.title = getMenuText;
        localStorage.setItem('title', getMenuText)
      },
      //进入全屏
      requestFullScreen() {
        var element = document.documentElement;

        console.log(this.fullscreen);
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
          this.screentitle = "退出全屏"
          this.fullscreen = !this.fullscreen;

        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
          this.screentitle = "进入全屏"
          this.fullscreen = !this.fullscreen;
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../css/navlist.less";
</style>
