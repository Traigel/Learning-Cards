import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {createCardsTC} from '../../../../features/table/cards/cards-reducer';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/hooks';
import React, { useState } from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';


export const AddModal = () => {
    const dispatch = useAppDispatch()

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
        },
    })

        return (
        <BasicModal title={'Add card'}>
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
                    <SuperButton>cancel</SuperButton> <SuperButton type="submit">Apply</SuperButton>
                </div>

            </form>
        </BasicModal>
    )
}