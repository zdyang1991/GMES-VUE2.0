import Paho from "./vendors/mqtt/mqttws31";
import requestApi from "./config";
import userInfo  from "./userinfo";
import $ from 'jquery'
var mqttCtrl = function () {
    /**
     * 客户端编号，采用平台编码+工厂+用户编码形式
     **/
    var clientId = null;

    //var wsbroker = "10.96.100.142";
    var wsbroker = requestApi.apiBaseUrl.mqttServer;
    var wsport = requestApi.apiBaseUrl.mqttPort;

    var defaultOptions = {
        userName:requestApi.apiBaseUrl.mqttUserName,
        password:requestApi.apiBaseUrl.mqttPassword,
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
            const _this = this;
            return new Promise(async (resolve,reject)=>{
                if(initStatus == 0 || !client || !client.isConnected){
                    var userData = await userInfo.getUserProfile();
                    clientId =  "PDA-"+requestApi.apiBaseUrl.siteCode+"-"+ userData.userCode + "-"+ (new Date().getTime());
                    client = new Paho.MQTT.Client(wsbroker, wsport, "/ws", clientId);
                    client.onConnectionLost = function (responseObject) {
                        console.log("Websocket disconnect : "+responseObject.errorMessage);
                        console.log("连接丢失，重新连接")
                        client = null;
                        _this.connect(options);
                    };

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
                    options["onSuccess"] = function(){
                        console.log(clientId + ": CONNECTED");
                        resolve();
                        initStatus = 2;
                    };
                    options["onFailure"] = function(message){
                        console.log(clientId + ": CONNECTION FAILURE - " + message.errorMessage);
                        reject();
                        initStatus = 0;
                    }
                    client.connect(options);
                }else{
                    resolve();
                }
            })
            /*if(initStatus == 0 || !client || !client.isConnected){
                initStatus = 1;
                var userData = await userInfo.getUserProfile();
                clientId =  "PDA-"+requestApi.apiBaseUrl.siteCode+"-"+ userData.userCode + "-"+ (new Date().getTime());
                client = new Paho.MQTT.Client(wsbroker, wsport, "/ws", clientId);
                client.onConnectionLost = function (responseObject) {
                    console.log("Websocket disconnect : "+responseObject.errorMessage);
                    console.log("连接丢失，重新连接")
                    client = null;
                    _this.connect(options);
                };

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


                options = $.extend({},defaultOptions,options);
                options["onSuccess"] = function(){
                    console.log(clientId + ": CONNECTED");
                    connectDeferred.resolve();
                    initStatus = 2;
                };
                options["onFailure"] = function(message){
                    console.log(clientId + ": CONNECTION FAILURE - " + message.errorMessage);
                    connectDeferred.reject();
                    initStatus = 0;
                }
                client.connect(options);
            }

            if(initStatus != 2){
              return connectDeferred.promise();
            }else{
                return;
            }*/

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

            if(!existSubscribe(topic,topicGroup)){
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
            message.destinationName = "/logs/client-pad/web";
            console.log("SEND ON " + message.destinationName + " PAYLOAD " + data);
            client.send(message);
        }
    }

    

}();

export default mqttCtrl;