<template>
	<div id="nav-menu-list">
		<el-menu :unique-opened="true"  class="el-menu-vertical-demo" theme="dark" v-bind:router="true">
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

<script>
	import { mapGetters } from 'vuex';
	export default {
		data(){
			return {
				navMenuList:[],
			}
		},
		computed: mapGetters({
        	moduleMenuList: 'recordmoduleMenus',
  		}),
		methods:{
			closeMenu(){
				this.$emit('closeMenu')
			},
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
		}
	}
</script>

<style lang="less" scoped>

</style>
