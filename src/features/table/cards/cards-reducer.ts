import {cardsAPI, CardsType, createCardsType, updateCardsType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {errorHandlerUtil} from '../../../common/utils/errors-utils';

const InitialStateCards = {
    cards: null as CardsType[] | null,
    packUserID: null as string | null,
    packName: null as string | null,
}

export const cardsReducer = (state = InitialStateCards, action: CardsActionType): InitialStateCardsType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                cards: action.data
            }
        case 'CARDS/SET-USER-ID':
            return {
                ...state,
                packUserID: action.userID
            }
        case 'CARDS/SET-PACK-NAME':
            return {
                ...state,
                packName: action.packName
            }
        default:
            return state
    }
}

//action creators
export const setCards = (data: CardsType[]) => ({type: 'CARDS/SET-CARDS', data} as const)
export const setPackUserID = (userID: string) => ({type: 'CARDS/SET-USER-ID', userID} as const)
export const setPackName = (packName: string) => ({type: 'CARDS/SET-PACK-NAME', packName} as const)

//thunks
export const setCardsTC = (packID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(packID)
        dispatch(setCards(res.data.cards))
        dispatch(setPackUserID(res.data.packUserId))
        dispatch(setPackName(res.data.packName))
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
            dispatch(setCardsTC(data.cardsPack_id))
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
        dispatch(setCardsTC(res.data.deletedCard.cardsPack_id))
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
        dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types

export type InitialStateCardsType = typeof InitialStateCards

export type CardsActionType =
    | ReturnType<typeof setCards>
    | ReturnType<typeof setPackUserID>
    | ReturnType<typeof setPackName>
