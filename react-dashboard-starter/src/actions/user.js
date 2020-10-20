import actionTypes from './actionTypes'
import { loginRequest } from '../requests'

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}

const loginFailed = () => {
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo)
            .then(resp => {
                if(resp.data.code === 200) {
                    dispatch(loginSuccess({
                        ...resp.data.data,
                        remember: userInfo.remember
                    }))
                } else {
                    dispatch(loginFailed())
                }
            })
    }
}