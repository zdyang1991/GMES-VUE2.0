<template>
    <div class="message">
      <el-tabs type="border-card">
        <el-tab-pane label="消息订阅">
          <el-collapse v-model="activeNames" @change="handleChange" v-if="this.chooseTypeVal==2">
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in messageData" :key="index" >
              <div>{{item.message}}</div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" @change="handleChange" v-if="this.chooseTypeVal==1">
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in messlist1(messageData)" :key="index" >
              <div>{{item.message}}</div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse v-model="activeNames" @change="handleChange" v-if="this.chooseTypeVal==0">
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in messlist0(messageData)" :key="index" >
              <div>{{item.message}}</div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="消息推送">
        </el-tab-pane>
        <el-tab-pane label="角色管理">
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">
        </el-tab-pane>
      </el-tabs>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="switchPane">
        <el-radio-button label="全部">全部</el-radio-button>
        <el-radio-button label="已读">已读</el-radio-button>
        <el-radio-button label="未读">未读</el-radio-button>
      </el-radio-group>
    </div>
</template>
<script type="text/babel">
export default{
  name:"message",
  data(){
    return{
      tabPosition: 'top',
      activeNames: ['1'],
      chooseTypeVal: 2,
      messageData:[
      {
        title:'11',
        message:'1111111',
        status:0
      },
      {
        title:'11',
        message:'1111111',
        status:0
      },
      {
        title:'11',
        message:'1111111',
        status:0
      },
      {
        title:'11',
        message:'1111111',
        status:0
      },
      ],
      isHasRead:false
    }
  },
  methods:{
    handleChange(val) {
      let order=val[val.length-1]
      this.messageData[order].status=1
    },
    haveRead(){
      this.isHasRead=true;
    },
    switchPane(e){
      this.chooseTypeVal = e === '全部' ? 2 : e === '已读' ? 1 : 0;
    },
    messlist2:function(list){
      return this.messageData.filter(function(item){
        return item.status==2
      })
    },
    messlist1:function(list){
      return this.messageData.filter(function(item){
        return item.status==1
      })
    },
    messlist0:function(list){
      return this.messageData.filter(function(item){
        return item.status==0
      })
    },
  }
}
</script>
<style lang="less" >
  .message{
    height: 100%;
    .el-tabs--border-card{
      height: 95%;
      .el-tabs__item{
        height: 5rem;
        line-height: 5rem;
        font-size: 1.5rem;
      }
      .el-tabs__content{
        font-size: 1.5rem;
        height: 31rem;
        overflow: scroll;
      }
    }
  .el-radio-group{
    position: absolute;
    top: 4.5rem;
    right: 5rem;
    .el-collapse-item__header{
      font-size: 1.2rem;
      }

  }
  .el-collapse-item__content{
    font-size: 1.2rem;
    }
  }
</style>
