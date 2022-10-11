import React from 'react';
import SuperInputText from "../../superInputText/SuperInputText";
import styles from '../Modal.module.css'
import SuperButton from "../../superButton/SuperButton";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../hooks/hooks";
import {addNewPackTC} from "../../../../features/packs/packs-reducer";
import {SvgSelector} from "../../svgSelector/svgSelector";

type AddNewPackModalPropsType = {
    handleClose: () => void
}

type FormikErrorsType = {
    packName?: string
}

export const AddNewPackModal = (props: AddNewPackModalPropsType) => {

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            packName: ''
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (values.packName.length < 1) {
                errors.packName = 'enter pack name'
            }
            if (values.packName.length > 40) {
                errors.packName = 'your pack name is too long'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(addNewPackTC({name: values.packName}))
            formik.resetForm()
            props.handleClose()
        }
    })

    return (
        <div>
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Add new pack</h2>
                <div onClick={props.handleClose}>
                    <SvgSelector svgName='cross'/>
                </div>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'Name pack'}
                        {...formik.getFieldProps('packName')}
                    />
                    <div className={styles.error}>
                        {formik.touched.packName && formik.errors.packName && formik.errors.packName}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <SuperButton className={styles.oneButton} onClick={props.handleClose}
                                 type={'reset'}>Cancel</SuperButton>
                    <SuperButton className={styles.twoButton} type={'submit'}>Save</SuperButton>
                </div>
            </form>
        </div>
    );
};

