import SuperInputText from '../../superInputText/SuperInputText';
import {useAppDispatch} from '../../../hooks/hooks';
import React from 'react';
import {useFormik} from 'formik';
import styles from '../Modal.module.css'
import SuperButton from '../../superButton/SuperButton';
import {updateCardsTC} from "../../../../features/cards/cards-reducer";
import {SvgSelector} from "../../svgSelector/svgSelector";

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
                errors.question = 'Please enter question'
            }
            if (values.question && values.question.length > 40) {
                errors.question = 'Your card question is too long'
            }
            if (!values.answer) {
                errors.answer = 'Please enter answer'
            }
            if (values.answer && values.answer.length > 40) {
                errors.answer = 'Your card answer is too long'
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
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Edit card</h2>
                <div onClick={handleClose}>
                    <SvgSelector svgName='cross'/>
                </div>
            </div>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'Question'}
                        {...formik.getFieldProps('question')}
                    />
                    <div className={styles.error}>
                        {formik.touched.question && formik.errors.question && formik.errors.question}
                    </div>
                </div>
                <div className={styles.inputForm}>
                    <SuperInputText
                        placeholder={'Answer'}
                        {...formik.getFieldProps('answer')}
                    />
                    <div className={styles.error}>
                        {formik.touched.answer && formik.errors.answer && formik.errors.answer}
                    </div>
                </div>
                <div className={styles.buttons}>
                    <SuperButton className={styles.oneButton} onClick={handleClose} type='button'>Cancel</SuperButton>
                    <SuperButton className={styles.twoButton}>Save</SuperButton>
                </div>
            </form>
        </div>
    )
}