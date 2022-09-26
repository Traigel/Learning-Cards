import {cardsAPI, createCardsType, updateCardsType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {errorHandlerUtil} from '../../../common/utils/errors-utils';

const InitialStateCards = {
    cards: null as Card[] | null
}


export const cardsReducer = (state = InitialStateCards, action: CardsActionType): InitialStateCardsType => {

    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                cards: action.data
            }
        default:
            return state
    }
}

//action creators
export const setCards = (data: Card[] | null) => ({type: 'CARDS/SET-CARDS', data})

//thunks
export const setCardsTC = (packID: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsAPI.getCards(packID)
        dispatch(setCards(res.data.cards))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const createCardsTC = (data: createCardsType ): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
         await cardsAPI.createCards(data)
        if (data.cardsPack_id){
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
        console.log(res)
        dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

//types
export type CardsPack = {
    cards: Card[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
}
export type Card = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    answer: string;
    question: string;
    grade: number;
    shots: number;
    comments: string;
    type: string;
    rating: number;
    more_id: string;
    created: string;
    updated: string;
    __v: number;
}

type InitialStateCardsType = typeof InitialStateCards

export type CardsActionType =
    | ReturnType<typeof setCards>
