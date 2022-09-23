import React from 'react'
import styles from './Header.module.css'
import SuperButton from "../../common/components/superButton/SuperButton";
import logoImg from '../../assets/image/logo.png'
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../../app/store";
import {NavLink} from "react-router-dom";

export const Header = () => {

    const status = useAppSelector(state => state.app.status)
    const profileInfo = useAppSelector(state => state.auth.profile)

    return (
        <div className={styles.headerBlock}>
            <div className={styles.headerContainer}>
                <div className={styles.imgBlock}>
                    <img src={logoImg} alt={'Logo'}/>
                </div>
                <div>
                    {profileInfo &&
                        <div className={styles.personInfoInHeader}>
                            <span className={styles.userNameIcon}>
                                <NavLink to={'/'} className={styles.goToProfileTitle}>{profileInfo.name}</NavLink>
                            </span>
                            <span className={styles.userAvatarIcon}>
                                <img className={styles.userAvatar}
                                     src='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                                     alt='user-avatar'/>
                            </span>
                        </div>
                    }
                    {/*<SuperButton className={styles.buttonIn}>Sign in</SuperButton>*/}
                </div>
            </div>
            <div className={styles.linear}>
                {status === 'loading' && <LinearProgress color="inherit"/>}
            </div>
        </div>
    )
}

