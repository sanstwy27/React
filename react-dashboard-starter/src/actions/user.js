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
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('userInfo')
    window.sessionStorage.removeItem('authToken');
    window.sessionStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const logout = () => {
    return dispatch => {
        dispatch(loginFailed())
    }
}

export const login = (loginInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(loginInfo, "003")
            .then(resp => {
                if(resp.data.code === 200) {
                    const {
                        authToken,
                        ...userInfo
                    } = resp.data.data

                    if(loginInfo.remember === true) {
                        window.localStorage.setItem('authToken', authToken)
                        window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    } else {
                        window.sessionStorage.setItem('authToken', authToken)
                        window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                    }

                    dispatch(loginSuccess({
                        ...resp.data.data,
                        remember: loginInfo.remember
                    }))
                } else {
                    dispatch(loginFailed())
                }
            })
    }
}