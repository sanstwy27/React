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

// Get Articles
export const getArticles = (offset = 0, limited = 10) => {
    return service.post('/v3/357240c9-c8f1-46e3-9a15-e33361c56ab6', {
        offset,
        limited
    })
}

// Delete Article by ID
export const deleteArticleById = (id) => {
    return service.post(`/v3/2ecf072a-e744-490a-a791-3c74a2eeb45d`, {
        id
    })
}

// Get Article by ID
export const getArticleById = (id) => {
    return service.post(`/v3/1eca0c77-bd4e-4a2e-b337-7fb13035d163`, {
        id
    })
}

// Save Article
export const saveArticle = (id, data) => {
    return service.post(`/v3/a207eb9d-f4f3-4725-8f65-82c8c0d3473b`, {
        id,
        data
    })
}

// Get Article View Count
export const getArticleCount = () => {
    return service.post(`/v3/7467bdf1-922e-4a7c-a1a0-b826f0c70c4b`)
}

// Get Notifications
export const getNotifications = () => {
    return service.post(`/v3/719b88cb-99af-4d0e-9d0e-bb7fe0315abe`)
}
