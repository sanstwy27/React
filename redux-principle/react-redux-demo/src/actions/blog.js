import actionTypes, {} from './actionTypes'
import { getPosts } from '../services'

const startLoading = () => {
    return {
        type: actionTypes.ACT_BLOG_START_LOADING
    }
}

const fetchListSuccess = (payload) => {
    return {
        type: actionTypes.ACT_BLOG_FETCH_LIST_SUCCESS,
        payload
    }
}

const fetchListFailed = () => {
    return {
        type: actionTypes.ACT_BLOG_FETCH_LIST_FAILED
    }
}

export const fetchBlogList = () => dispatch => {
    dispatch(startLoading())
    getPosts()
        .then(resp => {
            if(resp.status === 200) {
                dispatch(fetchListSuccess({
                    list: resp.data
                }))
            } else {
                dispatch(fetchListFailed())
            }
        })
        .catch(error => {
            console.log(error)
            dispatch(fetchListFailed())
        })
}