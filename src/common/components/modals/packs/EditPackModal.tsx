import React from 'react';
import {useAppDispatch} from "../../../hooks/hooks";
import {useFormik} from "formik";
import {changePackTC} from "../../../../features/packs/packs-reducer";
import SuperButton from "../../superButton/SuperButton";
import SuperInputText from "../../superInputText/SuperInputText";
import {SvgSelector} from "../../svgSelector/svgSelector";
import styles from '../Modal.module.css'

type EditPackModalPropsType = {
    handleClose: () => void
    packId: string
    packName: string
}

type FormikErrorsType = {
    newPackName?: string
}

export const EditPackModal = (props: EditPackModalPropsType) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            newPackName: props.packName
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (!values.newPackName) {
                errors.newPackName = 'required'
            }
            if (values.newPackName.length > 40) {
                errors.newPackName = 'your pack name is too long'
            }
            if (values.newPackName === props.packName) {
                errors.newPackName = 'your new pack name is the same'
            }
            return errors
        },
        onSubmit: values => {
            formik.resetForm()
            props.handleClose()
            dispatch(changePackTC({_id: props.packId, name: values.newPackName}))
        }
    })

    return (
        <div>
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Edit pack</h2>
                <div onClick={props.handleClose}>
                    <SvgSelector svgName='cross'/>
                </div>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'Name pack'}
                        {...formik.getFieldProps('newPackName')}
                    />
                    <div className={styles.error}>
                        {formik.touched.newPackName && formik.errors.newPackName && formik.errors.newPackName}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <SuperButton className={styles.oneButton} onClick={props.handleClose} >Cancel</SuperButton>
                    <SuperButton className={styles.twoButton}>Save</SuperButton>
                </div>
            </form>
        </div>
    );
};
