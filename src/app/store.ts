import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {appReducer, AppActionType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/login/auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для всего приложения
type AppRootActionsType = AppActionType | AuthActionsType

//типизация санки если она возвращает другую санку
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppRootActionsType>

// типизация dispatch (везде применять useAppDispatch)
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>
export const useAppDispatch: () => AppDispatch = useDispatch

//типизация selector (везде применять useAppSelector)
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector