import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/auth/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';
import {SvgSelector} from '../../svgSelector/svgSelector';
import {updateCardsTC} from "../../../../features/cards/cards-reducer";

type EditModalType = {
    answer: string
    question: string
    cardID: string
}

export const EditModal = ({cardID, answer, question}: EditModalType) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)

    const formik = useFormik({
        initialValues: {
            _id: cardID,
            answer: answer,
            question: question,
        },
        onSubmit: values => {
            dispatch(updateCardsTC(values))
            handleClose()
        },
    })

    return (
        <BasicModal  open={open} handleClose={handleClose} svgName={SvgSelector({svgName: 'pencil'})}>
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
                    <SuperButton onClick={handleClose} type='button'>cancel</SuperButton> <SuperButton type="submit">Apply</SuperButton>

                </div>
            </form>
        </BasicModal>
    )
}