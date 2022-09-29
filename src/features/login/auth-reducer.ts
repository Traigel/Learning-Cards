import {authAPI, ChangeUserNameParamsType, LoginParamsType, RegisterParamsType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
    isLoggedIn: false,
    profile: null as ProfileType | null,
    forgotPasswordSuccess: false,
    forgetEmail: null as string | null,
    newPasswordSuccess: false
}

export const authReducer = (state = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case "AUTH/SET-LOGIN-LOGOUT":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "AUTH/SET-USER-INFO":
            if (action.data) {
                return {
                    ...state,
                    profile: {...action.data}
                }
            } else return {...state, profile: null}
        case 'AUTH/SEND-FORGOT-PASSWORD':
            return {...state, forgotPasswordSuccess: action.forgotPasswordSuccess}
        case 'AUTH/NEW-PASSWORD-SUCCESS':
            return {...state, newPasswordSuccess: action.newPassword}
        case 'AUTH/SET-DATA-EMAIL':
            return {
                ...state,
                forgetEmail: action.email
            }
        default:
            return state
    }
}

//action creators
export const setIsLoggedInOutAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-LOGIN-LOGOUT', isLoggedIn} as const)
export const setUserInfoAC = (data: ProfileType | null) => ({type: 'AUTH/SET-USER-INFO', data} as const)
export const forgotPasswordSuccess = (forgotPasswordSuccess: boolean) => ({
    type: 'AUTH/SEND-FORGOT-PASSWORD',
    forgotPasswordSuccess
} as const)
export const newPasswordSuccess = (newPassword: boolean) => ({
    type: 'AUTH/NEW-PASSWORD-SUCCESS',
    newPassword
} as const)
export const setDataForgetPassword = (email: string) => ({type: 'AUTH/SET-DATA-EMAIL', email} as const)

//thunks
export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInOutAC(true))
        dispatch(setUserInfoAC(res.data))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await authAPI.logout()
        dispatch(setIsLoggedInOutAC(false))
        dispatch(setUserInfoAC(null))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}
export const registerTC = (data: RegisterParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.registerUser(data)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const forgotPasswordTC = (data: ForgotPasswordType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.forgotPassword(data)
        dispatch(setDataForgetPassword(data.email))
        dispatch(forgotPasswordSuccess(true))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const createNewPasswordTC = (data: SetNewPasswordType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.setNewPassword(data)
        dispatch(newPasswordSuccess(true))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}
export const updateUserInfoTC = (data: ChangeUserNameParamsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.changeUserName(data)
        dispatch(setUserInfoAC(res.data.updatedUser))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//types
export type InitialAuthStateType = typeof initialState

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

export type SetNewPasswordType = {
    password: string
    resetPasswordToken: string | undefined
}

export type ForgotPasswordType = {
    email: string
    message: string
}

export type AuthActionsType =
    | ReturnType<typeof setIsLoggedInOutAC>
    | ReturnType<typeof setUserInfoAC>
    | ReturnType<typeof forgotPasswordSuccess>
    | ReturnType<typeof setDataForgetPassword>
    | ReturnType<typeof newPasswordSuccess>