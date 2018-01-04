import axios from 'axios';
import qs from 'qs';
import store from '../store'
import Vue from 'vue';
import {Message} from 'element-ui'


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
  console.log(data)
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
  data = Object.assign(Public, data)
  let httpDefaultOpts = { //http默认配置
    method: opts.method,
    // baseURL,
    url: opts.url,
    timeout: 10000,
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  console.log(httpDefaultOpts);
  // if (opts.method == 'get') {
  //   delete httpDefaultOpts.data
  // } else {
  //   delete httpDefaultOpts.params
  // }
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
