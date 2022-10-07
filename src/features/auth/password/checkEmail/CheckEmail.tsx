import React from 'react'
import styles from './CheckEmail.module.css'
import SuperButton from '../../../../common/components/superButton/SuperButton';
import checkEmail from '../../../../assets/images/checkemail.png'
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../../common/hooks/hooks';

export const CheckEmail = () => {

    const email = useAppSelector(s => s.auth.forgetEmail)

    return (
        <div className={styles.containerForm}>
            <h1 className={styles.checkMailTitle}>Check Email</h1>
            <div>
                <div className={styles.checkEmail}>
                    <img src={checkEmail} alt={'check'}/>
                </div>
                <div className={styles.mail}>
                    <span className={styles.instructionsTitle}>We’ve sent an Email with instructions to </span>
                    <span className={styles.emailAddressTitle}>{email}</span>
                </div>
                <div className={styles.bottomBlock}>
                    <NavLink to={'/login'}>
                        <SuperButton className={styles.buttonReg} type={'submit'}>Back to Login</SuperButton>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
