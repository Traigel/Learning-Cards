import React from 'react';
import SuperButton from "../../superButton/SuperButton";
import {useAppDispatch} from "../../../hooks/hooks";
import {deletePackTC, deleteSecondPackTC} from "../../../../features/packs/packs-reducer";
import styles from "../Modal.module.css";
import {SvgSelector} from "../../svgSelector/svgSelector";

type deletePackModalType = {
    handleDelete: () => void
    handleClose: () => void
    packId: string
    packName: string
}

export const DeleteCardsPackModal = (props: deletePackModalType) => {

    const dispatch = useAppDispatch()

    const deletePackHandler = async () => {
        await dispatch(deleteSecondPackTC(props.packId))
        props.handleDelete()
    }

    const closeDeletePackModalHandler = () => {
        props.handleClose()
    }

    return (
        <div>
            <div className={styles.titleBox}>
                <h2 className={styles.title}>Delete pack</h2>
                <div onClick={props.handleClose}>
                    <SvgSelector svgName='cross'/>
                </div>
            </div>
            <div className={styles.form}>
                <div className={styles.textBox}>
                    <p>Do you really want to remove <span>{props.packName}</span>?</p>
                    <p>All cards will be deleted.</p>
                </div>
                <div className={styles.buttons}>
                    <SuperButton className={styles.oneButton} onClick={closeDeletePackModalHandler}>Cancel</SuperButton>
                    <SuperButton className={styles.redButton} onClick={deletePackHandler}>Delete</SuperButton>
                </div>
            </div>
        </div>
    );
};

