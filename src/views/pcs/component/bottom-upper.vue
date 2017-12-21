<!-- 上线指示组件 -->
<template>
    <div id="bottom-upper">
        <div class="f-df f-f1">
            <el-button class="f-ml10" icon="arrow-left" @click='$emit("left")' :disabled="loadFlag"></el-button>
            <el-button class="f-ml10" icon="arrow-right" @click='$emit("right")' :disabled="loadFlag"></el-button>
            <div class="page">
                <span class="number">{{pageContainer.dln}} / {{pageContainer.nowPage}}  / {{pageContainer.lsn}}</span>
                <span class="info">(历史记录/当前页码/列队页码)</span>
            </div>
        </div>
        <div class="operate f-df f-f1 f-jce">
            <el-button class="confirm" size="large" @click='$emit("confirm")' type="primary" :disabled="compDisabled">上线确认</el-button>
            <el-button class="refresh f-mr10" size="large" @click='$emit("refresh")' v-loading="loadFlag" :disabled="loadFlag">刷新</el-button>
        </div>
    </div>
</template>
<script>
    import { Message } from 'element-ui';
    import util from "@/js/util"
    import { http, fetch } from '@/js/http';
    import { mapGetters, mapActions } from 'vuex';
    // var tool = require("@/js/vendors/kit/kit");
    // var kit = tool.kit;
    export default {
        data() {
            return {

            }
        },
        filters: {

        },
        // 放在计算属性
        computed: {
            compDisabled: function() {
                var haveData = false;
                if(this.upperArray && this.upperArray.length){
                    haveData = this.upperArray.every(function(value, key) {
                        return value.productId;
                   });
                }
                return this.loadFlag || !haveData;
            }
        },
        created () {

        },
        methods: {
            left() {
                this.left
            },
            right() {
                this.pageContainer.nowPage ++;
                this._getData();
            },
            refresh() {
                this.pageContainer.nowPage = 0;
                this.loadFlag =true;
                this._getData();
            },
        },
        props: ['upperArray', 'loadFlag', "pageContainer"],
    }

</script>
<style scoped>
    #bottom-upper {
        height:65px;
        margin-top:10px;
        background: white;
        display: flex;
        align-items: center;
    }
    .page {
        line-height: 40px;
    }

    .number {
        margin-left: 20px;
        font-size: 18px;
        color: #515151;
    }

    .operate {
        height: 55px;
    }
    .confirm {
        width: 140px;
        font-size: 18px;
    }

    .refresh {
        width: 100px;
    }

    .info {
        color: #D2D2D2;
        font-size: 12px;
    }
</style>