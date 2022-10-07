import React from 'react';
import SuperInputText from "../../../common/components/superInputText/SuperInputText";
import styles from "../../registration/Registration.module.css";
import SuperButton from "../../../common/components/superButton/SuperButton";
import {useFormik} from "formik";
import {useAppDispatch} from "../../../common/hooks/hooks";
import {addNewPackTC} from "../packs-reducer";

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
            <h3>Add new Pack</h3>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    placeholder="pack name here"
                    type={'text'}
                    {...formik.getFieldProps('packName')}
                />
                <div className={styles.errorConfirmPass}>
                    {formik.touched.packName && formik.errors.packName &&
                        <div className={styles.errorFormik}>{formik.errors.packName}</div>}
                </div>
                <SuperButton onClick={props.handleClose} type={'reset'}>Cansel</SuperButton>
                <SuperButton type={'submit'}>add new Pack</SuperButton>
            </form>
        </div>
    );
};

