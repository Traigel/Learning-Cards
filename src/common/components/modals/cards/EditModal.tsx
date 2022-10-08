import SuperInputText from '../../superInputText/SuperInputText';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/auth/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';
import {updateCardsTC} from "../../../../features/cards/cards-reducer";

type EditModalType = {
    handleClose?: () => void
    answer?: string
    question?: string
    cardID?: string
}

export const EditModal = ({handleClose, cardID, answer, question}: EditModalType) => {
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            _id: cardID,
            answer: answer,
            question: question,
        },
        validate: (values) => {
            const errors: EditModalType = {}
            if (!values.question) {
                errors.question = 'please enter question'
            }
            if (values.question && values.question.length > 40) {
                errors.question = 'your card question is too long'
            }
            if (!values.answer) {
                errors.answer = 'please enter answer'
            }
            if (values.answer && values.answer.length > 40) {
                errors.answer = 'your card answer is too long'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(updateCardsTC(values))
            handleClose && handleClose()
        },
    })

    return (
        <div>
            <h2>Edit card</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'question'}
                        {...formik.getFieldProps('question')}
                    />
                    <div className={styles.error}>
                        {formik.touched.question && formik.errors.question && formik.errors.question}
                    </div>
                </div>

                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    <div className={styles.error}>
                        {formik.touched.answer && formik.errors.answer && formik.errors.answer}
                    </div>
                </div>
                <div>
                    <SuperButton onClick={handleClose} type='button'>cancel</SuperButton> <SuperButton
                    type="submit">Apply</SuperButton>
                </div>
            </form>
        </div>
    )
}