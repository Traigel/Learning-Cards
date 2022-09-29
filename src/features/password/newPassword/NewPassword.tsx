import React, {useState} from 'react'
import {useFormik} from 'formik';
import styles from './NewPassword.module.css'
import {Navigate, NavLink, useParams} from 'react-router-dom';
import SuperInputText from '../../../common/components/superInputText/SuperInputText';
import SuperButton from '../../../common/components/superButton/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {EyeOnOff} from '../../../common/components/eyeOnOff/EyeOnOff';
import {createNewPasswordTC} from '../../login/auth-reducer';

type FormikErrorsType = {
    password?: string
}

export const NewPassword = () => {

    const newPasswordSuccess = useAppSelector(state => state.auth.newPasswordSuccess)

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
            if (values.password.length < 8) {
                errors.password = 'enter more than 7 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(createNewPasswordTC(values))
            formik.resetForm()
        }
    })

    if (newPasswordSuccess){
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.containerForm}>
            <h1 className={styles.newPasswordTitle}>Create new password</h1>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.inputSize}>
                        <SuperInputText
                            autoComplete="current-password"
                            placeholder="Password"
                            id={'password'}
                            type={passwordShow ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                        />
                    </div>
                    <div className={styles.errorConfirmPass}>
                        {formik.touched.password && formik.errors.password &&
                            <div className={styles.errorFormik}>{formik.errors.password}</div>}
                    </div>
                    <div className={styles.errorConfirmPass}>
                        <EyeOnOff className={styles.visibleEye} onClick={togglePassword} onOff={passwordShow}/>
                    </div>
                    <h4 className={styles.instructionText}>Create new password and we will send you<br/> further instructions to email</h4>
                    <div className={styles.bottomBlock}>
                        <SuperButton className={styles.buttonReg} type={'submit'}>Create new password</SuperButton>
                        <h4 className={styles.rememberPasswordTitle}>Did you remember your password?</h4>
                        <NavLink to={'/login'} className={styles.tryToLoginTitle}>Try Logging in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

