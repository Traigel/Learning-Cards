import {InitialStateType, registerReducer, setIsRegistrationSuccess} from './register-reducer';


let state: InitialStateType

beforeEach(() => {
    state = {
        registerSuccess: false,
    }
})

test('register success', () => {
    const regUser = registerReducer(state, setIsRegistrationSuccess(true))
    expect(regUser.registerSuccess).toBe(true)
})

