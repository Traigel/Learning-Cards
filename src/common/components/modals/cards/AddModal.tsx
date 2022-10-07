import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/auth/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';
import {createCardsTC} from '../../../../features/cards/cards-reducer';

export const AddModal = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)
    const params = useParams()
    const packID = params.packID

    const formik = useFormik({
        initialValues: {
            cardsPack_id: packID,
            answer: '',
            question: '',
        },
        onSubmit: values => {
            dispatch(createCardsTC(values))
            formik.resetForm()
            handleClose()
        },
    })

    return (
        <BasicModal open={open} handleClose={handleClose} title="Add card">
            <h2>Add card</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'question'}
                        {...formik.getFieldProps('question')}
                    />
                </div>

                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'answer'}
                        {...formik.getFieldProps('answer')}
                    />
                </div>
                <div>
                    <SuperButton onClick={handleClose} type="button">cancel</SuperButton>
                    <SuperButton type="submit">Apply</SuperButton>
                </div>
            </form>
        </BasicModal>

    )
}