import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/auth/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';
import {createCardsTC} from '../../../../features/cards/cards-reducer';


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
    const packID = params.packID

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
    })

    return (
        <BasicModal open={open} handleClose={handleClose} title="Add new card">
            <h2>Add card</h2>
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
                    <SuperButton onClick={handleClose} type="button">cancel</SuperButton>
                    <SuperButton type="submit">Apply</SuperButton>
                </div>
            </form>
        </BasicModal>
    )
}