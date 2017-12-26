<template>
  <div id="nav-menu-list">
    <el-menu :unique-opened="true" class="el-menu-vertical-demo" theme="dark" v-bind:router="true">
      <el-menu-item index="/system">
        <span slot="title">串口配置</span>
      </el-menu-item>
      <el-menu-item index="/initialize">
        <span slot="title">初始化</span>
      </el-menu-item>
      <el-menu-item index="/online/machineplusOnline">
        <span slot="title">机加上线</span>
      </el-menu-item>
      <el-menu-item index="">
        <span slot="title">机加下线</span>
      </el-menu-item>
      <el-menu-item index="/online/assemblyOnline">
        <span slot="title">装配上线</span>
      </el-menu-item>
      <el-menu-item index="/assembleInsert">
        <span slot="title">装配下线</span>
      </el-menu-item>
      <el-menu-item index="/hothost">
        <span slot="title">热试</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'navlist'
  }
</script>
<style lang="less" scoped>
@import "../../../css/navlist.less";
</style>
