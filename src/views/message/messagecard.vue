<template>
	<div class="message-des f-df f-fdc" v-show="choose">
	  <div class="title" :class="{ spot : mes.readFlag == 0 }">
	    <div class="type">{{mes.messageTypeEcode}}{{mes.messageCode}}</div>
	    <div class="time">{{mes.receivedTime}}<i class="el-icon-arrow-right"></i></div>
	  </div>
	  <div class="content f-df">
      <div class="des" :class="{totalDes : !isAllDes }">{{mes.messageContent}}</div>
      <div class="more" @click="switchs">{{moreText}}</div>
    </div>
	</div>
</template>

<script>
  import { fetch } from '@/js/http'
	export default {
		data(){
			return {
        isAllDes:false,
			}
		},
    computed:{
      moreText(){
        return this.isAllDes ? '收起' : '展开'
      },
      choose(){
        const { chooseType , mes } = this;
        return chooseType == 2 ? true : chooseType == mes.readFlag ? true : false;
      }
    },
		props:{
			mes:{
				type:Object,
			},
      chooseType:Number,
		},
    methods:{
      switchs(){
        if(this.mes.readFlag == 0){
          this.mes.readFlag = 1;
          const data = {
            serviceCode:'GMES-CLIENT-MSG0005',
            messageId:this.mes.messageID,
          };
          fetch.post('/restful/service/execute',{body:data})
        }
        this.isAllDes = !this.isAllDes;
      }
    }
	}
</script>

<style lang="less" scoped>
	.message-des{
      position:relative;
      background:#FFF;
      color: #8c8c8c;
      padding: 10px 12px 10px 30px;
      .title{
        height:28px;
        align-items: center;
        margin-bottom:4px;
        display:flex;
        .type{
       	flex:1; 	
        font-size:18px;
        color:#222222;
        }
        .time{
          font-size:14px;
          i{
            font-size:12px;
            margin-left:4px;
          }
        }
      }
      .content{
        font-size:14px;
        border-bottom:1px solid #cdcdcd;
        .des{
          margin-bottom: 5px;
          flex:1
        }
        .totalDes{
          display: -webkit-box;
         -webkit-box-orient: vertical;
         -webkit-line-clamp: 1;
          overflow: hidden;
        }
        .more{
          width:40px;
          text-align:right;
          color: #0e69b0;
          cursor: pointer;
        }
      }
    }
    .message-des .spot:before{
      position: absolute;
      top: 18px;
      left: 15px;
      content: "";
      width: 6px;
      height: 6px;
      background: #EF5362;
      border-radius: 3px;
    }
</style>

