<template>
    <div class="message">
      <el-tabs type="border-card">
        <el-tab-pane label="消息订阅">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item :title="item.title" :name="index" v-for="(item,index) in messageData" :status="this.status" @click="haveRead()">
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
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="top" @click="selectAll()">全部</el-radio-button>
        <el-radio-button label="right" @click="selectAlready()">已读</el-radio-button>
        <el-radio-button label="bottom" @click="selectNerver()">未读</el-radio-button>
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
      messageData:[
      {
        title:'11',
        message:'1111111'
      },
      {
        title:'11',
        message:'1111111'
      },
      {
        title:'11',
        message:'1111111'
      },
      {
        title:'11',
        message:'1111111'
      },
      ],
      isHasRead:false
    }
  },
  methods:{
    handleChange(val) {
    },
    haveRead(){
      this.isHasRead=true;
    }
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
