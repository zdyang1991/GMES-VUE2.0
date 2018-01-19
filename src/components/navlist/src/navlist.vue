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
    userName: '',
    computed: {
      MenuListData() {
        let obj = JSON.parse(localStorage.getItem("list"));
        return obj
      }
    },
    created() {
      this.userinfo();
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
            clearInterval(this.$store.state.timer1);
            this.$router.push('/login');
          })
      },
      userinfo() {
        this.userName = sessionStorage.getItem("userCode");

      },
      getTitle(index) {
        let getMenuText = this.$refs.menuTitle[index].innerText;
        this.$store.state.title = getMenuText;
        localStorage.setItem('title', getMenuText)
      },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../css/navlist.less";
</style>
