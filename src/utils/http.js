import axios from 'axios';
import qs from 'qs';
import store from '../store';
import Vue from 'vue';
import {Message} from 'element-ui';


function errorState(response) {
  // store.commit('UPDATE_LOADING',false)  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    Message({
      message: '服务器异常,请稍候再试',
      type: 'error'
    })
  }
}

function jsonToFormData(json) {
  let data = '';
  const keys = Object.keys(json);
  keys.forEach((key, i) => {
    i === (keys.length - 1) ? data += `${key}=${json[key]}` : data += `${key}=${json[key]}&`
  });
  return data;
};

function successState(res) {
  if (res.data.returnCode != "0") {
    Message({message: res.data.errorMessage, type: "error"});
  }
}

const httpServer = (opts, data) => {
  let cancel ,promiseArr = {}
  axios.interceptors.request.use(config => {
    //发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      promiseArr[config.url]('操作取消')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

  let sitecode
  if (window.localStorage.getItem('terminal')) {
    sitecode = JSON.parse(window.localStorage.getItem('terminal')).siteCode
  } else {
    sitecode = ''
  }
  let Public = { //公共参数
    siteCode: sitecode,
    sessionId: window.localStorage.getItem('sessionId')
  }

  data = Object.assign(Public, data);

  let httpDefaultOpts = { //http默认配置
    method: opts.method,
    url: opts.url,
    timeout: 10000,
    data: JSON.stringify(data),
    params: data,
    headers: opts.method == 'get' ? {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'XMLHttpRequest',
    } : {
      "Accept": "application/json",
      'X-Requested-With': 'XMLHttpRequest',
      "Content-Type": "application/json; charset=UTF-8"
    }
  };
  if (opts.method == 'get') {
    delete httpDefaultOpts.data;
  } else {
    delete httpDefaultOpts.params;
  }
  console.log(httpDefaultOpts);
  let promise = new Promise(function (resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
