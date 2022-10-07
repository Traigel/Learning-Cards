import React from 'react'
import styles from './CheckEmail.module.css'
import SuperButton from '../../../../common/components/superButton/SuperButton';
import checkEmail from '../../../../assets/images/checkemail.png'
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../../common/hooks/hooks';

export const CheckEmail = () => {

    const email = useAppSelector(s => s.auth.forgetEmail)

    return (
        <div className={styles.containerCheckForm}>
            <h2 className={styles.title}>Check Email</h2>
            <div className={styles.checkBox}>
                <div className={styles.checkEmail}>
                    <img src={checkEmail} alt={'check'}/>
                </div>
                <div className={styles.dontHaveAccountTitle}>
                    <div className={styles.instructionsTitle}>
                        We’ve sent an Email with instructions to
                    </div>
                    <div className={styles.emailAddressTitle}>
                        {email}
                    </div>
                </div>
                <div className={styles.buttonForm}>
                    <NavLink to={'/login'}>
                        <SuperButton type="submit">Back to Login</SuperButton>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}
