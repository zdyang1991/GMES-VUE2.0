<template>
    <div>
        <div class="user-info" v-for="item in info">
          <span>工作车间：{{item.department}}</span>
          <span>站点：{{item.site}}</span>
          <span>用户：{{item.user}}</span>
          <span>日期：{{item.date}}</span>
          <span>通讯状态：{{item.stute}}</span>
        </div>
    </div>
</template>

<script type="text/babel">

    export default {
      name: 'user-info',
        data() {
            return {}
        },
      props:['info'],
        computed: {},
        created() {
            // this.init();
        },
        beforeRouteLeave(to, from, next) {
            // const toPath = to.path;
            // if((toPath.indexOf('choose')<= 0 )){
            // }
            // next();
        },
        beforeRouteEnter(to, from, next) {
            // const fromPath = from.path;
            // if(fromPath=='/contract/choose_type'){

            // }
            // next(vm=>{
            //     vm.fromPath = from.path;
            // });
        },
        methods: {
            init() {

            },

        }

    }
</script>
<style lang="less" scoped>
   .user-info{
     width: 100%;
     background-color: #EDEDED;
     height: 3rem;
     line-height: 3rem;
     font-size: 1.5rem;
     text-align: center;
     display: flex;
       span{
         flex: 1;
       }


   }
</style>
