import axios from 'axios'
// import {Toast, Loading} from '../components/dialog';

const httpOptionDefault = {
  data: '',
  formId: null,
  dataObj: null,
  curPage: 1,
  pageSize: 12,
  noLoading: false, //是否显示加载中的吐司
  timeout: 30000, //网络请求的超时时间，默认30秒
  wait2Loading: 1000, //多少毫秒后弹出加载中吐司,如果网络请求很快少于这个时间则不弹吐司
  LoadPending: 1000, //加载吐司的最小持续展示时间，防止发生一闪而过的现象，默认为1秒
  errorTimeout: 1500, //错误吐司的展示时间，默认为1.5秒
  sucessTimeout: 1500, //处理成功的吐司展示时间， 默认为1.5秒
  getLoadingMsg: '加载中．．．', //查询加载中吐司的文案
  postLoadingMsg: '处理中．．．', //增删改处理中吐司的文案
  upLoadingMsg: '图片上传中．．．', //附件上传中吐司的文案
  clearGlobal: true,
  validateType: true
};



const prepareOption = function(opt) {
  const option = Object.assign({}, httpOptionDefault, opt);
  if (option.formId != null) {
    option.dataObj = formJsonParam(option.formId);
  }

  if (option.dataObj != null) {
    option.data = transformRequest(option.dataObj);
  }
  return option;
};
const saveApproverData = function() {

};
const getTimeOut = function(option) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      option.noLoading = true;
      reject({ code: 0, msg: "服务端请求超时！" });
    }, option.timeout)
  });
};
const getLoading = function(option, req) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      if (!option.noLoading) {
      
        const pending = new Promise(function(resolve, reject) {
          setTimeout(() => {
            resolve();
          }, option.LoadPending)
        });
        Promise.all([req, pending]).then(result => {
          Loading.close();
        });
      }
      resolve(req);
    }, option.wait2Loading);
  });
};

const getRace = function(req, option) {
  return Promise.race([req, getLoading(option, req), getTimeOut(option)]).then(response => {
    if (response.returnMsg != null && response.returnMsg != '' && response.returnMsg != undefined) {
      Toast({ mes: response.returnMsg, timeout: option.sucessTimeout, icon: 'success' });
    }
    return Promise.resolve(response);
  }).catch(error => {
    
    if (error.code == '1001') {
      error.msg = '会话失效，请重新登录';
    }
    Toast({ mes: error.msg, timeout: option.errorTimeout, icon: 'error' });
    return Promise.reject(error);
  })
};


const install = function(Vue) {
  Vue.prototype.$httpUtil = {
    validate: function(formId, option) {
      var form = document.getElementById(formId);
      for (var i = 0; i < form.elements.length; i++) {
        var element = form.elements[i];
        var datatype = element.getAttribute("datatype");
        var labelName = element.getAttribute("labelName");
        var thisValue = element.value;
        var id = element.id;
        if (datatype) {
          if (datatype.indexOf('isNotNull') != -1) {
            if (checkNull(thisValue)) {
              Toast({ mes: labelName + '不能为空', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
          if (datatype.indexOf('number') != -1) { //数字
            if (!isNumber(thisValue)) {
              Toast({ mes: labelName + '请填写数字', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
          if (datatype.indexOf('noChinese') != -1) {
            if (checkChinese(thisValue)) {
              Toast({ mes: labelName + '不能填写汉字', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
          if (datatype.indexOf('noLetter') != -1) {
            if (checkLetter(thisValue)) {
              Toast({ mes: labelName + '不能填写字母', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
          if (datatype.indexOf('limPoint') != -1) {
            if (limPoint(thisValue)) {
              Toast({ mes: labelName + '不能超过十位整数或两位小数', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
          if (datatype.indexOf('isPositive') != -1) {
            if (!isPositive(thisValue)) {
              Toast({ mes: labelName + '请填写正数', timeout: option.errorTimeout, icon: 'error' })
              return false;
            }
          };
        }
      }
      return true;
    },
    delete: function(api, opt) {
      const option = prepareOption(opt);
      option.loadingMsg = option.postLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        axios.delete(url(api), option.data).then((response) => {
          if (!option.noLoading) {
            option.noLoading = true;
            Loading.close();
          }
          return resolve(response);
        }, error => {
          return reject(error);
        })
      })
      return getRace(req, option);
    },
    post: function(api, opt) {
      const option = prepareOption(opt);
      if (option.formId != null) {
        if (option.validateType && !this.validate(option.formId, option)) {
          return Promise.reject();
        }
      }
      option.loadingMsg = option.postLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        axios.post(url(api), option.data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((response) => {
          if (!option.noLoading) {
            option.noLoading = true;
          }
          saveApproverData();
          if (option.clearGlobal) {
            globalClear();
          }
          return resolve(response);
        }, error => {
          return reject(error);
        });
      });
      return getRace(req, option);
    },
    put: function(api, opt) {
      const option = prepareOption(opt);
      if (option.formId != null) {
        if (option.validateType && !this.validate(option.formId, option)) {
          return Promise.reject();
        }
      }

      option.loadingMsg = option.postLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        axios.put(url(api), option.data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((response) => {
          if (!option.noLoading) {
            option.noLoading = true;
            Loading.close();
          }
          saveApproverData();
          globalClear();
          return resolve(response);
        }, error => {
          return reject(error);
        });
      });
      return getRace(req, option);
    },
    get: function(api, opt) {
      const option = prepareOption(opt);
      option.loadingMsg = option.getLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        axios.get(url(api, option.data)).then(response => {
          option.noLoading = true;
          return resolve(response);
        }, error => {
          return reject(error);
        });
      });
      return getRace(req, option);
    },
    getPage: function(api, opt) {
      const option = prepareOption(opt);
      option.loadingMsg = option.getLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        axios.get(urlPage(api, {
          curPage: option.curPage,
          pageSize: option.pageSize
        }, option.data)).then((response) => {
          option.noLoading = true;
          return resolve(response);
        }, error => {
          return reject(error);
        })
      });
      return getRace(req, option);
    },
    uploadFile: function(event, opt) {
      const option = prepareOption(opt);
      if (option.formId == null) {
        return Promise.reject("formId不能为空");
      }
      option.loadingMsg = option.upLoadingMsg;
      const req = new Promise(function(resolve, reject) {
        var form = document.getElementById(option.formId);
        var fd = new FormData(form);
        var files = event.target.files || event.dataTransfer.files;
        if (files.length == 0) {
          option.noLoading = true;
          return false;
        } else {
          option.loadingMsg = option.upLoadingMsg;
        }
        var fileType = ['jpeg', 'jpg', 'png', 'gif'];
        var maxSize = global.imgSize; // 1 = 1mb

        //验证图片格式
        var type = files[0].name.split('.').pop();

        if (fileType.indexOf(type.toLocaleLowerCase()) == -1) {
          //Toast({mes: '暂不支持该类型的文件，请重新选择'});
          return reject('暂不支持该类型的文件，请重新选择');
        }
        //验证图片大小
        if (maxSize && files[0].size > maxSize * 1024 * 1024) {
          //Toast({mes: '请上传小于' + maxSize + 'M的文件'});
          return reject('请上传小于' + maxSize + 'M的文件');
        }
        if (!files.length) return;
        fd.append('file', files[0]);
        axios.post(url('/global/attachment'), fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((data) => {
          option.noLoading = true;
          document.getElementsByClassName('file-logo').value = '';
          return resolve(data);
        }, error => {
          return reject(error);
        });
      });
      return getRace(req, option);
    }
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
