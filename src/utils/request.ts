import axios from 'axios'
import { Toast, Dialog } from 'vant'
import router from '@/router/router.ts';
import store from '@/store'
import constants from "@/utils/constants"

// create an axios instance
const service = axios.create({
    // baseURL: "http://admin-dev.guanggujinxin.com/",   // rul=base url+ request url
    baseURL: '/', // rul=base url+ request url
    // withCredentials:true,    // send cookies when cross-domain request
    timeout: 10000 // request timeout
})

// request  interceptor
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        // const token = "ZDUwNTczM2MtMTRlOS00YTBmLTk5NzMtMmM5MjJiODg0MmU0";
        if (token) {
            config.headers['Authorization'] = token
        }
        config.headers['appName'] = constants.appName        
        // config.headers['appName'] = 'jinxin_mini_test'
        config.headers['content-type'] = 'application/json'
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// resposne interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200 && res.code !== '200') {
            Toast(res.msg)
            return Promise.reject(res);
        } else {
            return res
        }
    },
    error => {
        console.log('error:', error)
        // 如果登录token失效
        if (error.response.data.code == "8001") {
            Dialog.alert({
                title: '提醒',
                message: '您已下线,请重新登录!'
            }).then(() => {
                localStorage.clear()
                store.commit("resetData")
                // 跳转到首页
                router.push('/home');
            })
        } else {
            Toast(error.message)
        }
        return Promise.reject(error)
    }
)

export default service
