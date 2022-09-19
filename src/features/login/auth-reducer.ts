import axios, {AxiosError} from 'axios';
import {authAPI, LoginParamsType, RegisterParamsType} from '../../api/api';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {AppThunk} from '../../app/store';

const initialState: InitialAuthStateType = {
    isLoggedIn: false,
    profile: null,
    registerSuccess: false
}

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET-USER-INFO':
            return {
                ...state,
                profile: {...action.data}
            }
        case 'register/set-is-register':
            return {
                ...state, registerSuccess: action.value
            }
        default:
            return state
    }
}

//action
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setUserInfoAC = (data: ProfileType) => ({type: 'AUTH/SET-USER-INFO', data} as const)
export const setIsRegistrationSuccess = (value: boolean) => ({type: 'register/set-is-register', value} as const)

//thunks
export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserInfoAC(res.data))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAppErrorAC(error))
        } else {
            dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const registerTC = (data: RegisterParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.registerUser(data)
        dispatch(setIsRegistrationSuccess(true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAppErrorAC(error))
        } else {
            dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//type
export type InitialAuthStateType = {
    isLoggedIn: boolean
    profile: ProfileType | null
    registerSuccess: boolean
}

export type ProfileType = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
    token: string;
    tokenDeathTime: number;
    avatar: string;
}

export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setUserInfoAC>
    | ReturnType<typeof setIsRegistrationSuccess>