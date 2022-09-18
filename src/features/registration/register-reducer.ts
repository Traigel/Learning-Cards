import React from 'react';
import {Dispatch} from 'redux';
import {registerAPI, RegisterParamsType} from './registration-api';
import {setAppErrorAC} from '../../app/app-reducer';
import axios, {AxiosError, AxiosResponse} from 'axios';

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

export const registerTC = (data: RegisterParamsType) => async (dispatch: ThunkDispatch) => {
    const res = await registerAPI.registerUser(data).then(() => {
        dispatch(setIsRegistrationSuccess(true))
        // dispatch(setAppErrorAC())
    }).catch((error: AxiosError<{ error: string }>) => {
        if (axios.isAxiosError(error) && error.response) {
            const err = error.response
                ? error.response.data.error
                : error.message
            console.log(err)
        }
    })
}
type ThunkDispatch = Dispatch<ActionsType>