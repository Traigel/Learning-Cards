import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/api";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

const initialState: InitialAuthStateType = {
    isLoggedIn: false,
    _id: null,
    name: null,
    email: null,
    publicCardPacksCount: 0, // количество колод
    avatar: null
}

export const authReducer = (state: InitialAuthStateType = initialState, action: AuthActionsType): InitialAuthStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "AUTH/SET-USER-INFO":
            return {
                ...state,
                _id: action.id,
                name: action.name,
                email: action.email,
                publicCardPacksCount: action.publicCardPacksCount,
                avatar: action.avatar,
            }
        default:
            return state
    }
}

//action
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setUserInfoAC = (id: string, email: string, name: string, publicCardPacksCount: number, avatar: string) =>
    ({type: 'AUTH/SET-USER-INFO', id, email, name, publicCardPacksCount, avatar} as const)


//thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserInfoAC(res.data._id, res.data.email, res.data.name, res.data.publicCardPacksCount, res.data.avatar))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
            dispatch(setAppErrorAC(error))
        } else {
            dispatch(setAppErrorAC(`Native error ${err.message}`))
        }
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}


//type
export type InitialAuthStateType = {
    isLoggedIn: boolean
    _id: string | null
    email: string | null
    name: string | null
    publicCardPacksCount: number
    avatar: string | null
}
export type  SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
export type  SetUserInfoType = ReturnType<typeof setUserInfoAC>
export type AuthActionsType = SetIsLoggedInType | SetUserInfoType