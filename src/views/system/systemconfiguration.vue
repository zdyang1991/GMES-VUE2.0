<template>
  <div class="systemConfiguration">
    <el-container>
      <el-header>
        串口设置
      </el-header>
      <el-main>
        <el-form ref="form" :model="form">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="端口" prop="port" :rules=rule.port>
                <el-select prop="port" v-model="form.port" placeholder="请选择端口">
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
              <el-form-item label="波特率" prop="baudRate" :rules=rule.baudRate>
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
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="数据位" prop="dataBit" :rules=rule.dataBit>
                <el-input v-model="form.dataBit" placeholder="请输入数据位">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="校验位" prop="checkBit" :rules=rule.checkBit>
                <el-select v-model="form.checkBit" placeholder="请选择校验位">
                  <el-option label="None" value=""></el-option>
                  <el-option label="1" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="停止位" prop="stopBit" :rules=rule.stopBit>
                <el-select v-model="form.stopBit" placeholder="请选择停止位">
                  <el-option label="1" value="1"></el-option>
                  <el-option label="2" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否生效" prop="enable" :rules=rule.enable>
                <el-select v-model="form.enable" placeholder="是否生效">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script type="text/babel">
  import util from '../../utils/util.js';
  import httpserver from '../../utils/http.js';
  import api from '../../utils/api.js';
  import config from '../../js/config'

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
          terminalCode: JSON.parse(window.localStorage.getItem('terminal')).terminalCode
        },
        rule: {
          port: [
            {required: true, message: '请选择端口号', trigger: 'change'}
          ],
          baudRate: [
            {required: true, message: '请选择波特率', trigger: 'change'}
          ],
          dataBit: [
            {required: true, message: '请输入数据位', trigger: 'blur'}
          ],
//          checkBit:[
//            {required: true, message: '请选择校验位', trigger: 'change'}
//          ],
          stopBit: [
            {required: true, message: '请选择停止位', trigger: 'change'}
          ],
          enable: [
            {required: true, message: '请选择是否生效', trigger: 'change'}
          ]
        }

      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate(async (valid) => {

          httpserver(api.saveSystemCom, this.form).then((res) => {
            console.log(res)
          },(error)=>{
            console.log(error);
          })
//        if(valid) {
//
//        let _this = this
//        this.$http({
//          headers: {
//            'Content-Type': 'application/x-www-form-urlencoded',
//          },
//          method: 'post',
//
//          url: config.apiBaseUrl + 'restful/cm/saveTerminalunit',
//          data: util.jsonToFormData(this.form)
//        })
//          .then((response) => {
//            if (response.data.returnCode == "0") {
//              this.$message({
//                message: '保存成功',
//                type: 'success'
//              })
//              window.localStorage.setItem('serialPort',JSON.stringify(this.form));
//              let loc=JSON.parse(window.localStorage.getItem('terminal'));
//              if (loc.homePage == null || loc.homePage == undefined || loc.homePage == "") {
//                this.$message({
//                  message: '请联系管理员配置首页！',
//                  type: 'warning'
//                })
//                this.$router.push('/home');
//              } else {
//
//                this.$router.push(loc.homePage);
//              }
//            }else {
//              this.$message({
//                message: '保存失败',
//                type: 'error'
//              })
//            }
//          })
//          .catch((error) => {
//          console.log(error.response);
//            this.$message({
//              message: error.response.data.errorMessage,
//              type: 'error'
//            })
//          })
//        }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "../../css/systemConfiguration.less";

  .el-input__inner {
    border: 2px solid #000;
    color: #111;
    font-size: 1.3rem;
  }

  .el-input__inner::-webkit-input-placeholder {
    color: #000;
    font-size: 1.2rem;
    line-height: 50px;
  }

  .el-form-item__label {
    font-size: 1.4rem;
    color: #111;
    font-weight: 700;
  }

</style>
