import {BasicModal} from './BaseModal';
import SuperButton from '../../superButton/SuperButton';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {SvgSelector} from '../../svgSelector/svgSelector';
import React, {useState} from 'react';
import {deleteCardsTC} from '../../../../features/cards/cards-reducer';

type DeleteModalType = {
    cardID: string
}

export const DeleteModal = (props: DeleteModalType) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(!open)

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }

    return (
        <BasicModal open={open} handleClose={handleClose} svgName={SvgSelector({svgName: 'delete'})}>
            <h2>Delete card</h2>
            <div>
                Do you really want to remove ?
                All cards will be deleted.
            </div>
            <div>
                <SuperButton onClick={handleClose} type="button">Отмена</SuperButton> <SuperButton
                onClick={onDeleteClickHandler}>Delete</SuperButton>
            </div>
        </BasicModal>
    )
}