urlPage = function (url, me, data) {
  if (!url) {
    return false;
  }
  if (global.model == 'dev') {
    if (url.indexOf('?') >= 0) {
      url = global.apiUrl + url + '&isTest=1&loginUserId=' + global.userId + '&loginCorpId=' + global.corpId + '&curPage=' + me.curPage + '&pageSize=' + me.pageSize
    } else {
      url = global.apiUrl + url + '?isTest=1&loginUserId=' + global.userId + '&loginCorpId=' + global.corpId + '&curPage=' + me.curPage + '&pageSize=' + me.pageSize
    }
  } else {
    if (url.indexOf('?') >= 0) {
      url = global.apiUrl + url + '&curPage=' + me.curPage + '&pageSize=' + me.pageSize
    } else {
      url = global.apiUrl + url + '?curPage=' + me.curPage + '&pageSize=' + me.pageSize
    }
  }
  
  if (data != undefined && data != null && data != '') {
    url = url + '&' + data;
  }
  return url;
};
url = function (url, data) {
  if (!url) {
    return false;
  }
  if (global.model == 'dev') {
    if (url.indexOf('?') >= 0) {
      url = global.apiUrl + url + '&isTest=1&loginUserId=' + global.userId + '&loginCorpId=' + global.corpId;
    } else {
      url = global.apiUrl + url + '?isTest=1&loginUserId=' + global.userId + '&loginCorpId=' + global.corpId;
    }
  } else {
    url = global.apiUrl + url;
  }
  
  if (data != undefined && data != null && data != '') {
    if (url.indexOf('?') >= 0) {
      url = url + '&' + data;
    } else {
      url = url + '?' + data;
    }
  }
  return url;
  
};
getParams = function (key) {
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  var context = "";
  if (r != null) {
    context = r[2];
    reg = null;
    r = null;
  } else {
    return context == null || context == "" || context == "undefined" ? "" : context;
  }
  return context
};

formParam = function (form) {
  var form = document.getElementById(form);
  var arr = '';
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    switch (element.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
        break;
      case 'checkbox':
      case 'radio':
        if (!element.checked) {
          break;
        }
      default:
        if (element.name) {
          arr = arr + "&" + element.name + "=" + element.value;
        }
    }
  }
  return arr
};
formJsonParam = function (form) {
  var form = document.getElementById(form);
  var arr = {};
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    switch (element.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
        break;
      case 'checkbox':
      case 'radio':
        if (!element.checked) {
          break;
        }
      default:
        if (element.name == '') {
          delete arr[element.name]
        } else if (arr[element.name]) {
          arr[element.name] = arr[element.name] + ',' + element.value;
        } else {
          arr[element.name] = element.value;
        }
      
    }
  }
  return arr
};
dateFormat = function (date, dateType) {
  if (dateType == 'yyyy-mm-dd') {
    date = date.substring(0, 10);
  } else if (dateType == 'yyyy-mm-dd hh-mm-ss') {
    if (date.length == 10) {
      date = date + " 00-00-00";
    } else {
      date = date;
    }
  }
  return date
};
getCurrentDateString = function () {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
  return currentdate;
};
getCurrentMonth = function () {
  var date = new Date();
  var seperator1 = "-";
  var month = date.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  var currentMonth = date.getFullYear() + seperator1 + month;
  return currentMonth;
};
globalClear = function () {
  global.attachmentsList=[];
  global.customerInfo = {customerName: '', customerId: ''};
  global.projectInfo = {projectName: '', projectId: ''};
  global.productList = [];
  global.cashier = {};
  global.imagesList=[];
  global.cashierType = false;
  global.cashierAdd = true;
  global.dealAccountInfo = {accountName:'',accountNo:'', dealDesc:''};
  global.categoryInfo={categoryName:'',categoryId:''};
  global.accountInfo={accountName:'',accountId:''};
  global.payee={payeeName:'',payeeId:''};
};
setApproverData = function (me) {
  if(global.cashier.realName==null||global.cashier.realName=='') {
    if (global.localStorageData.getItem('approverData') != null) {
      var datas = JSON.parse(global.localStorageData.getItem('approverData'));
      if (datas.cashier.realName != null && datas.cashier.realName != '') {
        me.cashier = global.cashier = datas.cashier;
        me.cashierType = global.cashierType = datas.cashierType;
        me.cashierAdd = global.cashierAdd = datas.cashierAdd;
      }
    }
  }
};
setremark=function(me){
  me.style.height=me.scrollHeight+'px';
},
  pickDate = function (callback, initDate) {
    dd.biz.util.datepicker({
      format: 'yyyy-MM-dd',
      value: initDate == undefined ? getCurrentDateString() : initDate, //默认显示日期
      onSuccess: callback,
      onFail: function (err) {
      }
    })
  };
clearNoNum = function(obj){
  obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.
  obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
  obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
  obj.value=obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
};

//校验是否为数字
isNumber =function(str){
  if (str==''){return true;}
  if (/^(\+|-)?\d+($|\.\d+$)/.test(str)){
    return true;
  }else{
    return false;
  }
};
//校验是否包含汉字
checkChinese =function(val){
  if((/[\u4e00-\u9fa5]/g).test(val)){
    return true;
  }else{
    return false;
  }
};
//校验是否包含字母
checkLetter =function(val){
  if((/[a-zA-Z]/g).test(val)){
    return true;
  }else{
    return false;
  }
};
//检测金额不能为空
checkNull = function(val){
  if(val == ''){
    return true;
  }else{
    return false;
  }
};
//小数位数限制
limPoint = function(val){
  if(/^(-)?[0-9]{1,10}([.][0-9]{1,2})?$/.test(val)){
    return false;
  }else{
    return true;
  }
};

isPositive =function (val) {
  if(isNumber(val)){
    if(val>0){
      return true;
    }else{
      return false;
    }
  }
}
