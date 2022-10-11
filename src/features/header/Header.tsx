import React, {useRef, useState} from 'react'
import styles from './Header.module.css'
import logoImg from '../../assets/images/logo.png'
import userAvatar from '../../assets/images/userAvata.png'
import LinearProgress from '@mui/material/LinearProgress';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {SvgSelector} from "../../common/components/svgSelector/svgSelector";
import {logoutTC} from "../auth/auth-reducer";

export const Header = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const profileInfo = useAppSelector(state => state.auth.profile)

    const menuRef = useRef<HTMLInputElement>(null)
    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)

    const visibilityHandler = () => {
        setVisibilityValue(!visibilityValue)
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
        visibilityHandler()
    }

    const finalUserAvatar = profileInfo?.avatar ? profileInfo.avatar : userAvatar

    const onBlurMenuHandler = () => {
        console.log('onBlurMenuHandler')
    }

    const onFocusMenuHandler = () => {
        console.log('onFocusMenuHandler')
    }

    return (
        <header className={styles.headerBlock}>
            <div className={styles.headerContainer}>
                <NavLink to={`/login`}>
                    <div className={styles.imgBlock}>
                        <img src={logoImg} alt={'Logo'}/>
                    </div>
                </NavLink>
                <div style={{position: 'relative'}}>
                    {profileInfo &&
                        <div
                            className={styles.personInfoInHeader}
                            onClick={visibilityHandler}
                        >
                            <span className={styles.userNameIcon}>
                                {profileInfo.name}
                            </span>
                            <span className={styles.userAvatarIcon}>
                                <img className={styles.userAvatar}
                                     src={finalUserAvatar}
                                     alt={'user-avatar'}/>
                            </span>
                        </div>
                    }
                    {visibilityValue &&
                        <div className={styles.profileMenu}>
                            <div className={styles.pointer}></div>
                            <div className={styles.menu}>
                                <div>
                                    <NavLink
                                        to={'/'}
                                        className={styles.nav}
                                        onClick={visibilityHandler}
                                    >
                                        <SvgSelector svgName={"profile"}/> Profile
                                    </NavLink>
                                </div>
                                <div>
                                    <NavLink
                                        to={'/'}
                                        className={styles.nav}
                                        onClick={logoutHandler}
                                    >
                                        <SvgSelector svgName={"logOut"}/> Log out
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={styles.linear}>
                {status === 'loading' && <LinearProgress color="primary"/>}
            </div>
        </header>
    )
}

