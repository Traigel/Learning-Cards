import React, {useState} from 'react'
import SuperInputText from '../../common/components/superInputText/SuperInputText';
import {useFormik} from 'formik';
import styles from './Registration.module.css'
import SuperButton from '../../common/components/superButton/SuperButton';
import {Navigate, NavLink} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {EyeOnOff} from '../../common/components/eyeOnOff/EyeOnOff';
import {registerTC} from '../login/auth-reducer';

type FormikErrorsType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    }

    const toggleConfirmPassword = () => {
        setConfirmPasswordShow(!confirmPasswordShow);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 8) {
                errors.password = 'enter more than 7 symbols'
            }
            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'passwords do not match'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
            setIsRegistrationSuccess(true)
        }
    })

    if (isRegistrationSuccess) {
        return <Navigate to={'/login'}/>
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.signUpTitle}>Sign Up</h2>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        autoComplete="email"
                        placeholder="Email"
                        id={'email'}
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                    <div className={styles.error}>
                        {formik.touched.email && formik.errors.email && formik.errors.email}
                    </div>
                </div>
                <div className={styles.inputForm}>
                    <SuperInputText
                        autoComplete="current-password"
                        placeholder="Password"
                        id={'password'}
                        type={passwordShow ? 'text' : 'password'}
                        {...formik.getFieldProps('password')}
                    />
                    <EyeOnOff
                        onClick={togglePassword}
                        onOff={passwordShow}
                        className={styles.eye}
                    />
                    <div className={styles.error}>
                        {formik.touched.password && formik.errors.password && formik.errors.password}
                    </div>
                </div>
                <div className={styles.inputForm}>
                    <SuperInputText
                        autoComplete="current-password"
                        placeholder="confirm Password"
                        id={'confirmPassword'}
                        type={confirmPasswordShow ? 'text' : 'password'}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    <EyeOnOff
                        onClick={toggleConfirmPassword}
                        onOff={confirmPasswordShow}
                        className={styles.eye}
                    />
                    <div className={styles.error}>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && formik.errors.confirmPassword}
                    </div>
                </div>
                <div className={styles.buttonForm}>
                    <SuperButton type="submit">Sign Up</SuperButton>
                </div>
                <div className={styles.dontHaveAccountTitle}>
                    Already have an account?
                </div>
                <NavLink to={'/login'} className={styles.signInTitle}>Sign In</NavLink>
            </form>
        </div>
    )
}

