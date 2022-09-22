import {
    authReducer,
    forgotPasswordSuccess,
    InitialAuthStateType,
    ProfileType,
    setDataForgetPassword,
    setIsLoggedInOutAC,
    setIsRegistrationSuccess,
    setUserInfoAC
} from './auth-reducer';

let state: InitialAuthStateType
let userInfo: ProfileType

beforeEach(() => {
    state = {
        isLoggedIn: false,
        profile: userInfo,
        registerSuccess: false,
        forgotPasswordSuccess: false,
        forgetEmail: null
    }
    userInfo = {
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
test('register success', () => {
    const regUser = authReducer(state, setIsRegistrationSuccess(true))
    expect(regUser.registerSuccess).toBe(true)
})
test('forgot password success', () => {
    const forgotPass = authReducer(state, forgotPasswordSuccess(true))
    expect(forgotPass.forgotPasswordSuccess).toBe(true)
})
test('set data email', () => {
    const setDataEmail = authReducer(state, setDataForgetPassword('hello@gmail.com'))
    expect(setDataEmail.forgetEmail).toBe('hello@gmail.com')
})
