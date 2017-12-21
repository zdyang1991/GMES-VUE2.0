<template>
    <div class="progress">
      <div class="container">
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 4" description="这是一段很长很长很长的描述性文字"></el-step>
          <el-step title="步骤 5" description="这是一段很长很长很长的描述性文字"></el-step>
        </el-steps>
      </div>
    </div>
</template>

<script type="text/babel">
  export default {
    name:'pro-gress',
    created(){
      this.init();
    },
    methods:{
      init: function () {
        this.bsStep(2)
      },
      bsStep:function(i) {

      }
    }
  }
</script>
<style lang="less" scoped>
  .progress{
    height: 25rem;
    .container{
      height: 22rem;
    }
  }

</style>
