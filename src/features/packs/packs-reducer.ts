import {AppThunk} from "../../app/store";
import {createPacksType, packsAPI, PackType, ResponsePacksType, updatePackType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
    cardPacks: null as PackType[] | null,
    page: null as number | null,
    pageCount: null as number | null,
    cardPacksTotalCount: null as number | null,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: null as string | null,
    tokenDeathTime: null as number | null
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...action.data}
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

//thunks
export const setPacksTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await packsAPI.getPacks()
        dispatch(setPacksDataAC(res.data))
        console.log(res)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const addNewPackTC = (data: createPacksType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.createPack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const changePackTC = (data: updatePackType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.updatePack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const deletePackTC = (data: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        await packsAPI.deletePack(data)
        dispatch(setPacksTC())
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

//types
export type InitialPacksStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof setPacksDataAC>