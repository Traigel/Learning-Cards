import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {deleteCardsTC, updateCardsTC} from './cards-reducer';
import styles from './Card.module.css'
import SuperButton from '../../../common/components/superButton/SuperButton';
import { updateCardsType } from '../../../api/api';

export type CardType = {
    question: string
    answer: string
    grade: number
    updated: string
    userID: string
    cardID: string
}


export const Card = (props: CardType) => {


    const userID = useAppSelector((state)=>state.auth.profile?._id)
    const isPackAuthor = props.userID === userID


    const onEditClickHandler = () => {
        const card = {
            _id: props.cardID,
            question: 'update q',
            comments: 'updetnul exy',
        }
           dispatch(updateCardsTC(card))
    }

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(props.cardID))
    }


    const dispatch = useAppDispatch()


    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell align="right">{props.question}</TableCell>
            <TableCell align="right">{props.answer}</TableCell>
            <TableCell align="right">{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="right">{props.grade}</TableCell>
            <TableCell align="right">
                {/*<SuperButton onClick={onLearnClickHandler} className={styles.iconBtn}><img src={learnIcon} alt="learn"/></SuperButton>*/}
                {isPackAuthor &&
                    <SuperButton onClick={onEditClickHandler} className={styles.iconBtn}><img src={''} alt="edit"/></SuperButton>}
                {isPackAuthor &&
                    <SuperButton onClick={onDeleteClickHandler} className={styles.iconBtn}><img src={''} alt="delete"/></SuperButton>}
            </TableCell>
        </TableRow>
    );
};

