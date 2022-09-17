const initialState: InitialStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        default:
            return state
    }
}

//action
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

//thunks



//type
type InitialStateType = {
    isLoggedIn: boolean
}
export type  SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
export type AuthActionsType = SetIsLoggedInType