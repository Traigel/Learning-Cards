import {AppThunk} from "../../app/store";
import {createPacksType, packsAPI, PackType, ResponsePacksType, updatePackType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
	cardPacks: null as PackType[] | null,
	page: 0,
	pageCount: 0,
	cardPacksTotalCount: 0,
	minCardsCount: 0,
	maxCardsCount: 100,
	token: 0,
	tokenDeathTime: 0,
	filterPacks: 'My' as 'My' | 'All'
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...action.data, filterPacks: "My"}
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



//types
export type InitialPacksStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof setPacksDataAC>