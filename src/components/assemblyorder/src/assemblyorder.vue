<!-- 上线指示组件 -->
<template>
  <div id="currentorder" class="right-container">

    <!-- 第一行 -->
    <div class="row f-df">
      <div class="row-container f-df">
        <div class="item-container">
          <label class="label">工单编号</label>
          <div class="detail" title="LJI3KID349534589">NO_000000000003</div>
        </div>
        <div class="item-container">
          <label class="label">机型</label>
          <div class="detail" title="LJI3KID349534589">HGJ-1</div>
        </div>
      </div>
    </div>
    <!-- 第二行 -->
    <div class="row f-df">
      <div class="row-container f-df">
        <div class="item-container">
          <label class="label">序列号</label>
          <div class="detail" title="LJI3KID349534589">1616161616166161616</div>
        </div>
        <div class="item-container">
          <label class="label">物料描述</label>
          <div class="detail" title="LJI3KID349534589">发动机00001</div>
        </div>
      </div>
    </div>

    <!-- 第三行 -->
    <div class="row f-df">
      <div class="row-container f-df">
        <div class="item-container">
          <label class="label">计划数量</label>
          <div class="detail" title="LJI3KID349534589">1</div>
        </div>
        <div class="item-container">
          <label class="label">顺序号</label>
          <div class="detail" title="LJI3KID349534589">20171205001</div>
        </div>
      </div>
    </div>

    <!-- 第四行 -->
  </div>
</template>
<script>

  export default {
    name: "AssemblyOrder",
    data() {
      return {}
    },
    filters: {},
    // 放在计算属性
    computed: {},
    created() {
      // 防止报错

    },
    methods: {},
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

  .item-container {
    width: 50%;
    margin-left: 15px;
  }

  .label {
    color: #595959;
    font-size: 25px;
    line-height: 25px;
  }

  .detail {
    color: #222222;
    font-weight: bolder;
    font-size: 27px;
    border-bottom: 1px solid #CDCDCD;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 40px;
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
