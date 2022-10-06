import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {deleteCardsTC} from './cards-reducer';
import {BasicRating} from '../../../common/components/starsRating/StartRating';
import {EditModal} from '../../../common/components/modals/cards/EditModal';
import {DeleteModal} from '../../../common/components/modals/cards/DeleteModal';
import styles from './Card.module.css'


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

    const userID = useAppSelector((state) => state.auth.profile?._id)
    const isPackAuthor = props.userID === userID

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
                <div className={styles.btn}>
                {isPackAuthor && <EditModal cardID={props.cardID} answer={props.answer} question={props.question}/>
                }
                {isPackAuthor && <DeleteModal cardID={props.cardID}/>}
                </div>
            </TableCell>
        </TableRow>
    )
}

