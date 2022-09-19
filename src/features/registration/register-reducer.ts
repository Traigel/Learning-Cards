import axios, {AxiosError} from 'axios';
import {authAPI, RegisterParamsType} from '../../api/api';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {AppThunk} from '../../app/store';


const initialState = {
    registerSuccess: false
}

export const registerReducer = (state: InitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case 'register/set-is-register':
            return {
                ...state, registerSuccess: action.value
            }
        default:
            return state
    }
}

//actions
export const setIsRegistrationSuccess = (value: boolean) => ({
        type: 'register/set-is-register',
        value
    } as const
)

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
    }finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//type
type ErrorType = {
    error: string
    email: string
    in: string
}

export type InitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof setIsRegistrationSuccess>