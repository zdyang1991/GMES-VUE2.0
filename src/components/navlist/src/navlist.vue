<template>
  </div>
  <transition name="router-slid">
    <div id="nav-menu-list" v-if="isMenuShow">
      <ul>
        <li  v-for="item in MenuListData">
          <router-link :to="{name:item.menuText}" tag="div">
            {{item.menuText}}
          </router-link>
        </li>
      </ul>
      <button class="bottom-con" v-on:click="quit()">
      退出登录
      </button>
    </div>
  </transition>

</template>
<script type="text/babel">
  import util from '../../../utils/util.js'
  export default {
    name: 'navlist',
    props:['isMenuShow'],
    computed:{
      MenuListData(){
        return this.$store.state.menulist;
      }
    },
    data(){
      return{
        showColor:true,
      }
    },
    methods:{
      quit(){
        util.sessionClean();
        this.$router.push('/login');
      }

    }
  }
</script>
<style lang="less" scoped>
@import "../../../css/navlist.less";
</style>
