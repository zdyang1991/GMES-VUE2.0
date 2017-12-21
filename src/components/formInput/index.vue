<template>
	<div class="line f-df" :sw-mode="swMode">
		<template v-for="item in items">
			<div class="form-input" :style="{ fontSize: styles.fontSize}">
				<span class="name" :style="{ fontSize: styles.fontSizeName,color: styles.colorName}" >{{item.name}}</span>
				<span class="value" :style="{ fontSize: styles.fontSizeValue,color: styles.colorValue}">{{item.value}}</span>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		props:{
			items: {
		      type: Array,
		      default: function(){
		      	return []
		      }
		    },
		    styles:{
		      type: Object,
		      default: '2rem'
		    },
		    swMode:{
		      type: String,
		      default: 'x'
		    }
		}
	}
</script>
<style lang="less" scoped>
	.line{
		margin:10px 0;
	}
    .form-input{
		display: flex;
		font-size:1rem;
	    flex: 1 1 0%;
	    margin: 4px 8px;
	    & .name{
	    	margin-right:16px;
    		color: rgb(89, 89, 89);
	    }
	    & .value{
	    	color: rgb(34, 34, 34);
		    flex: 1 1 0%;
		    border-bottom: 1px solid rgb(205, 205, 205);
		    padding: 2px 0px;

	    }
	}
</style>