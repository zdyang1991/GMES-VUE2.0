<template>
	<div id="nav-menu-list">
		<el-menu :unique-opened="true"  class="el-menu-vertical-demo" theme="dark" v-bind:router="true">
      <el-submenu index="1">
        <template slot="title">
          系统管理
        </template>
        <el-menu-item index="/system">系统配置</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
          <template slot="title">
            初始化
          </template>
        <el-menu-item index="/initialize">初始化</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">上线界面</template>
        <el-menu-item index="/online/assemblyOnline">装配上线</el-menu-item>
        <el-menu-item index="/online/machineplusOnline">机加上线</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          装配下线
        </template>
        <el-menu-item index="/assembleInsert">装配下线</el-menu-item>
      </el-submenu>
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
