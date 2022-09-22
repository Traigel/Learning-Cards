import React, {useState} from 'react'
import styles from './Login.module.css'
import SuperInputText from "../../common/components/superInputText/SuperInputText";
import SuperCheckbox from "../../common/components/superCheckbox/SuperCheckbox";
import SuperButton from "../../common/components/superButton/SuperButton";
import {useFormik} from 'formik';
import {EyeOnOff} from "../../common/components/eyeOnOff/EyeOnOff";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";

export const Login = () => {

    const [eyeOnOff, setEyeOnOff] = useState<boolean>(false)
    const onClickHandler = () => setEyeOnOff(!eyeOnOff)

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: values => {           //валидация, обработка ошибок
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Error email'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 8) {
                errors.password = 'Password must be more than 7 characters'
            }
            return errors
        },
        onSubmit: values => {           // handleSubmit
            dispatch(loginTC(values))
            formik.resetForm();
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={styles.loginBlock}>
            <div className={styles.loginContainer}>
                <div className={styles.title}>
                    Sign in
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputForm}>
                        <SuperInputText
                            placeholder={'Email'}
                            {...formik.getFieldProps('email')}
                        />
                        <div className={styles.error}>
                            {formik.touched.email && formik.errors.email && formik.errors.email}
                        </div>
                    </div>
                    <div className={styles.inputForm}>
                        <SuperInputText
                            placeholder={'Password'}
                            type={eyeOnOff ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                        />
                        <EyeOnOff
                            onClick={onClickHandler}
                            onOff={eyeOnOff}
                            className={styles.eye}
                        />
                        <div className={styles.error}>
                            {formik.touched.password && formik.errors.password && formik.errors.password}
                        </div>
                    </div>
                    <div className={styles.checkedForm}>
                        <SuperCheckbox
                            checked={formik.values.rememberMe}
                            children={'Remember me'}
                            {...formik.getFieldProps('rememberMe')}
                        />
                    </div>
                    <div className={styles.forPass}>
                        <NavLink to={'/forgot'}>Forgot Password?</NavLink>
                    </div>
                    <div className={styles.buttonForm}>
                        <SuperButton type="submit">Sign in</SuperButton>
                    </div>
                    <div>
                        Already have an account?
                    </div>
                    <NavLink to={'/register'}>Sign Up</NavLink>
                </form>
            </div>

        </div>
    )
}

//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
