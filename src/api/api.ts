import axios, {AxiosResponse} from 'axios'
import {ForgotPasswordType, SetNewPasswordType} from '../features/login/auth-reducer'


export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: /*process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : */'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseMeType>>('/auth/login', data)
    },
    me() {
        return instance.post<{}, AxiosResponse<ResponseMeType>>('/auth/me', {})
    },
    registerUser(data:RegisterParamsType) {
        return instance.post<RegisterParamsType, AxiosResponse<ResponseMeType>>('auth/register', data)
    },
    forgotPassword(data: ForgotPasswordType) {
        return instance.post<ForgotPasswordType, AxiosResponse<ResponseForgotType>>('auth/forgot', data)
    },
    setNewPassword(data: SetNewPasswordType) {
        return instance.post<SetNewPasswordType, AxiosResponse<ResponseForgotType>>('auth/forgot', data)
    },
}



//type
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseForgotType = {
	info: string;
	success: boolean;
	answer: boolean;
	html: boolean;
}

export type ResponseMeType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean; // подтвердил ли почту
    publicCardPacksCount: number; // количество колод
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}

export type RegisterParamsType = {
    email: string
    password: string
}


// export type ErrorResponseType = {
//     error?: string
// }
