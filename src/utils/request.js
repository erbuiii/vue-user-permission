import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from '@/utils/auth'
import { process } from "ipaddr.js";

//用自定义配置创建axios实例
const service = axios.create({
    //BASE_API：api的base_url，通过env环境变量切换api的地址,读取config文件
    baseURL: process.env.BASE_API,
    timeout: 15000  //请求超时时间
})

//request拦截器
service.interceptors.request.use(config => {
    //在请求发出之前
    if(store.getters.token) {
        //让每个请求携带自定义token（根据实际情况修改，['X-Token']为自定义key）
        config.headers['X-Token'] = getToken()
    }
    return config
}, error => {
    //请求错误情况
    console.log(error)
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
    response => {
        const res = response.data

        //20000：抛错
        if(res.code !== 20000) {
            Message({
                message: res.data,
                type: 'error',
                duration: 5 * 1000
            })
            //50008：非法的token，50012：其他客户端登录了，50014：token过期
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        //重新实例化vue-router对象，避免bug
                        location.reload()
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        //debug
        console.log('err', + error)
        Message({
            message: error.message,
            type: error,
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service