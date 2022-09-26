import {AppThunk} from "../../app/store";
import {packsAPI, PackType, ResponsePacksType} from "../../api/api";

const initialState = {
	cardPacks: null as PackType[] | null,
	page: null as number | null,
	pageCount: null as number | null,
	cardPacksTotalCount: null as number | null,
	minCardsCount: 0,
	maxCardsCount: 0,
	token: null as string | null,
	tokenDeathTime: null as number | null
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...action.data}
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: ResponsePacksType) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

//thunks

export const setCardsTC = (): AppThunk => async (dispatch, getState) => {
	try {
		const res = await packsAPI.getPacks()
		dispatch(setPacksDataAC(res.data))
	}
	catch (e) {
		console.log('catch')
	}
}

// export const loginTC = (data: LoginParamsType): AppThunk => async (dispatch) => {
//     dispatch(setAppStatusAC("loading"))
//     try {
//         const res = await authAPI.login(data)
//         dispatch(setIsLoggedInOutAC(true))
//         dispatch(setUserInfoAC(res.data))
//     } catch (e) {
//         errorHandlerUtil(e, dispatch)
//     } finally {
//         dispatch(setAppStatusAC("idle"))
//     }
// }


//type
export type InitialAuthStateType = typeof initialState

export type PacksActionsType =
    | ReturnType<typeof setPacksDataAC>