import {BasicModal} from './BaseModal';
import SuperInputText from '../../superInputText/SuperInputText';
import {updateCardsTC} from '../../../../features/table/cards/cards-reducer';
import {useAppDispatch} from '../../../hooks/hooks';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import styles from '../../../../features/login/Login.module.css';
import SuperButton from '../../superButton/SuperButton';
// import styles from './Modal.module.css';

type EditModalType = {
    answer: string
    question: string
    cardID: string
}

export const EditModal = ({cardID, answer, question}: EditModalType) => {
    const dispatch = useAppDispatch()
    // const [open, setOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            _id: cardID,
            answer: answer,
            question: question,
        },
        onSubmit: values => {
            dispatch(updateCardsTC(values))
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
                <div >
                    <SuperButton >cancel</SuperButton> <SuperButton type="submit">Apply</SuperButton>

                </div>
            </form>
        </BasicModal>
    )
}
// {/*type={'button'} onClick={()=>setOpen(false)}*/}