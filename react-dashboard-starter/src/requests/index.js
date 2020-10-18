import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'https://run.mocky.io' : ''
})

service.interceptors.request.use((config) => {
    //**** can add token here
    // config.data = Object.assign({}, config.data, { 
    //     authToken: window.localStorage.getItem('authToken')
    // })
    return config
})

service.interceptors.response.use((resp) => {
    if(resp.data.code === 200) {
        return resp.data.data
    } else {
        message.error(resp.data.errMsg)
    }
})

export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/v3/357240c9-c8f1-46e3-9a15-e33361c56ab6', {
        offset,
        limited
    })
}