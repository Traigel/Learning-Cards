import React from 'react';
import SuperButton from "../../superButton/SuperButton";
import {useAppDispatch} from "../../../hooks/hooks";
import {deletePackTC, deleteSecondPackTC} from "../../../../features/packs/packs-reducer";

type deletePackModalType = {
    handleClose: () => void
    packId: string
    packName: string
}

export const DeleteCardsPackModal = (props: deletePackModalType) => {

    const dispatch = useAppDispatch()

    const deletePackHandler = () => {
        dispatch(deleteSecondPackTC(props.packId))
        props.handleClose()
    }

    const closeDeletePackModalHandler = () => {
        props.handleClose()
    }

    return (
        <div>
            <h3>Delete pack</h3>
            <p>
                Do you really want to remove <b>{props.packName}</b>?
                All cards will be deleted
            </p>
            <div>
                <SuperButton onClick={closeDeletePackModalHandler}>cansel</SuperButton>
                <SuperButton onClick={deletePackHandler}>delete</SuperButton>
            </div>
        </div>
    );
};

