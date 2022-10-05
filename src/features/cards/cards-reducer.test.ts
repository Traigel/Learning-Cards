import {cardsReducer, InitialStateCardsType, setCards, setPackName, setPackUserID} from './cards-reducer';
import {CardsType} from '../../api/api';

let state: InitialStateCardsType
let cards: CardsType

beforeEach(() => {
    state = {
        cards: null as CardsType[] | null,
        packUserID: '',
        packName:  '',
    }
    cards = {
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
})

test('set pack user id', () => {
    const cardsReducer1 = cardsReducer(state, setPackUserID('5'))
    expect(cardsReducer1.packUserID).toBe('5')
})

test('set cards', () => {
    const cardsReducer1 = cardsReducer(state, setCards([cards]))
        expect(cardsReducer1.cards).toBe(1)
})

test('set pack name', () => {
    const cardsReducer1 = cardsReducer(state, setPackName('engy'))
        expect(cardsReducer1.packName).toBe('engy')
})

