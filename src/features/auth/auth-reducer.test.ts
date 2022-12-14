import {
    authReducer,
    forgotPasswordSuccess,
    InitialAuthStateType, newPasswordSuccess,
    ProfileType,
    setDataForgetPassword,
    setIsLoggedInOutAC,
    setUserInfoAC
} from './auth-reducer';

let state: InitialAuthStateType
let userInfo: ProfileType

beforeEach(() => {
    state = {
        isLoggedIn: false,
        profile: userInfo,
        forgotPasswordSuccess: false,
        forgetEmail: null,
        newPasswordSuccess: false,
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

test('forgot password success', () => {
    const forgotPass = authReducer(state, forgotPasswordSuccess(true))
    expect(forgotPass.forgotPasswordSuccess).toBe(true)
})

test('set data email', () => {
    const setDataEmail = authReducer(state, setDataForgetPassword('hello@gmail.com'))
    expect(setDataEmail.forgetEmail).toBe('hello@gmail.com')
})

test('set new password', () => {
    const newPass = authReducer(state, newPasswordSuccess(true))
    expect(newPass.newPasswordSuccess).toBe(true)
})
