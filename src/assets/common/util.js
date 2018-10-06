import axios from 'axios';
import common from './common';
import interfaces from './interfaces';
import $ from 'Jquery'
export default {
    getDate (date) {
        if (!date) {
          return new Date()
        }

        var theDate = ''
        if (typeof date == 'number') {
          theDate = new Date(date)
        } else if (date.length === undefined) {
            theDate = date
        } else {
          if (date.length > 10) {
            var dateArr = date.split(/[T\s]/)

            var beforeTime = dateArr[0].split('-')
            var afterTime = dateArr[1].split(':')

            afterTime[2] = afterTime[2] ? afterTime[2] : '00'
          } else {
            var beforeTime = date.split('-')
          }

          if (afterTime) {
            theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2], afterTime[0], afterTime[1], afterTime[2])
          } else {
            theDate = new Date(beforeTime[0], beforeTime[1] - 1, beforeTime[2])
          }
        }

        if (!theDate) {
          theDate = new Date()
        }

        return theDate
    },
    /**
       * 格式化日期函数
       * @param date {Date|Date String} [需要格式化的日期]
       * @param frm {String} [格式(如：yyyy-MM-dd hh:mm:ss)]
       * @return 格式化后的日期
       */
    formatDate (date, fmt) {
        fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss'
        if (!date || !fmt) {
            return false
        }

        let theDate = new Date(date)
        var o = {
            'M+': theDate.getMonth() + 1, // 月份
            'd+': theDate.getDate(), // 日
            'h+': theDate.getHours(), // 小时
            'm+': theDate.getMinutes(), // 分
            's+': theDate.getSeconds(), // 秒
            'q+': Math.floor((theDate.getMonth() + 3) / 3), // 季度
            'S': theDate.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
    },
    formDataDate (str) {
        var dateStr = new Date(str)
        var year = dateStr.getFullYear()
        var monthStr = dateStr.getMonth() + 1
        var dayStr = dateStr.getDate()
        var month = monthStr < 10 ? '0' + monthStr : monthStr
        var day = dayStr < 10 ? '0' + dayStr : dayStr
        return year + '-' + month + '-' + day
    },
    formMonthDate (str) {
        var dateStr = new Date(str)
        var year = dateStr.getFullYear()
        var monthStr = dateStr.getMonth() + 1
        var dayStr = dateStr.getDate()
        var month = monthStr < 10 ? '0' + monthStr : monthStr
        return year + '-' + month
    },
    formDataTime (str) {
        var dateStr = new Date(str)
        var hours = dateStr.getHours()
        var minutes = dateStr.getMinutes()
        var seconds = dateStr.getSeconds()
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return hours + ':' + minutes + ':' + seconds
    },
    /**
     * 获取上一个月
     *
     * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
     */
    getPreMonth(date) {
        var arr = date.split('-')
        var year = arr[0] //获取当前日期的年份
        var month = arr[1] //获取当前日期的月份
        var days = new Date(year, month, 0)
        days = days.getDate() //获取当前日期中月的天数
        var year2 = year
        var month2 = parseInt(month) - 1
        if (month2 == 0) {
            year2 = parseInt(year2) - 1
            month2 = 12
        }
        var days2 = new Date(year2, month2, 0)
        days2 = days2.getDate()
        if (month2 < 10) {
            month2 = '0' + month2
        }
        var t2 = year2 + '-' + month2
        return t2
    },
    /**
     * 获取下一个月
     *
     * @date 格式为yyyy-mm的日期，如：2014-01
     */        
    getNextMonth(date) {
        var arr = date.split('-')
        var year = arr[0] //获取当前日期的年份
        var month = arr[1] //获取当前日期的月份
        var days = new Date(year, month, 0)
        days = days.getDate() //获取当前日期中的月的天数
        var year2 = year
        var month2 = parseInt(month) + 1
        if (month2 == 13) {
            year2 = parseInt(year2) + 1
            month2 = 1
        }
        var days2 = new Date(year2, month2, 0)
        days2 = days2.getDate()
        if (month2 < 10) {
            month2 = '0' + month2
        }
    
        var t2 = year2 + '-' + month2
        return t2
    },
    range: function (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
    },
    formRequest: (option) => {
        let method = option.method ? option.method : 'get';
        let idName = option.idName ? option.idName : 'formBox'
        let pathUrl = interfaces.interfaces[option.interface]

        if ($('#' + idName).length) {
            for (var key in option.data) {
                $('#' + key + idName).val(option.data[key])
            }
        } else {
            var formString = '<form id="' + idName + '" action="' + pathUrl + '" method="' + method + '" style="display:none" >'
            var inputString = ''
            for (var key in option.data) {
                inputString += '<input type="hidden" id="' + key + idName + '" name="' + key + '"  value="' + option.data[key] + '"/>'
            }

            formString = formString + inputString + '</form>'
            $(formString).appendTo('body')
        }

        $('#' + idName).submit()
    },
    request: (option) => {
        let method = option.method ? option.method : 'get';

        let putData = {
            url: interfaces.interfaces[option.interface],
            method: method,
            headers: {
                token: option.token ? option.token : ''
            }
        }
        if (method == 'get') {
            putData.params = option.data;
        } else if (method == 'post') {
            putData.data = option.data;
        }
        /**
         * 请求拦截：在请求之前执行 比如loading处理
         * */
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {

                    let status = response.data.success;
                    if(status == undefined){
                        status == 200
                    }
                    console.log("进入状态" + status);
                    if (status == 203) { //无认证状态
                        console.log("进入203状态")
                        window.location.href = "/login";
                        return;
                    }

                    common.removeLoading();
                    return response;
                }
            )

            axios(putData).then(res => {
                resolve({
                    status: 0,
                    result: res.data
                })
            }).catch((error) => {
                console.log(error);
                reject('error');
            });
        });

    },
    upFile: (e) => {
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {
                common.removeLoading();
                return response;
            })
            let file = e.target.files[0];

            if (!file) {
                return
            }

            var fileSize = file.size / 1024 / 1024
            if (fileSize > 10) {
                alert('文件大小不能超过10MB!')
                return false
            }

            let param = new FormData(); //创建form对象
            param.append('file', file, file.name);//通过append向form对象添加数据
            //param.append('chunk','0');//添加form表单中其他数据
            //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {
                timeout: 500000,
                headers: {'Content-Type': 'multipart/form-data'}
            };  //添加请求头
            axios.post(interfaces.interfaces.uploadArticleAreaImage, param, config)
                .then(response => {
                    common.removeLoading();
                    resolve({
                        status: 0,
                        result: response.data
                    });
                }).catch(() => {
                common.removeLoading();
                reject('error');
            });
        });
    },
    uploadFile: (option) => {
        return new Promise((resolve, reject) => {
            axios.interceptors.request.use(function (config) {
                common.loading();
                return config;
            })
            /**
             * 请求完成后执行
             * */
            axios.interceptors.response.use(function (response) {
                common.removeLoading();
                return response;
            })
            let file = option.event.target.files[0];

            if (!file) {
                return
            }

            var fileSize = file.size / 1024 / 1024
            if (fileSize > 10) {
                alert('文件大小不能超过10MB!')
                return false
            }
            
            let param = new FormData(); //创建form对象
            param.append('file', file, file.name);//通过append向form对象添加数据
            //param.append('chunk','0');//添加form表单中其他数据
            //console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            if (option.data) {
                for (var key in option.data) {
                    param.append(key, option.data[key])
                }
            }
            let config = {
                timeout: 500000,
                headers: {'Content-Type': 'multipart/form-data'}
            };  //添加请求头
            axios.post(interfaces.interfaces[option.url], param, config)
                .then(response => {
                    common.removeLoading();
                    resolve({
                        status: 0,
                        result: response.data
                    });
                }).catch((error) => {
                common.removeLoading();
                reject(error);
            });
        });
    }
};
