import axios, {AxiosError} from "axios";
import {setAppErrorAC} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {AppRootActionsType} from "../../app/store";

export const errorHandlerUtil = (e: any, dispatch: Dispatch<AppRootActionsType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
}