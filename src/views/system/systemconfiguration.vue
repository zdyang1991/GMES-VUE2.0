<template>
    <div class="systemConfiguration">

      <el-container>
        <el-header>
          <label class="label">串口配置</label>
        </el-header>
        <el-main>
          <el-form>
            <el-row>
              <el-col :span="12">
            <el-form-item label="端口">
              <el-select  placeholder="端口">
                <el-option label="COM1" value="COM1"></el-option>
                <el-option label="COM2" value="COM2"></el-option>
                <el-option label="COM3" value="COM3"></el-option>
                <el-option label="COM4" value="COM4"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="波特率">
              <el-select  placeholder="波特率">
                <el-option label="115200" value="115200"></el-option>
              </el-select>
            </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="数据位">
                  <el-select  placeholder="数据位">
                    <el-option label="8" value="8"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="校验位">
                  <el-select  placeholder="校验位">
                    <el-option label="N" value="N"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="停止位">
                  <el-select  placeholder="停止位">
                    <el-option label="停止位" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否生效">
                  <el-select  placeholder="是否生效">
                    <el-option label="是否生效" value="是"></el-option>
                    <el-option label="是否生效" value="否"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item>
              <el-button type="primary">确认</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>

    </div>
</template>

<script type="text/babel">

</script>
<style lang="less" scoped>
  @import "../../css/systemConfiguration.less";

    /* @import ""; */
</style>
