    function gettime(t) {
        var date = new Date();
        if (t) {
            date = new Date(t)
        };
        var obj = {};
        obj.year = date.getFullYear();
        obj.month = change(date.getMonth() + 1);
        obj.day = change(date.getDate());
        obj.hour = change(date.getHours());
        obj.minute = change(date.getMinutes());
        obj.second = change(date.getSeconds());
        obj.week = changeweek(date.getDay())
        return obj;
    }

    function change(l) {
        return l.toString().length < 2 ? '0' + l : l;
    }

    function changeweek(week) {
    	let str = '星期';
    	switch (week) {  
	        case 0 :  
	                str += "日";  
	                break;  
	        case 1 :  
	                str += "一";  
	                break;  
	        case 2 :  
	                str += "二";  
	                break;  
	        case 3 :  
	                str += "三";  
	                break;  
	        case 4 :  
	                str += "四";  
	                break;  
	        case 5 :  
	                str += "五";  
	                break;  
	        case 6 :  
	                str += "六";  
	                break;  
		}
		return str
    }

    function changeTimeLength(t = 0){
        if(typeof t != 'number'){
            t = String(t);
        }
        const hour = Math.floor(t/3600);
        const min  = Math.floor((t%3600)/60);
        return `${hour}时${min}分`
    }
    function one(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.year + '-' + time.month + '-' + time.day;
    };

    function two(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.year + '-' + time.month + '-' + time.day + ' ' + time.hour + 'h';
    };

    function three(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.year + '-' + time.month + '-' + time.day + ' ' + time.hour + ':' + time.minute;
    };

    function four(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.year + '-' + time.month + '-' + time.day + ' ' + time.hour + ':' + time.minute + ':' + time.second;
    }

    function five(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.month + '月' + time.day + '日';
    }

    function six(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.hour + ':' + time.minute + ':' + time.second;
    }

    function severn(t) {
        if(!t){
            return ''
        }
        var time = typeIsObj(t) ? t : gettime(t);
        return time.week
    }

    function typeIsObj(t){
       return Object.prototype.toString.call(t) == '[object Object]' ?  true : false
    }



    export default {
    	gettime:gettime,//obj
        one: one, //2009-09-09 
        two: two, //2009-09-09 08h
        three: three,//2009-09-09 08:02
        four: four,//2009-09-09 08:02:02
        five: five,//6月6日
        six:six,//10:10:10;
        severn:severn,
        changeTimeLength:changeTimeLength
    };
