<template>
  <div class="hello">
  	<div class="search-bar">
  		<div class="workcenter">
		  	<el-select v-model="workcentervalue" filterable clearable placeholder="请选择工作中心" @change="getStation" @clear="clearStation">
			    <el-option
			      v-for="item in workcenter"
			      :key="item.workCenterText"
			      :label="item.workCenterText"
			      :value="item.workCenterCode">
			    </el-option>
			  </el-select>
		  </div>
		  <div class="station">
			  <el-select v-model="stationvalue" filterable clearable placeholder="请选择站点">
			    <el-option
			      v-for="item in station"
			      :key="item.stationText"
			      :label="item.stationText"
			      :value="item.stationCode">
			    </el-option>
			  </el-select>
		 	</div>
		 	<div class="productnum">
		  	<el-input v-model="productnum" placeholder="请输入生产编号"></el-input>
		  </div>
		  <div class="timer">
		  	<el-date-picker
		      v-model="timerstart"
		      type="date"
		      placeholder="选择开始日期">
		    </el-date-picker>
		  </div>
		  <div class="timer">
		  	<el-date-picker
		      v-model="timerend"
		      type="date"
		      placeholder="选择结束日期">
		    </el-date-picker>
		  </div>
		  <div class="searchBtn">
	    	<el-button type="primary" @click="searchL(1)">查询</el-button>
	    </div>
	  </div>
    <el-table
      ref="singleTable"
      :data="tableData"
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
  </div>
</template>

<script>
import {fetch} from '@/js/http'
import gettime from '@/js/timeFormat'
export default {
  name: 'interface',
  data () {
    return {
      totalNum : 0,
      tableData: [],
      loading:true,
      productnum:'',
      timerstart:'',
      timerend:'',
      workcentervalue:'',
      stationvalue:'',
      workcenter: [],
      station: [],
    }
  },
  async created(){
      this.$store.dispatch('setTitle','报工列表');
  		this.searchL();
      const center = {
      		serviceCode:'GMES-CLIENT-ANDON002',
      }
      const resp = await fetch.post('restful/service/execute',{body:center});
      this.workcenter = resp.data;
  },
  methods:{
    async handleCurrentChange(val){
    	this.searchL(val)
    },
    async searchL(pageNum){
			const {
    		productnum,
    		timerstart,
	      timerend,
	      workcentervalue,
	      stationvalue,
    	} = this
      this.loading = true;
      const datas = {
				serviceCode:'GMES-CLIENT-PCS00017',
				operationCode:workcentervalue,
				stationCode:stationvalue,
				productNum:productnum,
				productTrackNum:'',
				minCreateDateTime:gettime.one(timerstart),
				maxCreateDateTime:gettime.one(timerend),
				pageNum:pageNum || 1,
				numPerPage:10
			};
      const { data } = await fetch.post('restful/service/execute',{body:datas});
      data.data.forEach((item)=>{
      	item.modifyDateTime = gettime.one(item.modifyDateTime)
      })
      this.tableData = data.data;
      this.totalNum = data.totalCount;
      this.loading = false;
    },
    async getStation(){
    	const datas = {
    		workCenterCode:this.workcentervalue,
				serviceCode:'GMES-CLIENT-ANDON003'
    	};
    	const { data } = await fetch.post('restful/service/execute',{body:datas});
    	this.station = data;
    	
    },
    clearStation(){
    	this.station = []
    },
  }
}
</script>

<style lang="less" scoped>
.header{
  display:flex;
  align-items: center;
  padding:2px 10px;
}
.header h2{
  flex:1;
}
.block{
  margin:10px;
}
.search-bar{
	display:flex;
	padding:10px;
	div{
		margin:0 10px;
	}
}
</style>
