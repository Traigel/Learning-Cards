import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {deleteCardsTC} from '../cards-reducer';
import styles from './Card.module.css';
import {StarRating} from "../../../common/components/starRating/StarRating";
import {CardsType} from "../../../api/api";

export type CardPropsType = {
    card: CardsType
}

export const Card = ({card}: CardPropsType) => {

    const dispatch = useAppDispatch()

    const userID = useAppSelector((state) => state.auth.profile?._id)
    const isPackAuthor = card.user_id === userID

    const onDeleteClickHandler = () => {
        dispatch(deleteCardsTC(card._id))
    }

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell component="th" scope="row">
                {card.question}
            </TableCell>
            <TableCell className={styles.answerColumn}>
                {card.answer}
            </TableCell>
            <TableCell className={styles.dateColumn}>
                {card.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}
            </TableCell>
            <TableCell className={styles.dateColumn}>
                <StarRating ratingValue={card.grade}/>
                <div className={styles.modals}>
                </div>
            </TableCell>
        </TableRow>
    )
}

