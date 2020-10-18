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
    return service.post('/v3/2fccee2f-66b8-4832-9f0a-ed918325abd5', {
        offset,
        limited
    })
}