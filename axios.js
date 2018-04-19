import axios from 'axios'
import {encrypt} from '../ase/index'

// import store from '@/store'
// import { getToken } from '@/utils/auth'

const publicData = {accountId: 32, token: 'b14fad089098ac82f8cf9695f28d8380', source: 1}
const baseUrl = 'http://192.168.1.191:8080/juhaowan'
// create an axios instance
const service = axios.create({
    baseURL: baseUrl, // api的base_url
    timeout: 5000, // request timeout
    responseType: "json",
    // withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
})

// request interceptor
service.interceptors.request.use(config => {
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 104) {
            console.log('登录时效hahah')
            return Promise.reject('error');
        } else {
            return response;
        }
        error => {
            console.log('err' + error)// for debug
            return Promise.reject(error)
        }
    }
)


export default {
    get(url, data){
        let publicdata =JSON.stringify(publicData)
        return service({
            method: 'get',
            url: url,
            params: {data: encrypt(publicdata)},
        })
            .then(res => res.data)

    },
    post(url, data){
        let value = Object.assign(publicData, data)
        let Data = JSON.stringify(value)
        return service({
            method: 'post',
            url: url,
            params: {data: encrypt(Data)}
        })
            .then(res => res.data)
    }
}
