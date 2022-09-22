import React from 'react'
import {useFormik} from 'formik';
import s from './ForgotPassword.module.css'
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
            message: "<div> password recovery link: <a href='http://localhost:3000/new-password/$token$'>link</a></div>",
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.email) {
                errors.email = 'required'
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

    return <div className={s.containerForm}>
        <h1 className={s.signUp}>Forgot your password?</h1>
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

                <h6>Enter your email address and we will send you further instructions </h6>
                <div className={s.bottomBlock}>
                    <SuperButton className={s.buttonReg} type={'submit'}>Send Instructions</SuperButton>
                    <h5>Did you remember your password?</h5>
                    <NavLink to={'/login'}>Try logging in</NavLink>
                </div>
            </form>
        </div>
    </div>
}

