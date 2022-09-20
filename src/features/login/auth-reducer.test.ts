import {authReducer, setIsLoggedInOutAC, InitialAuthStateType, setUserInfoAC, ProfileType} from "./auth-reducer";

let state: InitialAuthStateType
let userInfo: ProfileType

beforeEach(() => {
    state = {
        isLoggedIn: false,
        profile: userInfo
    }
    userInfo = {
        _id: '123',
        email: 'hello@gmail.com',
        rememberMe: false,
        isAdmin: false,
        name: 'Vladimir',
        verified: false,
        publicCardPacksCount: 3,
        created: '',
        updated: '',
        __v: 312,
        token: '',
        tokenDeathTime: 123,
        avatar: ''
    }
})

test('set is logged in', () => {
    const authReducer1 = authReducer(state, setIsLoggedInOutAC(true))
    expect(authReducer1.isLoggedIn).toBe(true)
})

test('set is logged out', () => {
    const authReducer1 = authReducer(state, setIsLoggedInOutAC(false))
    expect(authReducer1.isLoggedIn).toBe(false)
})

test('set user info', () => {
    const authReducer1 = authReducer(state, setUserInfoAC(userInfo))
    if (authReducer1.profile) {
        expect(authReducer1.profile.name).toBe('Vladimir')
        expect(authReducer1.profile.email).toBe('hello@gmail.com')
        expect(authReducer1.profile.publicCardPacksCount).toBe(3)
    }
})