import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import axios, {AxiosError} from "axios";
import {ChangeUserNameParamsType, profileAPI} from "../../api/api";
import {AuthActionsType, setUserInfoAC} from "../login/auth-reducer";

const initialState: InitialProfileStateType = {
    name: null,
    avatar: null
}

export const profileReducer = (state: InitialProfileStateType = initialState, action: ProfileActionsType): InitialProfileStateType => {
    switch (action.type) {
        case "PROFILE/SET-NEW-USER-NAME":
            return {...state, name: action.userName}
        default:
            return state
    }
}

//action creators
export const setNewUserNameAC = (userName: string) => ({type: 'PROFILE/SET-NEW-USER-NAME', userName} as const)

//thunks
export const changeUserNameTC = (data: ChangeUserNameParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await profileAPI.changeUserName(data)
        // dispatch(setUserInfoAC())
        dispatch(setNewUserNameAC(data.name))
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
export type InitialProfileStateType = {
    name: string | null
    avatar: string | null
}
export type SetNewUserNameType = ReturnType<typeof setNewUserNameAC>
export type ProfileActionsType = SetNewUserNameType | AuthActionsType