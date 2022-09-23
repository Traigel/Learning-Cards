import React from 'react'
import {useFormik} from 'formik';
import styles from './ForgotPassword.module.css'
import {Navigate, NavLink} from 'react-router-dom';
import SuperInputText from '../../../common/components/superInputText/SuperInputText';
import SuperButton from '../../../common/components/superButton/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {forgotPasswordTC} from '../../login/auth-reducer';

type FormikErrorsType = {
    email?: string
}

export const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const forgotPasswordSuccess = useAppSelector(state => state.auth.forgotPasswordSuccess)

    const formik = useFormik({
        initialValues: {
            email: '',
            message: "<div>password recovery link: <a href='http://localhost:3000/#/new-password/$token$'>link</a></div>",
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(forgotPasswordTC(values))
            formik.resetForm()
        }
    })

    if (forgotPasswordSuccess) {
        return <Navigate to={'/checkEmail'}/>
    }

    return (
        <div className={styles.containerForm}>
            <h1 className={styles.forgotPasswordTitle}>Forgot your password?</h1>
            <div className={styles.mainContainer}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputSize}>
                        <SuperInputText
                            autoComplete="email"
                            placeholder="Email"
                            id={'email'}
                            type="text"
                            {...formik.getFieldProps('email')}
                        />
                    </div>
                    <div className={styles.errorConfirmPass}>
                        {formik.touched.email && formik.errors.email &&
                            <div className={styles.errorFormik}>{formik.errors.email}</div>}
                    </div>

                    <h4 className={styles.enterEmailTitle}>Enter your email address and we<br/> will send you further instructions </h4>
                    <div className={styles.bottomBlock}>
                        <SuperButton className={styles.buttonReg} type={'submit'}>send Instructions</SuperButton>
                        <h4 className={styles.rememberPasswordTitle}>Did you remember your password?</h4>
                        <NavLink to={'/login'} className={styles.tryToLoginTitle}>Try logging in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

