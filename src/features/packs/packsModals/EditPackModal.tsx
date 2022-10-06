import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {changePackTC} from "../packs-reducer";
import styles from "../../registration/Registration.module.css";
import SuperButton from "../../../common/components/superButton/SuperButton";
import TextField from "@mui/material/TextField";

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

    const [newPackName, setNewPackName] = useState(props.packName)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewPackName(e.currentTarget.value)
    }

    const formik = useFormik({
        initialValues: {
            newPackName: props.packName
        },
        validate: (values) => {
            const errors: FormikErrorsType = {}
            if (values.newPackName.length > 40) {
                errors.newPackName = 'your pack name is too long'
            }
            if (values.newPackName === newPackName) {
                errors.newPackName = 'your new pack name is the same'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(changePackTC({_id: props.packId, name: newPackName}))
            formik.resetForm()
            props.handleClose()
        }
    })

    return (
        <div>
            <h3>Edit pack name</h3>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="packName"
                    name="packName"
                    label="new pack Name"
                    value={newPackName}
                    onChange={(e) => onChangeHandler(e)}
                    // error={formik.touched.newPackName && Boolean(formik.errors.newPackName)}
                    // helperText={formik.touched.newPackName && formik.errors.newPackName}
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
