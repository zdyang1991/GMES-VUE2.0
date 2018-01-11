<template>
  <div id="app-head">
      <a class="f-df"><img src="../../assets/logo.png"/></a>
      <div class="title" v-if="titles!=''">{{titles}}</div>
      <div class="title" v-if="titles==''">{{titless}}</div>
      <img src="../../assets/evun_logo.png"/>
  </div>
</template>

<script>

export default {
	data() {
		return {
        titless:''
    }
	},
  computed:{
    titles(){
        return this.$store.state.title;
    }
  },
  created(){
	  this.get();
  },
  methods:{
	  get(){
	     this.titless =localStorage.getItem('title')
    }
  }

}
</script>
<style lang="less" scoped>
  #app-head{
    height:50px;
    width:100%;
    background: #2F6298;
    box-shadow: 0px 1px 4px #FF5000;
    display:flex;
    align-items: center;
    color:#FFF;
    img{
      padding:0 20px;
    }
    .title{
      flex:1;
      font-size:1rem;
    }
  }
  .title{
    font-size: 2rem;
  }

</style>
