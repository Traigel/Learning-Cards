import {Dispatch} from 'redux';
import {registerAPI, RegisterParamsType} from './registration-api';
import axios, {AxiosError} from 'axios';
import {authAPI} from '../../api/api';
import {setAppErrorAC} from '../../app/app-reducer';

type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setIsRegistrationSuccess>

const initialState = {
    registerSuccess: false
}

export const RegisterReducer = (state: InitialStateType = initialState, action: ActionsType) => {
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

type ErrorType = {
   error: string
   email: string
   in: string
}



export const registerTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.registerUser(data)
        dispatch(setIsRegistrationSuccess(true))
    }catch (e) {
                const err = e as Error | AxiosError
                if (axios.isAxiosError(err)) {
                    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
                    dispatch(setAppErrorAC(error))
                } else {
                    dispatch(setAppErrorAC(`Native error ${err.message}`))
                }
    }
}