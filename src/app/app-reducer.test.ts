import {appReducer, InitialAppStateType, setAppErrorAC, setAppStatusAC, setIsInitializedAC} from "./app-reducer";

let state: InitialAppStateType
beforeEach(() => {
    state = {
        status: 'idle',
        isInitialized: false,
        error: null,
    }
})

test('set status', () => {
    const appReducer1 = appReducer(state, setAppStatusAC("loading"))
    expect(appReducer1.status).toBe("loading")
})

test('set in initialized', () => {
    const appReducer1 = appReducer(state, setIsInitializedAC(true))
    expect(appReducer1.isInitialized).toBe(true)
})

test('set error', () => {
    const appReducer1 = appReducer(state, setAppErrorAC('Error messages'))
    expect(appReducer1.error).toBe('Error messages')
})
