import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {TaskActionType, tasksReducer} from "../reducers/tasks-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

type AppActionsType = TaskActionType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

export type AppRootStateType = ReturnType<typeof rootReducer>