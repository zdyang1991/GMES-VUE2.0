<template>
	<div class="bg" v-loading="!moduleMenus.favorMenu">
		<div class="f-df" id="home-content">
			<template v-for="item in moduleMenus.favorMenu">
				<div class="menuBtn f-aic f-tac" >
					<a class="f-aic f-tac f-jcc"  :href="'#\/' + item.url">{{item.menuText}}</a>
				</div>
			</template>
			<div class="menuBtn f-aic f-tac" >
				<a class="f-aic f-tac f-jcc"  href="/#dailywork">报工</a>
			</div>
			<div class="menuBtn f-aic f-tac" >
				<a class="f-aic f-tac f-jcc on"  href="/#dailyworklist">报工履历</a>
			</div>
		</div>
	</div>

</template>

<script>
import { mapGetters, mapActions} from 'vuex';
import userinfo from '@/js/userinfo'
export default {
	data(){
		return {
			
		}
	},
	computed: mapGetters({
		moduleMenus: 'recordmoduleMenus',

    }),
    created(){
		this.$store.dispatch('setTitle','首页');
    },
	methods:{
		...mapActions([
	      'text', 
		]),
		
	}
}
</script>
<style lang="less" scoped>
	.bg {
		background:#ededed;
		height:100%;
	}

	#home-content{
		padding-left: 2rem;
    	padding-right: 2rem;
    	box-sizing: border-box;
		width:100%;
		margin:0 auto;
		flex-wrap:wrap;
	}

  	.menuBtn{	
		margin-top:2rem;
  		width:25%;
  		height:5.5rem;
		padding: 0 1rem 0 1rem;
		box-sizing: border-box;
  	}

	.menuBtn  a{
		border:1px solid rgb(181, 190, 209);
		margin:0 auto;
		height:100%;
		width:100%;
		background:#f7f7f7;
		text-align:center;
		font-size:1rem;
		color:rgb(34, 34, 34);
		padding-left: 4px;
		padding-right:4px;
		display: flex;
		box-sizing: border-box;
	}

	.menuBtn a.on {
		background:#3681d0;
		color:white;
	}
	
</style>
