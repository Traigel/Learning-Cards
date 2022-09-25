import {authAPI, cardsAPI, LoginParamsType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {setAppStatusAC} from '../../../app/app-reducer';
import {errorHandlerUtil} from '../../../common/utils/errors-utils';
import {setIsLoggedInOutAC, setUserInfoAC} from '../../login/auth-reducer';

const InitialStateCards = {
    cardsPack: null as CardsPack | null
}


export const cardsReducer = (state = InitialStateCards, action: CardsActionType) => {

    switch (action.type) {
        case 'CARDS/SET-CARDS':
            if (action.data) {
                return {
                    ...state,
                    cardsPack: {...action.data}
                }
            } else return {...state, cardsPack: null}
        default:
            return state
    }
}

//action creators
export const setCards = (data: CardsPack | null) => ({type: 'CARDS/SET-CARDS', data})



//thunks
export const setCardsTC = (packID: string ): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    try {
        const res = await cardsAPI.getCards(packID)
        console.log(res)
    } catch (e) {
        errorHandlerUtil(e, dispatch)
    } finally {
        dispatch(setAppStatusAC("idle"))
    }
}




//types
export type CardsPack = {
    cards: CardsPackCard[];
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
export type CardsPackCard = {
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
    answerImg: string;
    answerVideo: string;
    questionImg: string;
    questionVideo: string;
}

export type CardsActionType = ReturnType<typeof setCards>
