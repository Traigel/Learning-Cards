import React from 'react'
import styles from './Header.module.css'
import SuperButton from "../../common/components/superButton/SuperButton";
import logoImg from '../../assets/image/logo.png'
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../../app/store";

export const Header = () => {

    const status = useAppSelector(state => state.app.status)

    return (
        <div className={styles.headerBlock}>
            <div className={styles.headerContainer}>
                <div className={styles.imgBlock}>
                    <img src={logoImg} alt={'Logo'}/>
                </div>
                <div>
                    <SuperButton className={styles.buttonIn}>Sign in</SuperButton>
                </div>
            </div>
            <div className={styles.linear}>
                {status === 'loading' && <LinearProgress color="inherit"/>}
            </div>
        </div>
    )
}

