import SuperButton from '../../superButton/SuperButton';
import {useAppDispatch} from '../../../hooks/hooks';
import React from 'react';
import {deleteCardsTC} from '../../../../features/cards/cards-reducer';
import styles from '../Modal.module.css'
import {SvgSelector} from "../../svgSelector/svgSelector";

type DeleteModalType = {
    handleClose: () => void
    cardID: string
    cardName: string
}

export const DeleteModal = (props: DeleteModalType) => {
    const dispatch = useAppDispatch()

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }

    return (
        <div>
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Delete card</h2>
                <div onClick={props.handleClose}>
                    <SvgSelector svgName='cross'/>
                </div>
            </div>
            <div className={styles.form}>
                <div className={styles.textBox}>
                    <p>Do you really want to remove <span>{props.cardName}</span>?</p>
                    <p>All cards will be deleted.</p>
                </div>
                <div className={styles.buttons}>
                    <SuperButton className={styles.oneButton} onClick={props.handleClose}>Cancel</SuperButton>
                    <SuperButton className={styles.redButton} onClick={onDeleteClickHandler}>Delete</SuperButton>
                </div>
            </div>
        </div>
    )
}