<!-- 上线指示 - queuingIndication -->
<template>
    <div class="bg" v-if="true" element-loading-text="拼命加载中">
        <div class="body f-df">
            <div v-for="item in upperArray" class="half">
                <template v-if="Object.keys(item).length">
                    <upper 
                        :upper-data=item
                        :upper-config=upperConfig
                        :module-config=moduleConfig>
                    </upper>
                </template>
                <template v-else>
                    <div class="img-container no-info"></div> 
                </template>
            </div>
        </div>
        <div class="bottom">
                <bottom-upper
                    :page-container=pageContainer
                    :upper-array=upperArray
                    :load-flag=loadFlag
                    v-on:left=left
                    v-on:right=right
                    v-on:refresh=refresh
                    v-on:confirm=confirm></bottom-upper>
        </div>
    </div>
</template>
<script>
import upper from './component/upper.vue';
import bottomUpper from './component/bottom-upper.vue';
import { Loading } from 'element-ui';
import util from "@/js/util"
import {http ,fetch} from '@/js/http';
import { mapGetters, mapActions} from 'vuex';
import userinfo from '@/js/userinfo';
import { Message } from 'element-ui';
import jQuery from 'jquery';
var tool = require("@/js/vendors/kit/kit");
var kit = tool.kit;

export default {
	data(){
		return {
            loadFlag: true,
            upperArray: [{}, {}],// 属性介绍见util.processResp方法,
            upperConfig: {
                enums: true,
                remainAmount: false,
                picture: true,
                confirmButton: false,
                historyButton: false,
                remark: false
            },
            pageContainer: {
                nowPage: 0,
                dln: 0,// 列队总页数
		        lsn: 0,// 历史总列数
            }
		}
    },
    components:{
    	bottomUpper,
        upper
    },
	computed: {
        ...mapGetters({
		moduleMenus: 'recordmoduleMenus',
        })
    },
    created(){
        util.getConfig.call(this, {
            moduleGroupCode: "PCS",
            moduleCode: "DOUBLE_ONLINE_INDICATION",
            callback:(config) => {
                this.moduleConfig = config;
                this.loadFlag = true;
                this._getData(this.moduleConfig);
            }
        });
    },
	methods:{
        left() {
            this.pageContainer.nowPage --;
            this._getData();
        },
        right() {
            this.pageContainer.nowPage ++;
            this._getData();
        },
        refresh() {
            this.pageContainer.nowPage = 0;
            this.loadFlag =true;
            this._getData();
        },
        confirm() {
            this.loadFlag = true;
            util.confirm(this.moduleConfig, this.upperArray)
                .then((resp) => {
                    if (util.rightCode(resp)) {
                        Message({type: "success", message: "上件成功！"});
                        this.upperArray = [{}, {}];
                        this.pageContainer.nowPage = 0;
                        this._getData();
                    }
            });
        },
		// 获取数据并且渲染屏幕
        _getData() {   

            if (this.loadFlag === false) {
                this.loadFlag =true;
            }

            const data = {
                siteCode: process.env.siteCode,
                serviceCode: util.compServiceCode(this.pageContainer),
                stationCode: this.moduleConfig.stationCode,
                rowNum: this.moduleConfig.rowNum || 0,
                num: this.moduleConfig.rowNum || 0,
                pageNum: this.pageContainer.nowPage,// 当前页码
                getNum: 2,// 每页数量  pageSize已弃用              
                stNum: 2,// 新增参数 初始位置
            };

            fetch.post('restful/service/execute',{body:data})
                .then((response) => {
                    
                    if (util.existData(response)) {

                        var arr = util.processResp(this.moduleConfig, response);

                        if (arr.length === 0) {
                            Message("当前站点无数据");
                            return;
                        }

                        // 如果需要位置反转，通过配置
                        if (this.moduleConfig.reverse) {
                            arr.reverse();
                        }

                        this.upperArray[0] = arr[0];
                        this.upperArray[1] = arr[1];
                        this.pageContainer.dln = response.data.dln;
                        this.pageContainer.lsn = response.data.lsn;

                       
                    } else {
                        this.upperArray = [{}, {}];
                    }

                    if (this.loadFlag) {
                        this.loadFlag = false;// 改变组件按钮状态
                    }
                });
        },
	}
}
</script>
<style scoped>
    .bg {
        box-sizing: border-box;
        background:#ededed;
        height:100%;
        padding: 10px;
        /* position: relative; */
        display: flex;
        flex-direction:column;
        font-size: 18px;
    }
    .body {
        width: 100%;
        flex: 1;
    }
    .half {
        width: 50%;
        height: 100%;
        background: white;
    }
    .half:nth-child(2) {
        margin-left:10px;
    }

</style>