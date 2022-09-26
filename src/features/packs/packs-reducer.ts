import {AppThunk} from "../../app/store";
import {createPacksType, packsAPI, PackType, updatePackType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
    packs: null as PackType[] | null,
    page: null as number | null,
    pageCount: null as number | null,
    cardPacksTotalCount: null as number | null,
    minCardsCount: null as number | null,
    maxCardsCount: null as number | null,
    token: null as string | null,
    tokenDeathTime: null as number | null
}

export const packsReducer = (state = initialState, action: PacksActionsType) => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, packs: action.data}
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: PackType[]) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

//thunks
export const setPacksTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await packsAPI.getPacks()
        dispatch(setPacksDataAC(res.data.cardPacks))
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
export type InitialAuthStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof setPacksDataAC>