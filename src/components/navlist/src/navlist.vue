<template>
  </div>
  <transition name="router-slid">
    <div id="nav-menu-list" v-if="isMenuShow">
      <ul>
        <li v-on:click="changeColor()"  v-for="item in MenuListData">
          <router-link :to="{name:item.menuText}" tag="div">
            {{item.menuText}}
          </router-link>
        </li>
      </ul>
      <div class="bottom-con">
      退出登录
      </div>
    </div>
  </transition>

</template>
<script type="text/babel">
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
      changeColor(){

      }

    }
  }
</script>
<style lang="less" scoped>
@import "../../../css/navlist.less";
</style>
