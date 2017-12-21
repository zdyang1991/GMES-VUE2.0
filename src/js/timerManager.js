const timerMap = {

};
export default {
	register(name,callback,time){
		if(!timerMap[name]){
			timerMap[name] = setInterval(()=>{
				callback && callback()
			},time);
		}
	},
	clear(name){
		clearInterval(timerMap[name])
	},
	clearAll(){
		for(var i in timerMap){
			this.clear(i)
		}
	}
}