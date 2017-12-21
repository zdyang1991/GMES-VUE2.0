<script>
	const noop = function(){}
	export default {
		data(){
			return {

			}
		},
		props:{
			panes: Array,
			setCurName: {
	        	type: Function,
	        	default: noop
	        },
	        currentName:{
	        	type: String
	        },
	        navWidth: String,
		},
		render(h) {
			const {
				panes,
				setCurName,
				currentName,
				navWidth,
			} = this;
	      	const tabs = this._l(panes, (pane, index) => {
	      		const { label, name } = pane
	      		return (<div class={{ 'nav-bar': true , 'active' : currentName === name }} sw-role="cell" sw-align="center"  sw-valign="center" name={label} on-click={()=>{this.setCurName(name)}}>{label}</div>)    
	      	});
	     	return (<div class="nav-list" style={{width:navWidth}} sw-role="cell">{tabs}</div>)
	    }
	}
</script>

<style lang="less" scoped>
	.nav-list{	
		width: 100%;
	    height: 40px;
	    border: 1px solid #1db0ec;
   		border-radius: 2px;
   		margin-bottom: 10px;
   		font-size:17px;
	    .nav-bar{
	    	flex:1;
	    	background:#fff;
	    }
	    .active{
	    	background: #1db0ec;
   			color: #FFF;
	    }
	}

</style>