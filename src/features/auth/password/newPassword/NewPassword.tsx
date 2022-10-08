import React, {useState} from 'react'
import {useFormik} from 'formik';
import styles from './NewPassword.module.css'
import {Navigate, NavLink, useParams} from 'react-router-dom';
import SuperInputText from '../../../../common/components/superInputText/SuperInputText';
import SuperButton from '../../../../common/components/superButton/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../../common/hooks/hooks';
import {EyeOnOff} from '../../../../common/components/eyeOnOff/EyeOnOff';
import {createNewPasswordTC} from '../../auth-reducer';

type FormikErrorsType = {
    password?: string
}

export const NewPassword = () => {

    const newPasswordSuccess = useAppSelector(state => state.auth.newPasswordSuccess)

    const [eyeOnOff, setEyeOnOff] = useState<boolean>(false)
    const onClickHandler = () => setEyeOnOff(!eyeOnOff)

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

    if (newPasswordSuccess) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={styles.containerNewPasForm}>
            <h2 className={styles.title}>Create new password</h2>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
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
                <div className={styles.instructionText}>
                    Create new password and we will send you further instructions to email
                </div>
                <div className={styles.buttonForm}>
                    <NavLink to={'/login'}>
                        <SuperButton type="submit">Create new password</SuperButton>
                    </NavLink>
                </div>
            </form>
        </div>
    )
}

