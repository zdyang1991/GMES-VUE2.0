<template>
  <div class="systemConfiguration">
    <el-container>
      <el-header>
        串口设置
      </el-header>
      <el-main>
        <el-form ref="form" :model="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="端口">
                <el-select v-model="form.port" placeholder="请选择端口">
                  <el-option label="COM1" value="COM1"></el-option>
                  <el-option label="COM2" value="COM2"></el-option>
                  <el-option label="COM3" value="COM3"></el-option>
                  <el-option label="COM4" value="COM4"></el-option>
                  <el-option label="COM5" value="COM5"></el-option>
                  <el-option label="COM6" value="COM6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="波特率">
                <el-select v-model="form.baudRate" placeholder="请选择波特率">
                  <el-option label="300" value="300"></el-option>
                  <el-option label="600" value="600"></el-option>
                  <el-option label="1200" value="1200"></el-option>
                  <el-option label="2400" value="2400"></el-option>
                  <el-option label="4800" value="4800"></el-option>
                  <el-option label="9600" value="9600"></el-option>
                  <el-option label="19200" value="19200"></el-option>
                  <el-option label="38400" value="38400"></el-option>
                  <el-option label="43000" value="43000"></el-option>
                  <el-option label="56000" value="56000"></el-option>
                  <el-option label="57600" value="57600"></el-option>
                  <el-option label="115200" value="115200"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="数据位">
                <el-input v-model="form.dataBit" placeholder="请输入数据位"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="校验位">
                <el-select v-model="form.checkBit" placeholder="请选择校验位">
                  <el-option label="None" value="None"></el-option>
                  <el-option label="None" value="None"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="停止位">
                <el-select v-model="form.stopBit" placeholder="请选择停止位">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否生效">
                <el-select v-model="form.enable" placeholder="是否生效">
                  <el-option label="是" value="是"></el-option>
                  <el-option label="否" value="否"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/babel">
  export default {
    data() {
      return {
        form: {
          port: '',
          baudRate: '',
          dataBit: '',
          checkBit: '',
          stopBit: '',
          enable: '',
          terminalCode:'222'
        }

      }
    },
    methods: {
      onSubmit() {

        var formdata = JSON.stringify(this.form);

        this.$httpUtil.post('restful/cm/saveTerminalunit ', formdata).then((response) => {
          // success callback

        }, (response) => {

        });
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../css/systemConfiguration.less";

</style>
