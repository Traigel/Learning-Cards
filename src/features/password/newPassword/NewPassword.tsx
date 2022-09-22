import React, {useState} from 'react'
import {useFormik} from 'formik';
import s from './NewPassword.module.css'
import {NavLink, useParams} from 'react-router-dom';
import SuperInputText from '../../../common/components/superInputText/SuperInputText';
import SuperButton from '../../../common/components/superButton/SuperButton';
import {useAppDispatch} from '../../../common/hooks/hooks';
import {EyeOnOff} from '../../../common/components/eyeOnOff/EyeOnOff';
import {createNewPasswordTC} from '../../login/auth-reducer';

type FormikErrorsType = {
    password?: string
}

export const NewPassword = () => {

    const [passwordShow, setPasswordShow] = useState(false)
    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    }
    const params = useParams()
    const token = params.token
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: token,
        },

        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (values.password.length < 3) {
                errors.password = 'enter more than 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(createNewPasswordTC(values))
            formik.resetForm()
        }
    })
    console.log(token)
    return <div className={s.containerForm}>
        <h1 className={s.signUp}>Create new password</h1>
        <div>
            <form onSubmit={formik.handleSubmit}>
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
                <div className={s.errorConfirmPass}>

                    <EyeOnOff className={s.visibleEye} onClick={togglePassword} onOff={passwordShow}/>
                </div>
                <h6>Create new password and we will send you further instructions to email</h6>
                <div className={s.bottomBlock}>
                    <SuperButton className={s.buttonReg} type={'submit'}>Create new password</SuperButton>
                    <h5>Did you remember your password?</h5>
                    <NavLink to={'/login'}>Try logging in</NavLink>
                </div>
            </form>
        </div>
    </div>
}

