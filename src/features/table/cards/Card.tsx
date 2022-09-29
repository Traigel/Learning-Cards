import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {deleteCardsTC, updateCardsTC} from './cards-reducer';
import styles from './Card.module.css'
// import edit from './.././../../assets/image/edit.png'
// import clear from './.././../../assets/image/clear.png'
import {BasicRating} from '../../../common/components/starsRating/StartRating';

export type CardType = {
    question: string
    answer: string
    grade: number
    updated: string
    userID: string
    cardID: string
}

export const Card = (props: CardType) => {

    const dispatch = useAppDispatch()

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

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell align="left">{props.question}</TableCell>
            <TableCell align="left">{props.answer}</TableCell>
            <TableCell align="left">{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="left"><BasicRating values={props.grade}/></TableCell>
            <TableCell align="right">
                {isPackAuthor &&
                    <img className={styles.iconBtn} onClick={onEditClickHandler} src={''} alt="edit"/>}
                {isPackAuthor &&
                    <img onClick={onDeleteClickHandler} className={styles.iconBtn} src={''} alt="delete"/>}
            </TableCell>
        </TableRow>
    );
};

