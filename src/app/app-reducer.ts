const initialState: TasksType = {}

export const appReducer = (state = initialState, action: AppActionType): TasksType => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default:
            return state
    }
}

// type
export type TasksType = {}
export type AppActionType = {type: 'XXX'}