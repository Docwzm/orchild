const utils = {
    /**
     * 货币格式化
     * @param number
     * @param decimals 要格式化的数字
     * @param dec_point 小数点符号
     * @param thousands_sep 千分位符号
     * @param roundtag 舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
     */
    moneyNormalize: function (number: any, decimals = 2, decpoint: any, thousandssep: any, roundtag: any) {
        number = (number + '').replace(/[^0-9+-Ee.]/g, '')
        roundtag = roundtag || 'round' // "ceil","floor","round"
        var n = !isFinite(+number) ? 0 : +number
        var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        var sep = typeof thousandssep === 'undefined' ? ',' : thousandssep
        var dec = typeof decpoint === 'undefined' ? '.' : decpoint
        var s = []
        var toFixedFix = function (n: any, prec: any) {
            var k = Math.pow(10, prec)
            console.log()

            return (
                '' +
                parseFloat(
                    Math.round(parseFloat((n * k).toFixed(prec * 2))).toFixed(
                        prec * 2
                    )
                ) /
                k
            )
        }
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
        var re = /(-?\d+)(\d{3})/
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, '$1' + sep + '$2')
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
    },
    getCurrentDate() {
        return new Date();
    },
    //获取本周日期
    getCurrentWeek() {
        //起止日期数组
        var startStop = [];
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间
        startStop.push(this.formatDate(monday)); //本周起始时间
        //添加本周最后一天时间
        startStop.push(this.formatDate(sunday)); //本周终止时间
        //返回
        return startStop;
    },
    //获取本月
    getCurrentMonth() {
        //起止日期数组
        var startStopYear = [];
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);
        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        //添加至数组中返回
        startStopYear.push(this.formatDate(firstDay));
        startStopYear.push(this.formatDate(lastDay));
        //返回
        return startStopYear;
    },
    //获取本年日期
    getCurrentYear() {
        //起止日期数组
        var startStop = [];
        //获取当前时间
        var currentDate = this.getCurrentDate();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //本年第一天
        var currentYearFirstDate = new Date(currentYear, 0, 1);
        //本年最后一天
        var currentYearLastDate = new Date(currentYear, 11, 31);
        //添加至数组
        startStop.push(this.formatDate(currentYearFirstDate));
        startStop.push(this.formatDate(currentYearLastDate));
        //返回
        return startStop;
    },
    formatDate(date: any) {
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = '0' + mymonth;
        }
        if (myweekday < 10) {
            myweekday = '0' + myweekday;
        }
        return (myyear + '/' + mymonth + '/' + myweekday);
    },
    //判断是否登录 废弃
    // isLogin() {
    //     let token = localStorage.getItem('token')
    //     return token ? true : false
    // },

    /**
     * 格式化日期。默认返回格式 yyyy-MM-dd hh:mm:ss
     * @param date
     * @param f
     * @return {string}
     */
    format(date: string | Date, f: string = 'yyyy-MM-dd hh:mm:ss'): string {
        if (!(Date as any).prototype['format']) {
            (Date as any).prototype['format'] = function (fmt: string) {
                const o: any = {
                    'M+': this.getMonth() + 1,
                    'd+': this.getDate(),
                    'h+': this.getHours(),
                    'm+': this.getMinutes(),
                    's+': this.getSeconds(),
                    'q+': Math.floor((this.getMonth() + 3) / 3),
                    'S': this.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (const k in o) {
                    if (new RegExp('(' + k + ')').test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                    }
                }
                return fmt;
            };
        }
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return (date as any)['format'](f);
    },
    platform() {
        let I = navigator.userAgent;
        let isiPad = (I.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
        let isiPhone = (!isiPad && I.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
        return isiPhone
    }
};

export default utils
