<template>
	<div id="dailywork-content" class="f-df f-fdc">
		<input-btn title="产品标识号" class="bg" v-model="curproductNum" :readonly="readonly">
			<button slot="btn" class="search-btn" @click="getData">获取</button>
			<button slot="btn" class="search-btn" @click="submit">报工</button>
		</input-btn>
		<div class="vin-detail bg">
			<template v-for="item in product">
				<form-input :items="item" :styles="formInputstyle" swMode="x"></form-input>
			</template> 
			<form-input :items="configEnums" :styles="formInputstyle" swMode="x"></form-input>
		</div>
		<div class="dailywork-list f-df f-f1">
			<div class="product-detail bg">
				<div class="product-num-des">
					<span class="productNum">订单号({{orderPlan.productionOrderNum}})</span>
					<span class="num">{{orderPlan.onlineQuantity}}/{{orderPlan.plannedQuantity}}(已上线/计划数量)</span>
				</div>
				<template v-for="items in itemss">
					<form-input :items="items" :styles="formInputstyle" swMode="y"></form-input>
				</template>
			</div>
			<div class="plan-list bg">
				<tab>
					<tab-pane label="计划队列" name="first">
						<el-table
					      :data="planData"
					      style="width: 100%">
					      <el-table-column
					        type="index"
					        width="60">
					      </el-table-column>
					      <el-table-column
					        prop="materialText"
					        label="产品规格"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="unscheduledQuantity"
					        label="剩余数量"
					        width="180">
					      </el-table-column>
					      <el-table-column
					        prop="productNumList"
					        label="标识号明细">
					      </el-table-column>
					      <el-table-column
					        prop="productTrackNumList"
					        label="顺序号明细">
					      </el-table-column>
					    </el-table>

					</tab-pane>
					<tab-pane label="报工列表" name="second">
						<el-table
					      ref="singleTable"
					      :data="dailylistData"
					      v-loading="loading"
					      element-loading-text="加载中"
					      highlight-current-row
					      style="width: 100%">
					      <el-table-column
					        type="index"
					        width="60">
					      </el-table-column>
					      <el-table-column
					        property="productionSeqNum"
					        label="生产序列号">
					      </el-table-column>
					      <el-table-column
					        property="productNum"
					        label="产品标识号">
					      </el-table-column>
					      <el-table-column
					        property="materialText"
					        label="车型描述">
					      </el-table-column>
					      <el-table-column
					        property="quantity"
					        label="报工数量"
					        width="100">
					      </el-table-column>
					       <el-table-column
					        property="modifyDateTime"
					        label="报工时间">
					      </el-table-column>
					    </el-table>
					    <div class="block">
					      <el-pagination
					        layout="total,prev, pager, next"
					        :total="totalNum"
					        @current-change="handleCurrentChange">
					      </el-pagination>
					    </div>
				    </tab-pane>
				</tab>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, 
		 mapActions
	   } 			from 'vuex';
import userinfo 	from '@/js/userinfo'
import inputBtn 	from '@/components/inputBtn/index.vue'
import formInput 	from '@/components/formInput/index.vue'

import tab 			from '@/components/tab/index.vue';
import tabPane 		from '@/components/tab/tabpane.vue';
import { fetch } 	from '@/js/http'
import config 		from '@/js/config'
import timeFormat 	from '@/js/timeFormat'
export default {
	data(){
		return {
			loading:false,
			readonly:false,
			totalNum:0,
			stationCode:'',
			isfocus:true,
			curproductNum:'',
			productNumList:[],
			planData:[],
			dailylistData:[],
			product:[[{name:'生产顺序号',value:'--'},{name:'物料编码',value:'--'}],[{name:'产品描述',value:'--'}]],
			configEnums:[],
			formInputstyle:{color:'#FF5000',fontSize:'1.2rem',margin:'10px 0'},
			routingAcquiItemAssigns:[], //是否有弹出框length大于0就有
			orderPlan:{},
			itemss:[[{name:'zyz',value:'你大爷'},{name:'zyz',value:'你大爷'},{name:'zyz',value:'你大爷'}]]
		}
	},
	created(){
		const vm = this;
		vm.$store.dispatch('setTitle','报工');
		userinfo.isUniqueOS().then((data)=>{
			vm.stationCode = data[0].stationCode
		})
		const data = {
			serviceCode:'GMES-CLIENT-PCS00021'
		}
		fetch.post('restful/service/execute',data).then((data)=>{
			data.data = data.data.map((items)=>{
				vm.productNumList.push(...items.productNumList)
				items.productNumList = vm.abbreviation(vm.tranlate(items.productNumList,6));
				items.productTrackNumList = vm.abbreviation(vm.tranlate(items.productTrackNumList,5));
				return items
			})
			vm.planData = data.data
			vm.curproductNum = vm.productNumList[0]
		})

		const data2 = {
	    	siteCode:config.apiBaseUrl.siteCode,
	        serviceCode : "GMES-CLIENT-PCS00017",
	        languageCode : "zh",
	        userCode:"",
	        operationCode : "",
	        stationCode : "",
	        productNum : "",
	        productTrackNum:"",
	        minCreateDateTime : timeFormat.one(new Date()),
	        maxCreateDateTime : '',
	        numPerPage:10
	    };

	    fetch.post('restful/service/execute',data2).then((datas)=>{
			let {
				totalCount,
				data
			} = datas.data;
			vm.totalNum = totalCount;
			data = data.map((item)=>{
				item.modifyDateTime = timeFormat.one(item.modifyDateTime)
				return item;
			})
			vm.dailylistData = data;
		})
	},
	mounted: function () {
	  this.$nextTick(function () {
	   	  document.querySelector('.input-serach').focus();
	  })
	},
	computed: mapGetters({
        opreStation:'recordoperStationsL',
        userData:'recorduserData',
    }),
	methods:{
		...mapActions([
	      'text', 
	    ]),
	    abbreviation(arr = []){
			return arr.length > 2 ?  `${arr[0]}...${arr[arr.length-1]}` : arr;
		},
		tranlate(arr = [],lastindex = 0){
			return arr.map((item,i)=>{
				return item.substr(item.length-lastindex)
			})
		},
		getData(){
			const _this = this;
			const datas = {
				serviceCode:'GMES-CLIENT-PCS00015',
				productNum:this.curproductNum,
				stationCode:this.stationCode
			};
			fetch.post('restful/service/execute',datas).then((data)=>{
				_this.configEnums = [];
				const {
					product , 
					configEnums ,
					orderPlan,
					routingAcquiItemAssigns
				} = data.data;
				_this.product[0][0].value = product.productionSeqNum;
				_this.product[0][1].value = product.materialCode;
				_this.product[1][0].value = product.carDescription;
				configEnums.length > 0 ? configEnums.length = 3:'' ;
				configEnums.forEach((item)=>{
					_this.configEnums.push({'name':item.valueText,value:item.valueCode})
				})
				_this.orderPlan = orderPlan;
				_this.routingAcquiItemAssigns = routingAcquiItemAssigns;
				_this.readonly = true;
			})
		},
		submit(){
			var _this = this;
			var datas = {
				serviceCode:'GMES-CLIENT-PCS00016',
				productNum:this.curproductNum,
				stationCode:this.stationCode,
				languageCode:'zh',
				userCode:this.userData.userCode,
			};

			fetch.post('restful/service/execute',datas).then((data)=>{


			})
			/*util.service("GMES-CLIENT-PCS00016",datas,null).done(function(data){
				notie.alert({text: '完成', time: 3,type:1});
				_this.clearDesList()
				_this.productNumList.shift()
				_this.clearValue('#content-header');
				$('#productNum').removeAttr('readonly');
				$('#productNum').val(_this.productNumList[0])
				_this.loadPage();
				_this.initPlanList();
			})*/
		},
		handleCurrentChange(){

		}
	},
	watch:{
		opreStation(curVal,oldVal){
			userinfo.isUniqueOperableStation(curVal)
		}
	},
	components:{
		inputBtn,
		formInput,
		tab,
		tabPane
	}
}
</script>
<style lang="less" scoped>
	#dailywork-content{
		padding:10px;
		height:100%;
		.vin-detail{
			margin:10px 0;
			padding:10px;
		}
	}
	.bg{
		background:#FFF;
	}
	.search-btn{
		background-color: #20a0ff;
	    border-color: #20a0ff;
	    color: #FFF;
	    border-radius: 4px;
	    border: 1px solid #20a0ff;
	    padding: 0px 26px;
	    margin-left:10px;
	    cursor:pointer;
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
	.dailywork-list{
		.product-detail{
			width:450px;
			padding:10px;
			margin-right:10px
		}
		.plan-list{
			flex:1
		}
	}
</style>
