const initialState: TasksType = {}





export const appReducer = (state = initialState, action: TaskActionType): TasksType => {
    switch (action.type) {
        case 'app/set-error':
            return {...state, error: action.error}
        default:
            return state
    }
}
export const setAppErrorAC = (error: string | null) => ({type: 'app/set-error', error} as const)




// type
export type TasksType = {}
export type TaskActionType = ReturnType<typeof setAppErrorAC>