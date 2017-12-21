<!-- 上线指示组件 -->
<template>
  <div id="currentorder" class="right-container">

    <!-- 第一行 -->
    <div class="row f-df">
      <div class="row-container f-df">
        <div :class='[upperConfig.remainAmount ? "f-w60p" : "f-w100p"]' class="item-container">
          <label class="label">当前规格</label>
          <div class="detail" title="LJI3KID349534589">{{upperData.carDescription}}</div>
        </div>

        <div v-if="upperConfig.remainAmount" class="item-container remain-amount-box blink f-w40p">
          <div class="remain-amount-container">
            <span class="remain-amount-label">剩余数量:</span>
            <span class="remain-amount">{{upperData.remainingQuantity}}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 第二行 -->
    <div v-if="upperConfig.enums" class="row f-df">
      <div class="row-container f-df">
        <!-- upperData.configEnums -->
        <div class="item-container f-w50p">
          <label class="label">{{upperData.configEnums | configEnumsFilt(0, "configText") || "特性"}}</label>
          <div class="detail"> {{upperData.configEnums | configEnumsFilt(0, "valueText")}}</div>
        </div>
        <div class="item-container f-w50p">
          <label class="label">{{upperData.configEnums | configEnumsFilt(1, "configText") || "特性"}}</label>
          <div class="detail"> {{upperData.configEnums | configEnumsFilt(1, "valueText")}}</div>
        </div>
      </div>
    </div>

    <!-- 第三行 -->
    <div class="row f-df">
      <div class="row-container f-df">
        <div class="item-container f-f1">
          <label class="label">产品标识号</label>
          <div class="detail">{{upperData.productNumFormat}}</div>
        </div>
        <div class="item-container f-f1">
          <label class="label">生产管理号</label>
          <div class="detail">{{upperData.productIdFormat}}</div>
        </div>
        <div v-if="upperConfig.confirmButton" class="item-container f-f1">
          <el-button type="primary" class="confirmOnline" :loading="loadFlag" @click='$emit("confirmEvent")' :disabled="loadFlag || !(upperData.productId && upperData.productNum)">上线确认</el-button>
        </div>
        <div v-if="upperConfig.historyButton" class="item-container f-f1">
          <el-button type="primary" class="confirmOnline" @click='$emit("getTable", true)'>历史记录</el-button>
        </div>
        <div v-if="upperConfig.jumpButton" class="item-container f-f1">
          <el-button type="primary" class="confirmOnline" :loading="loadFlag" @click='$emit("jumpEvent")' :disabled="loadFlag">跳过异常</el-button>
        </div>

      </div>
    </div>

    <!-- 第四行 -->
    <div v-if="upperConfig.remark" class="row f-df">
      <div class="row-container f-df">
        <div class="item-container f-f1">
          <label class="label">备注</label>
          <div class="remark">{{upperData.remark}}</div>
        </div>
      </div>
    </div>
    <div v-else class="pictureRow f-df">
      <div class="pictureRow-container f-df">
        <div class="item-container f-f1">
          <div v-if="upperData.picture" class="img-container" :style="{backgroundImage: 'url(' + upperData.picture + ')'}"></div>
          <div v-else class="img-container no-info"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Message } from 'element-ui';
  import util from "@/js/util"
  import { http, fetch } from '@/js/http';
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name:"AssemblyOrder",
    data() {
      return {

      }
    },
    filters: {
      configEnumsFilt(configEnums, item, type) {
        var configText = "";

        // 防止特性为undefined
        if (configEnums && configEnums.length) {
          var enums = configEnums[item];

          // 防止特性个数不够
          if (enums) {
            configText = enums[type];  // configText  valueText
          }
        }
        return configText;
      },

    },
    // 放在计算属性
    computed: {

    },
    created () {
      // 防止报错
      if (!this.upperConfig) {
        this.upperConfig = {};
      }
    },
    methods: {

    },
    props: ['upperData', 'loadFlag', "upperConfig"],
  }

</script>
<style scoped>
  .unequal {
    height: 20%;
    padding: 20px;
    box-sizing: border-box;
  }

  .row {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }

  .pictureRow {
    flex: 2;
    padding: 20px;
    box-sizing: border-box;
  }

  .upperTable {
    min-width: 1020px;
  }

  .right-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }


  .row-container {
    height: 65px;
    width: 100%;
  }

  .pictureRow-container {
    height: 100%;
    width: 100%;
  }
  /* 从第二个子元素开始生效 */

  .item-container:nth-child(n+2) {
    margin-left: 20px;
  }

  .label {
    color: #595959;
    font-size: 18px;
    line-height: 25px;
  }

  .detail {
    color: #222222;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #CDCDCD;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 36px;
  }

  .remain-amount-box {
    margin-left: 20px;
  }

  .remain-amount-container {
    border: 1px dashed #EB6F83;
    height: 98%;
    display: flex;
    /* line-height: 63px;  */
  }

  .remain-amount {
    color: #E43246;
    font-size: 48px;
    font-weight: bold;
    align-items: center;
    display: flex;
    max-width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
  }

  .remain-amount-label {
    color: #222222;
    display: flex;
    padding-left: 20px;
    font-weight: bold;
    align-items: center;
  }

  .confirmOnline {
    height: 100%;
    width: 100%;
    /* background: #00AFEB; */
    /* border-radius: 0px; */
    font-size: 20px;
  }

  .remark {
    min-height: 36px;
    line-height: 36px;
    /* line-height: 21px; */
    color: #222222;
    font-weight: bolder;
    font-size: 18px;
    border-bottom: 1px solid #CDCDCD;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .bottom thead {
    height: 50px;
    background: #F9F9F9;
  }

  .bottom tbody {
    background: #FFFFFF;
  }

  .bottom {
    height: 161px;
    margin-top: 10px;
    background: white;
  }

  .blink {
    -webkit-animation: blink 1.5s 0s infinite;
    animation: blink 1.5s 0s infinite;
  }

  @keyframes blink {
    0% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
    50% {
      box-shadow: 0 0 40px #EB6F83 inset;
    }
    100% {
      box-shadow: 0 0 10px #EB6F83 inset;
    }
  }

  .bottom table {
    width: 100%;
    color: #222222;
  }

  .bottom table,
  .bottom table tr,
  .bottom table td {
    border: 1px solid #F1F1F1;
  }

  .bottom tr {
    height: 50px;
  }

  .bottom td {
    padding-left: 10px;
  }
</style>
