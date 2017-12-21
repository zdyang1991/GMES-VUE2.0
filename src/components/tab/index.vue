<script>
	import tabNav from './tabNav.vue'
	export default {
		data(){
			return {
				panes:[],
				currentName:'first',
			}
		},
		created(){
			this.currentName = this.activeName || 'first';
		},
		mounted(){
			/*const index = this.$slots.default.filter(item => {
	          return item.elm.nodeType === 1 && /\btab-pane\b/.test(item.elm.className);
	        });
	        this.panes.push(...index);*/
		},
		components: {
	      tabNav
	    },
	    methods:{
	    	addPanes(item) {
		        const index = this.$slots.default.filter(item => {
		          return item.elm.nodeType === 1 && /\btab-pane\b/.test(item.elm.className);
		        }).indexOf(item.$vnode);
		        this.panes.splice(index, 0, item);

		    },
	    	setCurName(name){
	    		this.currentName = name
	    	},
	    },
	    props:{
	    	activeName:{
	    		type:String
	    	},
	    	navWidth:{
	    		type:String,
	    		default:'100%'
	    	}
	    },
		render(h){
			let {
		        type,
		        panes,
		        setCurName,
		        currentName,
		        navWidth,
		    } = this;
		    const navData = {
	        	props: {
		          panes,
		          setCurName,
		          currentName,
		          navWidth
		        }
	     	};
	    	return (
    			<div class="gl-tabs" sw-role="cell" sw-mode="y">
    				<tab-nav {...navData}></tab-nav>
    				<div class="content">{this.$slots.default}</div>
    			</div>
	    	)
	    },
	}
</script>

<style lang="less" scoped>
	.gl-tabs{	
		width: 100%;
	    height: 100%;;
	    .nav-list{

	    }
	    .content{
	    	flex:1;
	    	overflow:auto;
	    }
	}

</style>
