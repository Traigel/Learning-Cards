import React, {useState} from 'react'
import styles from './Header.module.css'
import logoImg from '../../assets/images/logo.png'
import LinearProgress from '@mui/material/LinearProgress';
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import {SvgSelector} from "../../common/components/svgSelector/svgSelector";
import {logoutTC} from "../login/auth-reducer";

export const Header = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const profileInfo = useAppSelector(state => state.auth.profile)

    const [visibilityValue, setVisibilityValue] = useState<boolean>(false)

    const visibilityHandler = () => {
        setVisibilityValue(!visibilityValue)
    }

    const logoutHandler = () => {
        dispatch(logoutTC())
        visibilityHandler()
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
                                     src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                                     alt='user-avatar'/>
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
                {status === 'loading' && <LinearProgress color="inherit"/>}
            </div>
        </header>
    )
}

