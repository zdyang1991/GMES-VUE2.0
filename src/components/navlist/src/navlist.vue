<template>
  <div id="nav-menu-list">
    <ul  v-for="item in MenuListData">
      <li>
        <router-link :to="{name:item.menuText}" tag="div">
        {{item.menuText}}
        </router-link>
      </li>
    </ul>
  </div>
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

      }
    },
    methods:{

    }
  }
</script>
<style lang="less" scoped>
@import "../../../css/navlist.less";
</style>
