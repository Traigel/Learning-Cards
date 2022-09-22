import axios, {AxiosResponse} from 'axios'
import {ProfileType} from "../features/login/auth-reducer";

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseMeType>>('/auth/login', data)
    },
    logout() {
        return instance.delete<AxiosResponse<ResponseMeType>>('/auth/me')
    },
    me() {
        return instance.post<{}, AxiosResponse<ResponseMeType>>('/auth/me')
    },
    changeUserName(data: ChangeUserNameParamsType) {
        return instance.put<ChangeUserNameParamsType, AxiosResponse<ResponseUpdatesUserType>>('auth/me', data)
    }
}

//type
export type ChangeUserNameParamsType = {
    name: string
    avatar: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type ResponseUpdatesUserType = {
    token: string
    tokenDeathTime: string
    updatedUser: ProfileType
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
