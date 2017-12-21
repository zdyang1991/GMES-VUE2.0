import config from '@/js/config'
import { Message } from 'element-ui';
import mqttLib from '@/js/mqtt';

export default function (userCode){
	const topic = "message/" + config.apiBaseUrl.siteCode + "/" + userCode;
    mqttLib.subscribe(topic);
    mqttLib.registerMessageHandler(topic, "messageHandler", function(message) {
    	//console.log(message.payloadString)
        //消息类型有 普通 弹屏 公告  暂时都已弹出形式告知弹出
        const mes = JSON.parse(message.payloadString)
        Message(mes.messageContent);
    });
}
