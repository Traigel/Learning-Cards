import {authReducer, setIsLoggedInAC, InitialAuthStateType, setUserInfoAC} from "./auth-reducer";

let state: InitialAuthStateType
let userInfo: {
    id: string
    email: string
    name: string
    publicCardPacksCount: number
    avatar: string
}

beforeEach(() => {
    state = {
        isLoggedIn: false,
        _id: null,
        name: null,
        email: null,
        publicCardPacksCount: 0, // количество колод
        avatar: null
    }
    userInfo = {
        id: '123',
        name: 'Vladimir',
        email: 'hello@gmail.com',
        publicCardPacksCount: 3,
        avatar: ''
    }
})

test('set is logged in', () => {
    const authReducer1 = authReducer(state, setIsLoggedInAC(true))
    expect(authReducer1.isLoggedIn).toBe(true)
})

test('set user info', () => {
    const authReducer1 = authReducer(state, setUserInfoAC(userInfo.id, userInfo.email, userInfo.name,
        userInfo.publicCardPacksCount, userInfo.avatar))
    expect(authReducer1.name).toBe('Vladimir')
    expect(authReducer1.email).toBe('hello@gmail.com')
    expect(authReducer1.publicCardPacksCount).toBe(3)
})