import {BasicModal} from './BaseModal';
import SuperButton from '../../superButton/SuperButton';
import {useAppDispatch} from '../../../hooks/hooks';
import {SvgSelector} from '../../svgSelector/svgSelector';
import React from 'react';
import {deleteCardsTC} from "../../../../features/cards/cards-reducer";

type DeleteModalType = {
    cardID: string
}

export const DeleteModal = (props: DeleteModalType) => {

    const dispatch = useAppDispatch()

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }

    return (
        <BasicModal svgName={SvgSelector({svgName: 'delete'})}>
            <h2>Delete card</h2>
            <div>
                Do you really want to remove Card Name?
                All cards will be deleted.
            </div>
            <div>
                <SuperButton type='button'>Отмена</SuperButton> <SuperButton
                onClick={onDeleteClickHandler}>Delete</SuperButton>
            </div>
        </BasicModal>
    )
}