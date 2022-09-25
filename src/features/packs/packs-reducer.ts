import {AppThunk} from "../../app/store";
import {packsAPI, PackType} from "../../api/api";

const initialState = {
    packs: null as PackType[] | null,
	page: null as number | null,
	pageCount: null as number | null,
	cardPacksTotalCount: null as number | null,
	minCardsCount: null as number | null,
	maxCardsCount: null as number | null,
	token: null as string | null,
	tokenDeathTime: null as number | null
}

export const packsReducer = (state = initialState, action: PacksActionsType): InitialAuthStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS-DATA':
            return {...state, packs: action.data}
        default:
            return state
    }
}

//action creators
export const setPacksDataAC = (data: PackType[]) => ({type: 'PACKS/SET-PACKS-DATA', data} as const)

//thunks

export const setCardsTC = (): AppThunk => async (dispatch, getState) => {
	try {
		const res = await packsAPI.getPacks()
		dispatch(setPacksDataAC(res.data.cardPacks))
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