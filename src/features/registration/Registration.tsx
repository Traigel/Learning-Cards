import React, {useState} from 'react'
import SuperInputText from '../../common/components/superInputText/SuperInputText';
import {useFormik} from 'formik';
import s from './Registration.module.css'
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
    const registerSuccess = useAppSelector(state => state.auth.registerSuccess)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)

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
                errors.email = 'required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 3) {
                errors.password = 'enter more than 3 symbols'
            }
            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'Passwords do not match'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registerTC(values))
            formik.resetForm()
        }
    })

    if (!isLoggedIn && registerSuccess) {
        return <Navigate to={'/login'}/>
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <div className={s.containerForm}>

        <h1 className={s.signUp}>Sign Up</h1>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.inputSize}>
                    <SuperInputText
                        autoComplete="email"
                        placeholder="Email"
                        id={'email'}
                        type="text"
                        {...formik.getFieldProps('email')}
                    />
                </div>
                <div className={s.errorConfirmPass}>
                    {formik.touched.email && formik.errors.email &&
                        <div className={s.errorFormik}>{formik.errors.email}</div>}
                </div>

                <div className={s.inputSize}>
                    <SuperInputText
                        autoComplete="current-password"
                        placeholder="Password"
                        id={'password'}
                        type={passwordShow ? 'text' : 'password'}
                        {...formik.getFieldProps('password')}
                    />
                </div>
                <div className={s.errorConfirmPass}>
                    {formik.touched.password && formik.errors.password &&
                        <div className={s.errorFormik}>{formik.errors.password}</div>}
                </div>
                <div className={s.inputSize}>
                    <SuperInputText
                        autoComplete="current-password"
                        placeholder="confirmPassword"
                        id={'confirmPassword'}
                        type={confirmPasswordShow ? 'text' : 'password'}
                        {...formik.getFieldProps('confirmPassword')}
                    />
                </div>
                <div className={s.errorConfirmPass}>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                        <div className={s.errorFormik}>{formik.errors.confirmPassword}</div>}
                </div>
                <div className={s.errorConfirmPass}>

                    <EyeOnOff className={s.visibleEye} onClick={togglePassword} onOff={passwordShow}/>
                </div>
                <div>
                    <EyeOnOff className={s.visibleConfirmEye} onClick={toggleConfirmPassword}
                              onOff={confirmPasswordShow}/>
                </div>
                <div className={s.bottomBlock}>
                    <SuperButton className={s.buttonReg} type={'submit'}>confirm</SuperButton>
                    <h5>Already have an account?</h5>
                    <NavLink to={'/login'}>Sign In</NavLink>
                </div>
            </form>
        </div>


    </div>
}

