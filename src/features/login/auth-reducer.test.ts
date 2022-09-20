import {authReducer, setIsLoggedInAC, InitialAuthStateType, setUserInfoAC, ProfileType, setIsRegistrationSuccess} from './auth-reducer';

let state: InitialAuthStateType
let userInfo: {
    profile: ProfileType
}

beforeEach(() => {
    state = {
        isLoggedIn: false,
        profile: null,
        registerSuccess: false,
        forgotPasswordSuccess: false,
        forgetEmail: null
    }
    userInfo = {
        profile: {
            name: 'Vladimir',
            email: 'hello@gmail.com',
            publicCardPacksCount: 3,
            avatar: '',
            _id: '',
            __v: 0,
            created: '',
            isAdmin: false,
            rememberMe: false,
            token: '',
            tokenDeathTime: 0,
            updated: '',
            verified: false,
        }
    }
})

test('set is logged in', () => {
    const authReducer1 = authReducer(state, setIsLoggedInAC(true))
    expect(authReducer1.isLoggedIn).toBe(true)
})

test('set user info', () => {
    const authReducer1 = authReducer(state, setUserInfoAC(userInfo.profile))
    expect(authReducer1.profile?.name).toBe('Vladimir')
    expect(authReducer1.profile?.email).toBe('hello@gmail.com')
    expect(authReducer1.profile?.publicCardPacksCount).toBe(3)
})

test('register success', () => {
    const regUser = authReducer(state, setIsRegistrationSuccess(true))
    expect(regUser.registerSuccess).toBe(true)
})
