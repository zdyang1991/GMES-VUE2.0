<template>
  <div class="systemConfiguration">
    <el-container>
      <el-header>
        出口设置
      </el-header>
      <el-main>
        <div class="main-content">
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <span>端口：</span>
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <span>波特率：</span>
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="grid-content bg-purple">
                <span>数据位：</span>
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple-light">
                <span>是否启用：</span>
                <template>
                  <el-select v-model="value" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <el-button type="primary">确定</el-button>
                <el-button type="success">返回</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
//        saleSave(status){
//          this.$httpUtil.post('/biz/contract?status='+status,{formId:'contractSaleAdd',validateType:validateType}).then((response)=>{
//            this.$router.replace({name:'全部合同订单',params:{contractType:'01'}});
//          });
//        },
    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/systemConfiguration.less";

</style>
