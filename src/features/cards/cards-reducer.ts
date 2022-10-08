import {cardsAPI, CardsType, createCardsType, ResponseCardsType, updateCardsType} from '../../api/api';
import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {errorHandlerUtil} from '../../common/utils/errors-utils';
import {UrlParamsType} from "../packs/packs-reducer";

const InitialStateCards = {
    cards: null as CardsType[] | null,
    packUserId: '',
    packName: '',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    minGrade: 0,
    maxGrade: 0,
    token: '',
    tokenDeathTime: 0,
    params: {
        cardsPack_id: '',
        page: '1',
        pageCount: '5',
        cardQuestion: ''
    } as UrlCardsParamsType
}

export const cardsReducer = (state = InitialStateCards, action: CardsActionType): InitialStateCardsType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS-DATA':
            return {
                ...state,
                cards: action.data.cards,
                packUserId: action.data.packUserId,
                packName: action.data.packName,
                page: action.data.page,
                pageCount: action.data.pageCount,
                cardsTotalCount: action.data.cardsTotalCount,
                packPrivate: action.data.packPrivate,
                packDeckCover: action.data.packDeckCover,
                packCreated: action.data.packCreated,
                packUpdated: action.data.packUpdated,
                minGrade: action.data.minGrade,
                maxGrade: action.data.maxGrade,
                token: action.data.token,
                tokenDeathTime: action.data.tokenDeathTime
            }
        case "PACKS/SET-URL-PARAMS": {
            return {...state, params: {...action.params}}
        }
        default:
            return state
    }
}

//action creators
export const setCardsDataAC = (data: ResponseCardsType) => ({type: 'CARDS/SET-CARDS-DATA', data} as const)

export const setUrlCardsParamsAC = (params: UrlCardsParamsType) => ({type: 'PACKS/SET-URL-PARAMS', params} as const)

//thunks
export const setCardsTC = (): AppThunk => async (dispatch, getState) => {
    const urlParams = getState().cards.params
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards({...urlParams})
        dispatch(setCardsDataAC(res.data))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const createCardsTC = (data: createCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.createCards(data)
        if (data.cardsPack_id) {
            dispatch(setCardsTC())
        }
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deleteCardsTC = (cardID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.deleteCards(cardID)
        dispatch(setCardsTC())
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updateCardsTC = (card: updateCardsType): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.updateCards(card)
        dispatch(setCardsTC())
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types

export type InitialStateCardsType = typeof InitialStateCards

export type CardsActionType =
    | ReturnType<typeof setCardsDataAC>
    | ReturnType<typeof setUrlCardsParamsAC>


export type UrlCardsParamsType = {
    cardsPack_id?: string,
    page?: string,
    pageCount?: string,
    cardQuestion?: string
}