var util = {};
util.jsonToFormData=function (json) {
  let data = '';
  const keys = Object.keys(json);
  keys.forEach((key,i)=>{
    i === (keys.length-1) ? data+=`${key}=${json[key]}` : data+=`${key}=${json[key]}&`
  })
  return data
}


export default util;
