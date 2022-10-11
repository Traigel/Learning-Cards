import {
    cardsReducer,
    InitialStateCardsType,
    setCardsDataAC,
    setUrlCardsParamsAC,
    UrlCardsParamsType
} from './cards-reducer';
import {CardsType, ResponseCardsType} from '../../api/api';
import {UrlParamsType} from "../packs/packs-reducer";

let state: InitialStateCardsType
let newDataCards: ResponseCardsType
let params: UrlCardsParamsType

beforeEach(() => {
    state = {
        cards: [
            {
                _id: '2',
                cardsPack_id: '11',
                user_id: '5',
                answer: 'jj',
                question: 'what are you doing men?',
                grade: 0,
                shots: 0,
                comments: 'comment',
                type: '',
                rating: 0,
                more_id: '',
                created: '',
                updated: '',
                __v: 0,
            }
        ],
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
        }
    }
    newDataCards = {
        cards: [
            {
                _id: '3',
                cardsPack_id: '12',
                user_id: '10',
                answer: 'jj',
                question: 'what are you doing men?',
                grade: 0,
                shots: 0,
                comments: 'comment',
                type: '',
                rating: 0,
                more_id: '',
                created: '',
                updated: '',
                __v: 0,
            }
        ],
        packUserId: '12',
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
    }
    params = {
        cardsPack_id: '',
        page: '2',
        pageCount: '10',
        cardQuestion: ''
    }
})

test('set cards data', () => {
    const cardsReducerTest = cardsReducer(state, setCardsDataAC(newDataCards))
    expect(cardsReducerTest.packUserId).toBe('12')
})

test('set cards', () => {
    const cardsReducerTest = cardsReducer(state, setUrlCardsParamsAC(params))
    expect(cardsReducerTest.params.page).toBe('2')
    expect(cardsReducerTest.params.pageCount).toBe('10')
})
