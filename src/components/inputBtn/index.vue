<template>
	<div class="input-serach-btn f-df">
		<label>{{title}}</label>
		<input class="input-serach" type="text" :autofocus="true" @input="$emit('input', $event.target.value)" v-bind="$props" placeholder="请输入内容"/>
		<slot name="btn"></slot>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		props:{
			title: {
		      type: String,
		      default: '产品标识号'
		    },
		    value:{
		      type: String,
		      default: ''
		    },
		    readonly:{
		      type :Boolean,
		      default:false
		    }
		}
	}
</script>
<style lang="less" scoped>
  .input-serach-btn{
  	font-size: 1rem;
  	padding: 10px;
  	label{
  		line-height: 2.2rem;
  		padding-right:10px;
  		text-align:center;
  	}
  	.input-serach{
	  	flex: 1;
	    border-radius: 4px;
	    border: 1;
	    height: 2.2rem;
	    border: 1px solid #bfcbd9;
	    padding-left: 10px;
	}
  }
  
	
</style>