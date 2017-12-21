/*
 * @name: \src\js\utils\util.js
 * @author: EVUN前端组
 * @modify: kelichao
 * @update: 2017-06-13
 * @decript: 项目全局公用方法库，构造函数法重构
 * @url: http://git.evun.cn/GMES/GMES_CLIENT_PAD
 */

import jQuery from 'jquery';
import config from '@/js/config';
import {http ,fetch} from '@/js/http';
import { Message } from 'element-ui';
var tool = require("./vendors/kit/kit");
var kit = tool.kit;

// 工具集构造函数
var util = {};

/**
 * 获取用户模块配置，上件指示，装配指示等功能
 * @param {string} moduleGroupCode 主名称(PCS)
 * @param {string} moduleCode  子名称(ONLINE_INDICATION)
 */
util.getConfig = function(data){
	var param = {
		"moduleGroupCode": data.moduleGroupCode,
		"moduleCode": data.moduleCode
	};
	
	return fetch.post("/restful/module/getSysModuleConfig",{body: param})
		.then((response) => {
            
            try {

                // 先解析
                var moduleConfig = JSON.parse(response.data);

                // data不为空
                if (!kit.isEmpty(moduleConfig)) {
                    // 设标题
                    this.$store.dispatch('setTitle',moduleConfig.title);
                    // 触发回调
                    if (data.callback) {
                        data.callback(moduleConfig);
                    }
                    
                } else {
                    // 触发空回调
                    if (data.emptyCallback) {
                        data.emptyCallback();
                    }
                    Message({message: '当前模块未配置站点信息，请检查moduleConfig', type: "error"});
                }


            } catch (e) {
                Message({message: '当前模块未配置解析出错，或者回调函数出错', type: "error"});
                console.error(e);
            }
        });
};

// 回调触发0且对象不为空
util.existData = function(response){

    // 目前接口不统一，老接口为returnCode:0，新接口为code:success
    if((response.returnCode == "0" ||response.code == "success")){
        if(kit.isEmpty(response.data) === false){
            return true;
        } else {
            Message("暂无数据");
        }
    }
};

// 用于某些返回状态
util.rightCode = function(response) {
    if((response.returnCode == "0" ||response.code == "success")){
        return true;
    }
}

util.post = function(param) {
    return fetch.post('restful/service/execute', param);
}

// 处理成功消息
util.processDone = function (response) {
    var message = "异常 ";
    // 目前有两种情况，returnCode与code
    var code = response.returnCode || response.code;

    try {
        if (code !== "0" && code !== "success") {
            message += response.returnCode || response.code + " " + 
                       response.errorMessage || response.message;
            notie.alert({ text: message, time: 5 });
        }

    } catch (e) {
        message += response.responseText;
        notie.alert({ text: message, time: 5 });
    } finally{
        return message;
    }
};

// 处理失败消息
util.processFailMsg = function (response) {
    var message = "错误 ";
    try {
        if (response.status === 401){
            message += "token过期，请尝试重新刷新";
        } else {
            kit.forEach(response.responseJSON, function(value) {
                message += value;
            });
        }


    } catch (e) {
        message += response.responseText;
    } finally {
        return message;
    }
};

util.filter = function(value) {
    var reg = /[^\w\.\/]/ig; //只能输入英文字母和数字,不能输入中文
    if(reg.test(value)) {
        value = value.replace(reg, '');
    }

    return value;
};

// 处理站点的图片配置信息
function processImg (config, data) {

    var code = config.pictureConfigCode;
    var url;
    kit.forEach(data.configEnums, function (value) {
        if (value.configCode == code) {
            url = value.fileAccessPath; // fileName  |   fileAccessPath
            return;
        }
    });
    return url;
}

// 处理特性
function processEnums(config, data) {
    // 目前只展示两个且要参照configCodes
    var configArr = [];
    var configCodes = config.configCodes;
    data.configEnums = data.configEnums || [];

    kit.forEach(data.configEnums, function (value) {
        if (value.configCode === configCodes[0]) {
            configArr.push(value);
        }
    });

    configArr.length = 2;

    return configArr;
}

// 处理生产模块的数据信息
util.processData = function (config, data) {

    // 生产管理号。历史数据productionSeqNum
    var productId;

    // 无数据的数据初始化
    if (kit.isEmpty(data) === true) {
        return {
            // 特性列表最多两个特性
            configEnums: [{
                configCode: "",// 配置编号 
                configText: "",// 配置描述
                valueText: "",//配置详情描述
                fileName: ""// 图片文件名
            }],
            productNum: "",// 产品标识号
            productId: "",// 生产管理号。历史数据productionSeqNum
            productNumFormat: "",// 产品标识号
            productIdFormat: "",// 生产管理号。历史数据productionSeqNum
            carDescription: "",// 产品规格
            remarkremark: "",// 备注
            thresholdValue: config.thresholdValue || 5,// 报警数量
            picture: ""// 展示图片
        };
    }

    // 键值消歧
    productId = "productionSeqNum";
    data.productId = data.productId || data[productId];

    // 生成简短型产品标识号，生产管理号。
    data.productIdFormat = data.productId ? data.productId.slice(-5) : "";
    data.productNumFormat = data.productNum ? data.productNum.slice(-6) : "";

    // 处理图片链接
    data.picture = processImg(config, data);

    // 处理特性列表，目前只展示两个且要参照configCodes
    data.configEnums = processEnums(config, data);

    return data;
}

util.processResp = function(config, response) {
    // 历史记录与当前列队，入口字段不同,但数据一致
    var arr = response.data.productionQueues || response.data.subassemblyOnlineDTOs;

    kit.forEach(arr, (value, index) => {
        arr[index] = this.processData(config, arr[index]);
    });
    return arr;
};


// 回车事件
util.enterEvent = function(callback) {

    $(document).on("keydown", function(event) {

        if(event.keyCode === 13 && callback) {// 回车键
           callback();
        }
    });
};

util.fliterInput = function(context) {
    var _this = this;
    $(context).on("input", function(event) {
        event.target.value = _this.filter(event.target.value);
    });
};

util.confirm = function(moduleConfig, array) {
    var productId = "productionSeqNum";
    var arr = [];
    var params = {
        // productTrackNum: "",// 产品跟踪号  目前不用
        siteCode: config.apiBaseUrl.siteCode,// 站点信息
        stationCode: moduleConfig.stationCode,
        // productionSeqNum: "",// 生产管理号 作用同 productId
        // productNum: "",// 产品标识号
    };

    jQuery.each(array, (index) => {
        var complete = jQuery.extend({}, params);

        // 把缓存的确认要传的数据添加上productNum, productionSeqNum
        complete.productNum = array[index].productNum;
        complete[productId] = array[index].productId;

        arr.push(complete);
    });

    // 上线确认按钮
    const data = {
        serviceCode: "GMES-CLIENT-PCS0013",
        subassemblyOnlinesJson: JSON.stringify(arr)
    };
    
    return fetch.post('restful/service/execute', {body: data});
};

util.compServiceCode = function(pageContainer) {
    var serviceCode;
    // 切换链接，历史与列队不一样
    if (pageContainer.nowPage >= 0) {
        serviceCode = "GMES-CLIENT-PCS0011";
    } else {
        serviceCode = "GMES-CLIENT-PCS0012";
    }
    return serviceCode;
}

export default util;
