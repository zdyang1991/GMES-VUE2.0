<template>
<div class="message">
  <tab type="tabs" activeName="second" navWidth="76%">
    <tab-pane label="全部" name="first">
      <div @scroll="scrollH" class="message-list" data-id="1">
        <message-card v-for="list in AllLsit" :mes ="list" :chooseType="chooseTypeVal" :key="list.messageID"></message-card>
        <div class="loading-bar" v-show="this.dataAll.finished">
          <!-- <i v-show="!this.dataAll.finished" class="el-icon-loading"></i> -->{{this.dataAll.finished ? '我也是有底线的' : ''}}
        </div>
      </div>
    </tab-pane>
    <tab-pane label="消息" name="second">
      <div @scroll="scrollH" class="message-list" data-id="2">
        <message-card v-for="list in NormalList" :mes ="list" :chooseType="chooseTypeVal" :key="list.messageID"></message-card>
        <div class="loading-bar" v-show="this.dataNormal.finished">
          <!-- <i v-show="!this.dataNormal.finished" class="el-icon-loading"></i> -->{{this.dataNormal.finished ? '我也是有底线的' : ''}}
        </div>
      </div>
    </tab-pane>
    <tab-pane  label="公告" name="third">
      <div @scroll="scrollH" class="message-list" data-id="3">
        <message-card v-for="list in PopupList" :mes ="list" :chooseType="chooseTypeVal" :key="list.messageID"></message-card>
        <div class="loading-bar" v-show="this.dataPopup.finished">
          <!-- <i v-show="!this.dataPopup.finished" class="el-icon-loading"></i> -->{{this.dataPopup.finished ? '我也是有底线的' : ''}}
        </div>
      </div>
    </tab-pane>
  </tab>
  <el-radio-group v-model="radio" class="chooseType" size="large" @change="switchPane">
    <el-radio-button label="全部"></el-radio-button>
    <el-radio-button label="已读"></el-radio-button>
    <el-radio-button label="未读"></el-radio-button>
  </el-radio-group>
 </div>
</template>
<script>
  import tab from '@/components/tab/index.vue';
  import tabPane from '@/components/tab/tabpane.vue';
  import messageCard from './messagecard.vue'

  import userinfo from '@/js/userinfo'
  import { fetch } from '@/js/http'
  import dataFn from './data'
  export default {
    data() {
      return {
        chooseTypeVal: 2,
        radio:'全部',
        activeName: 'second',
        userData:'',
        loading:true,
        listArr:[{prop:'dataAll',list:'AllLsit'},{prop:'dataNormal',list:'NormalList'},{prop:'dataPopup',list:'PopupList'}],
        AllLsit:[

        ],
        NormalList:[

        ],
        PopupList:[

        ],
        dataAll:{
          messageTypeEcodes:'',
          pageNum:1,
          finished:false,
        },
        dataNormal:{
          messageTypeEcodes:'NORMAL',
          pageNum:1,
          finished:false,
        },
        dataPopup:{
          messageTypeEcodes:'POPUP',
          pageNum:1,
          finished:false,
        }
      };
    },
    async created(){
      this.$store.dispatch('setTitle','消息');
      this.userData = await userinfo.getUserProfile();
      const data = { 
        userCode:this.userData.userCode,
      }
      this.listArr.forEach(async (item,i)=>{
        const resp = await dataFn({...data,...this[item.prop]});
        this[item.list] = resp.data.data;
        if(resp.data.data.length < 20) this[_obj.prop].finished = true;
      })
      
    },
    methods: {
      async scrollH(e){
        const dom = e.currentTarget;
        const scroll = dom.scrollHeight - dom.clientHeight;
        const { scrollTop } = dom;
        const _obj = this.listArr[parseInt(dom.dataset.id)-1]
        if(scroll - scrollTop < 50 && this.loading && !this[_obj.prop].finished){
          this.loading = false;
          this[_obj.prop].pageNum =this[_obj.prop].pageNum+1;
          const res = await dataFn({userCode:this.userData.userCode,...this[_obj.prop]});
          if(res.data.data.length < 20) this[_obj.prop].finished = true;
          this[_obj.list].push(...res.data.data)
          this.loading = true;
        }
      },
      switchPane(e){
        this.chooseTypeVal = e === '全部' ? 2 : e === '已读' ? 1 : 0;
      }
    },
    components:{
    	tab,
    	tabPane,
      messageCard
    }
  };
</script>

<style lang="less" scoped>
  .message{
    padding:10px 10px 0 10px;
    height: 100%;
    box-sizing:border-box;
    position:relative;
  }
  .message-list{
    background:#FFF;
    height: 100%;
    overflow:auto;
    .loading-bar{
      height:50px;
      line-height:50px;
      background:#EDEDED;
      text-align:center;
      font-size:14px;
      color:#999999;
    }
  }
  .chooseType{
    position:absolute;
    top: 10px;
    right: 10px;
    width:25%;
    text-align: right;
  }
  
</style>