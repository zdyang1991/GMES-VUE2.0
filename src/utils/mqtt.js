import Paho from "../js/vendors/mqtt/mqttws31";
// import requestApi from "./config";
// import userInfo  from "./userinfo";
import $ from 'jquery';
var mqttCtrl = function () {
  /**
   * 客户端编号，采用平台编码+工厂+用户编码形式
   **/
  var clientId = null;
  var wsbroker = "10.86.130.25";
  var wsport = 15675;

  var defaultOptions = {
    userName:"gmesdev",
    password:"gmesdev",
    keepAliveInterval : 10
  };

  var defaultSubscribeOptions = {
    qos : 1
  };

  var defaultUnsubscribeOptions = {};

  var client = null;

  var messageHandlers = {},topicGroups = {}

  //var connectDeferred = $.Deferred();
  //初始化状态 0：连接中 2：已连接
  var initStatus = 0;
  return {
    /**
     * 连接Websocket
     **/
    connect : function(options){
      console.log(options);
      const _this = this;
      return new Promise(async (resolve,reject)=>{
        if(initStatus == 0 || !client || !client.isConnected){
          clientId =  "GMES-1001"+"-"+ (new Date().getTime());
          //建立客户端实例
          client = new Paho.MQTT.Client(wsbroker, wsport, "/ws", clientId);
          //注册连接断开处理事件
          client.onConnectionLost = function (responseObject) {
            console.log("Websocket disconnect : "+responseObject.errorMessage);
            console.log("连接丢失，重新连接")
            client = null;
            _this.connect(options);
          };
          //注册消息接收处理事件
          client.onMessageArrived = function (message) {
            var matched = undefined;
            $.each(messageHandlers,function(regDestinationName,handlers){
              matched = message.destinationName.match(regDestinationName);
              if(matched && matched.length > 0){
                //正则匹配
                $.each(handlers,function(name,messageHandler){
                  try{
                    messageHandler(message);
                  }catch(error){
                    console.error(error);
                  }
                })
              }
            })

          };
          options = {...defaultOptions,...options};
          //连接成功
          options["onSuccess"] = function(){
            console.log(clientId + ": CONNECTED");
            resolve();
            initStatus = 2;
          };
          //连接失败
          options["onFailure"] = function(message){
            console.log(clientId + ": CONNECTION FAILURE - " + message.errorMessage);
            reject();
            initStatus = 0;
          }
          //连接服务器并注册连接成功处理事件
          client.connect(options);
        }else{
          resolve();
        }
      })
    },
    /**
     * 是否已经订阅
     **/
    existSubscribe : function(topic,topicGroup){
      topicGroup = topicGroup || "default";
      if(!topicGroups[topicGroup]){
        return false;
      }

      for(var i = 0 ; i < topicGroups[topicGroup].length ; i++){
        if(topicGroups[topicGroup][i] === topic){
          return true;
        }
      }
    },
    /**
     * 订阅主题
     **/
    subscribe : function(topic,topicGroup,subscribeOptions = {}){
      subscribeOptions = {...defaultSubscribeOptions,...subscribeOptions};
      topicGroup = topicGroup || "default";
      if(this.existSubscribe(topic,topicGroup)){
        return;
      }


      this.connect().then(function(){
        client.subscribe(topic, subscribeOptions);
        if(!topicGroups[topicGroup]){
          topicGroups[topicGroup] = [];
        }
        topicGroups[topicGroup].push(topic);
      })


    },
    /**
     * 解除订阅主题
     **/
    unsubscribe : function(topic,topicGroup,removeMessageHandler,unsubscribeOptions={}){
      unsubscribeOptions = {...defaultUnsubscribeOptions,...unsubscribeOptions};
      removeMessageHandler = removeMessageHandler || true;
      topicGroup = topicGroup || "default";

      if(!this.existSubscribe(topic,topicGroup)){
        return;
      }
      client.unsubscribe(topic);

      if(topicGroups[topicGroup]){
        var newTopicGroups = [];
        $.each(topicGroups[topicGroup],function(_,topicItem){
          if(topicItem !== topic){
            newTopicGroups.push(topicItem);
          }
        })
        topicGroups[topicGroup] = newTopicGroups;
      }

      if(true === removeMessageHandler){
        delete messageHandlers[topic];
      }
    },
    /**
     * 解除除某分组和默认分组下的其他分组订阅主题
     **/
    unsubscribeUnlessSpecifiedGroup : function(topicGroup,removeMessageHandler,unsubscribeOptions){
      var _this = this;
      topicGroup = topicGroup || "default";

      $.each(topicGroups,function(group,topics){
        if("default" !== group && topicGroup !== group){
          $.each(topics,function(_,topic){
            client.unsubscribe(topic);
            if(true === removeMessageHandler){
              delete messageHandlers[topic];
            }
          })
          delete topicGroups[topicGroup];
        }
      });

    },
    /**
     * 解除所有订阅
     **/
    unsubscribeAll : function(){
      $.each(topicGroups,function(group,topics){
        $.each(topics,function(_,topic){
          client.unsubscribe(topic);
        })
      });

      topicGroups = {};
      messageHandlers = {};

    },
    /**
     * 注册消息处理器
     **/
    registerMessageHandler : function(topic,handlerName,messageHandler){
      topic = topic.replace(/\+/g,"[^/@REX@]*").replace(/\#/g,"[^@REX@]*").replace(/@REX@/g,"+#");
      handlerName = handlerName.indexOf('.') == -1 ? "default."+handlerName : handlerName;
      if(!messageHandlers[topic]){
        messageHandlers[topic] = {};
      }
      messageHandlers[topic][handlerName] = messageHandler;
    },
    /**
     * 删除注册的消息处理器
     **/
    removeMessageHandlersUnlessSpecifiedGroup : function(topicGroup){
      var _this = this;
      topicGroup = topicGroup || "default";

      $.each(topicGroups,function(group,topics){
        $.each(topics,function(_,topic){
          $.each(messageHandlers[topic],function(name,messageHandler){
            if("default" !== name.substr(0,name.indexOf('.'))){
              delete messageHandlers[topic][name];
            }
          });
        })
        delete topicGroups[topicGroup];
      });
    },
    /**
     * 删除注册的消息处理器
     **/
    removeMessageHandler : function(topic,handlerName){
      topic = topic.replace(/\+/g,"[^/@REX@]*").replace(/\#/g,"[^@REX@]*").replace(/@REX@/g,"+#");
      handlerName == handlerName.indexOf('.') == -1 ? "default."+handlerName : handlerName;
      if(!messageHandlers[topic]){
        return;
      }

      delete messageHandlers[topic][handlerName];
    },
    /**
     * 关闭连接
     **/
    disconnect : function(){
      this.unsubscribeAll();
      client.disconnect();
    },
    sendMessage:function(data){
      var message = new Paho.MQTT.Message(data);
      message.destinationName = "/message";
      console.log("SEND ON " + message.destinationName + " PAYLOAD " + data);
      client.send(message);
    }
  }

}();

export default mqttCtrl;
