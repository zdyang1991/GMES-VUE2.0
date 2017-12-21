<template>
	<div class="andonMon">
		<div class="f-df f-jcc f-aic">
			<div class="total-box box" @click="andonsList('')">
					<p class="num">{{triggerCount}}</p>
			    <p class="text">总计</p>
			</div>
		  <el-carousel type="card" height="180px" arrow="always" :autoplay="autoplay" indicator-position="outside" class="f-f1">
		    <el-carousel-item v-for="items in group" :key="items.index" class="f-df f-jcc f-aic">
		    	<div @click.stop="andonsList(item.andonType.andonTypeCode)" v-for="item in items.value" :key="item.andonType.typeText" class="box" :class="item.triggerCount ? 'red':'yellow' ">
			      <p class="num">{{item.triggerCount}}</p>
			      <p class="text">{{item.andonType.typeText}}</p>
			    </div>
		    </el-carousel-item>
		  </el-carousel>
		</div>
		<div class="andonMon-table">
			<el-table
	      ref="singleTable"
	      :data="tableData"
	      v-loading="loading"
	      element-loading-text="加载中"
	      highlight-current-row
	      style="width: 100%">
	      <el-table-column
	        type="index"
	        width="30">
	      </el-table-column>
	      <el-table-column
	        property="workCenterText"
	        label="工作中心">
	      </el-table-column>
	      <el-table-column
	        property="stationText"
	        label="站点">
	      </el-table-column>
	      <el-table-column
	        property="typeText"
	        label="类型">
	      </el-table-column>
	      <el-table-column
	        property="statusECode"
	        label="状态"
	        width="70">
	      </el-table-column>
				
				<el-table-column
	        property="triggerTime"
	        label="累计时长"
	        width="120">
	      </el-table-column>

	      <el-table-column
	        property="switchOnDateTime"
	        label="触发时间"
	        width="120">
	      </el-table-column>
				
				<el-table-column
	        property="switchOnUser"
	        label="触发人"
	        width="100">
	      </el-table-column>

	      <el-table-column
	        property="memo"
	        label="备注">
	      </el-table-column>
	    </el-table>
	    <div class="block">
	      <el-pagination
	        layout="total,prev, pager, next"
	        :total="totalCount"
	        :page-size="pageSize"
	        @current-change="handleCurrentChange">
	      </el-pagination>
	    </div>
		</div>
	</div>
</template>

<script>
	import { fetch } from '@/js/http'
	import { list, change}  from './data'
	import userinfo   from '@/js/userinfo'
	export default {
		name:'',
		data(){
			return {
				pageSize:6,
				group:[],
				loading:false,
				autoplay:false,
				triggerCount:0,
				totalCount:0,
				tableData:[],
				serverDate:'',
			}
		},
		async created(){
			this.$store.dispatch('setTitle','ANDON监控');
			this.serverDate = await userinfo.getServerDataTime()
			const data1 = {
				serviceCode:'GMES-CLIENT-ANDON011'
			}
			const resp = await fetch.post('restful/service/execute',{body:data1});
			const andons = resp.data;
      let andonTypes = [];
      let group =[];
      let triggerCount = 0;
      andons.forEach((item)=>{
      	triggerCount += item.triggerCount;
      	if(item.andonType.andonTypeCode!="LSANDON"){
            //非拉绳andon
            andonTypes.push(item);
        }
      })
      for(var i=0;i<andonTypes.length;){
      	group.push({index:i,value:andonTypes.slice(i,i=i+2)});
      }
      this.group =  group;
      this.triggerCount = triggerCount;
      const tableResp = await list()
      const {
				totalCount,
				data 
			} = tableResp.data;
      this.totalCount = totalCount;
      this.tableData = change(data,this.serverDate)
	  },
	  methods:{
	  	async handleCurrentChange(i){
	      const tableResp = await list({pageNum:i});
	      const { data } = tableResp.data;

	      this.tableData = change(data,this.serverDate);
	  	},
	  	async andonsList(typeCode = ''){
	  		const tableResp = await list({typeCode:typeCode});
	      const { 
  				data ,
  				totalCount
				} = tableResp.data;
	      this.totalCount = totalCount;
	      this.tableData = change(data,this.serverDate);
	  	}
	  }
	}
</script>
<style lang="less" scoped>
  .box{
  	display: flex;
  	height: 140px;
    width: 140px;
    border-radius: 20px;
    margin: 0 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:8px;
    color:#FFF;
    border:3px solid #FFF;
    .num{
    	flex: 2;
	    font-size: 50px;
	    display: flex;
	    align-items: center;
    }
    .text{
    	flex:1;
    	font-size: 25px;
	    display: flex;
	    align-items: center;
    }
    
  }
  .red{
    background:#FF5000;
  }
	.yellow{
		background:#00FF00;
	}
  .total-box{
		background:#CCC;
		margin-bottom: 27px;
  }
 
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>