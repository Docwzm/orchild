import axios from 'axios'
import { Toast } from 'vant'

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
        if (token) {
            config.headers['Authorization'] = token
        }
        config.headers['appName'] = 'manage_pc'
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
        if (res.code !== 200&&res.code !== "200") {
            Toast.loading({
                duration: 5000, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: res.msg
            })

            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('error:', error)
        Toast.loading({
            duration: 5000, // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: error.message
        })
        return Promise.reject(error)
    }
)

export default service
