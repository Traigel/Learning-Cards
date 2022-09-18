import {Dispatch} from "redux"
import {authAPI} from "../api/api";

const initialState: InitialAppStateType = {
    status: 'idle',
    isInitialized: false,
    error: null,
}

export const appReducer = (state = initialState, action: AppActionType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case "APP/SET-IN-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

//actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IN-INITIALIZED', isInitialized} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

//thunks
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setIsInitializedAC(true))
    } catch (error) {
        dispatch(setIsInitializedAC(false))
    }
}

// type
export type InitialAppStateType = {
    status: RequestStatusType
    isInitialized: boolean
    error: string | null
}
type SetStatusType = ReturnType<typeof setAppStatusAC>
type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
type SetErrorType = ReturnType<typeof setAppErrorAC>
export type AppActionType = SetStatusType | SetIsInitializedType | SetErrorType
export type RequestStatusType = 'idle' | 'loading'