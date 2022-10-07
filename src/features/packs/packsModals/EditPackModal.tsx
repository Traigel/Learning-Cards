import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {changePackTC} from "../packs-reducer";
import styles from "../../registration/Registration.module.css";
import SuperButton from "../../../common/components/superButton/SuperButton";
import TextField from "@mui/material/TextField";
import SuperInputText from "../../../common/components/superInputText/SuperInputText";

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
                dispatch(changePackTC({_id: props.packId, name: values.newPackName}))
                formik.resetForm()
                props.handleClose()
        }
    })

    return (
        <div>
            <h3>Edit pack name</h3>
            <form onSubmit={formik.handleSubmit}>
                <SuperInputText
                    placeholder="pack name here"
                    type={'text'}
                    {...formik.getFieldProps('newPackName')}
                />
                <div className={styles.errorConfirmPass}>
                    {formik.touched.newPackName && formik.errors.newPackName &&
                        <div className={styles.errorFormik}>{formik.errors.newPackName}</div>}
                </div>
                <div>
                    <SuperButton onClick={props.handleClose} type={'reset'}>Cansel</SuperButton>
                    <SuperButton type={'submit'}>Save</SuperButton>
                </div>
            </form>
        </div>
    );
};
