import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {createCardsTC, updateCardsTC} from '../../../../features/table/cards/cards-reducer';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';

type EditModalType = {
    answer: string
    question: string
    cardID: string
}


export const EditModal = ({cardID, answer, question}: EditModalType) => {
    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            _id: cardID,
            answer: answer,
            question: question,
        },
        onSubmit: values => {
            dispatch(updateCardsTC(values))
            formik.resetForm()
        },
    })

    return (
        <BasicModal title={'Edit card'}>
            <h2>Edit card</h2>
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