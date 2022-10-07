import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from './app-reducer';
import {AuthActionsType, authReducer} from '../features/auth/auth-reducer';
import {cardsReducer} from '../features/cards/cards-reducer';
import {PacksActionsType, packsReducer} from '../features/packs/packs-reducer';
import {CardsActionType} from '../features/cards/cards-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    cards: cardsReducer,
    packs: packsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// типизация state
export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для всего приложения
export type AppRootActionsType = AppActionType | AuthActionsType | CardsActionType | PacksActionsType

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// типизация dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>