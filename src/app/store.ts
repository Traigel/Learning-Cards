import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/login/auth-reducer";
import {cardsReducer} from '../features/table/cards/cards-reducer';
import {PacksActionsType, packsReducer} from "../features/packs/packs-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    cards: cardsReducer,
    packs: packsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для всего приложения
export type AppRootActionsType = AppActionType | AuthActionsType |  PacksActionsType

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// типизация dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>