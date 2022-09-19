import {AppRootStateType} from "../../app/store";
import {ProfileType} from "./auth-reducer";

export const getIsLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn
export const getProfileInfo = (state: AppRootStateType): ProfileType | null => state.auth.profile

