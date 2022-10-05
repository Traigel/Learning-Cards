import {AppThunk} from "../../app/store";
import {createPacksType, packsAPI, PackType, ResponsePacksType, updatePackType} from "../../api/api";
import {setAppStatusAC} from "../../app/app-reducer";
import {errorHandlerUtil} from "../../common/utils/errors-utils";

const initialState = {
    cardPacks: null as PackType[] | null,
    page: 1,
    pageCount: 5,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: '',
    tokenDeathTime: 0,
    packNameSearch: '',
    minRange: 0,
    maxRange: 0
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialPacksStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {
                ...
                    state,
                cardPacks: action.data.cardPacks,
                cardPacksTotalCount: action.data.cardPacksTotalCount,
                minCardsCount: action.data.minCardsCount,
                maxCardsCount: action.data.maxCardsCount,
                token: action.data.token,
                tokenDeathTime: action.data.tokenDeathTime,
                page: action.data.page,
                pageCount: action.data.pageCount
            }
        case "PACKS/SET-PACKS-NAME-SEARCH": {
            return {...state, packNameSearch: action.packName}
        }
        case "PACKS/SET-MIN-MAX": {
            return {...state, minRange: action.min, maxRange: action.max}
        }
        // case "PACKS/SET-PAGES": {
        //     return {...state, page: action.page, pageCount: action.pageCount}
        // }
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

export const setPackNameSearchAC = (packName: string) => ({
    type: 'PACKS/SET-PACKS-NAME-SEARCH', packName
} as const)

export const setMinMaxAC = (min: number, max: number) => ({
    type: 'PACKS/SET-MIN-MAX', min, max
} as const)

// export const setPagesAC = (page: number, pageCount: number) => ({
//     type: 'PACKS/SET-PAGES', page, pageCount
// } as const)

//thunks
export const setPacksTC = (data: SetDataType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await packsAPI.getPacks(data)
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
        dispatch(setPacksTC({page: 1, pageCount: 5}))
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
        dispatch(setPacksTC({page: 1, pageCount: 5}))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}

export const deletePackTC = (data: string): AppThunk => async (dispatch, getState) => {
    dispatch(setAppStatusAC("loading"))
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount
    try {
        await packsAPI.deletePack(data)
        dispatch(setPacksTC({page, pageCount}))
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
    | ReturnType<typeof setPackNameSearchAC>
| ReturnType<typeof setMinMaxAC>
// | ReturnType<typeof setPagesAC>

export type SetDataType = {
    page: number,
    pageCount: number,
    packName?: string
    minRange?: number
    maxRange?: number
}