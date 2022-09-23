import {authAPI} from "../api/api";
import {setIsLoggedInOutAC, setUserInfoAC} from "../features/login/auth-reducer";
import {AppThunk} from './store';

const initialState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
    error: null as string | null,
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
export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setIsLoggedInOutAC(true))
        dispatch(setUserInfoAC(res.data))
    } catch (e) {
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

// type
export type InitialAppStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading'
export type AppActionType =
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setAppErrorAC>