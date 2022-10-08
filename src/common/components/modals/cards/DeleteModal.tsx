import SuperButton from '../../superButton/SuperButton';
import {useAppDispatch} from '../../../hooks/hooks';
import React from 'react';
import {deleteCardsTC} from '../../../../features/cards/cards-reducer';

type DeleteModalType = {
    handleClose: () => void
    cardID: string
}

export const DeleteModal = (props: DeleteModalType) => {
    const dispatch = useAppDispatch()

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }

    return (
        <div>
            <h2>Delete card</h2>
            <div>
                Do you really want to remove ?
                All cards will be deleted.
            </div>
            <div>
                <SuperButton onClick={props.handleClose} type="button">Отмена</SuperButton> <SuperButton
                onClick={onDeleteClickHandler}>Delete</SuperButton>
            </div>
        </div>
    )
}