import React from 'react'
import {useFormik} from 'formik';
import styles from './ForgotPassword.module.css'
import {Navigate, NavLink} from 'react-router-dom';
import SuperInputText from '../../../../common/components/superInputText/SuperInputText';
import SuperButton from '../../../../common/components/superButton/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';
import {forgotPasswordTC} from '../../auth-reducer';

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
        <div className={styles.ForgotPasBlock}>
            <h2 className={styles.title}>Forgot your password?</h2>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder="Email"
                        {...formik.getFieldProps('email')}
                    />
                    <div className={styles.error}>
                        {formik.touched.email && formik.errors.email && formik.errors.email}
                    </div>
                </div>
                <div className={styles.dontHaveAccountTitle}>
                    Enter your email address and we will send you further instructions
                </div>
                <div className={styles.buttonForm}>
                    <SuperButton type="submit">Send Instructions</SuperButton>
                </div>
                <div className={styles.dontHaveAccountTitle}>
                    Did you remember your password?
                </div>
                <NavLink to={'/login'} className={styles.signForgotPas}>Sign Up</NavLink>
            </form>
        </div>
    )
}

