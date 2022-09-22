import React from 'react'
import s from './CheckEmail.module.css'
import SuperButton from '../../../common/components/superButton/SuperButton';
import checkEmail from '../../../assets/image/checkemail.png'
import {NavLink} from 'react-router-dom';
import {useAppSelector} from '../../../common/hooks/hooks';


export const CheckEmail = () => {

const email = useAppSelector(s=>s.auth.forgetEmail)

    return <div className={s.containerForm}>
        <h1 className={s.signUp}>Check Email</h1>
        <div>

            <div className={s.checkEmail}>
                <img src={checkEmail} alt={'check'} />
            </div>

            <div className={s.mail}>
                <span >{`We’ve sent an Email with instructions to  ${email}`}</span>
            </div>

            <div className={s.bottomBlock}>
                <NavLink to={'/login'}><SuperButton className={s.buttonReg} type={'submit'}>Back to login</SuperButton></NavLink>
            </div>
        </div>
    </div>
}
