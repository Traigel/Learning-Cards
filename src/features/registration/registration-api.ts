import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const registerAPI = {
    registerUser(data:RegisterParamsType) {
        return instance.post<AxiosResponse>('auth/register', data)
    },

}

export type RegisterParamsType = {
    email: string
    password: string
}


export type ErrorResponseType = {
    error?: string
}

//
// export type ResponseRegUserType = {
//     addedUser:{
//         _id: string;
//         email: string;
//         rememberMe: boolean;
//         isAdmin: boolean;
//         name: string;
//         verified: boolean;
//         publicCardPacksCount: number;
//         created: string;
//         updated: string;
//         __v: number;
//     }
// }