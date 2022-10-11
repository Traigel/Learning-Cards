import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../Modal.module.css'
import SuperButton from '../../superButton/SuperButton';
import {createCardsTC} from '../../../../features/cards/cards-reducer';
import {SvgSelector} from "../../svgSelector/svgSelector";


type EditModalType = {
    id?: string
    answer?: string
    question?: string
}


export const AddModal = (props: EditModalType) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)
    const params = useParams()

    const formik = useFormik({
        initialValues: {
            cardsPack_id: props.id + '',
            answer: '',
            question: '',
        },
        onSubmit: values => {
            dispatch(createCardsTC(values))
            formik.resetForm()
            handleClose()
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
    })

    return (
        <BasicModal open={open} handleClose={handleClose} title="Add new card">
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Add new card</h2>
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
                    <SuperButton className={styles.oneButton} onClick={handleClose}>Cancel</SuperButton>
                    <SuperButton className={styles.twoButton}>Save</SuperButton>
                </div>
            </form>
        </BasicModal>
    )
}