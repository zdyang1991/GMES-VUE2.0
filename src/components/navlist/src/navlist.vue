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
        <li  v-for="item in MenuListData">
          <router-link :to="{name:item.menuText}" tag="div">
            {{item.menuText}}
          </router-link>
        </li>
      </ul>
      <button class="bottom-con" >
        <div v-on:click="quit()">
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
  export default {
    name: 'navlist',
    props:['isMenuShow'],
    userName:'',

    computed:{
      MenuListData(){
        let obj=JSON.parse(localStorage.getItem("list"))
        return obj
      }
    },
    created(){
      this.userinfo();
    },
    data(){
      return {
        showColor: true,
      };
    },
    methods:{
      quit(){
        this.$http({
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
            url: config.apiBaseUrl + 'restful/loginOut',
          })
          .then((response) => {
            util.sessionClean();
            this.$router.push('/login');
          })
          .catch((error) => {

          })

      },
      userinfo(){
        this.userName=sessionStorage.getItem("userCode");

      }


    }
  }
</script>
<style lang="less" scoped>
@import "../../../css/navlist.less";
</style>
