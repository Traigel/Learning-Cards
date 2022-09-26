import React from 'react';
import {useAppDispatch} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import {NavLink} from 'react-router-dom';
import TableRow from '@mui/material/TableRow';

export type CardType = {
    question: string
    answer: string
    grade: number
    updated: string
}


export const Card = (props: CardType) => {
    const dispatch = useAppDispatch()
    // const userId = useAppSelector((state)=>state.auth.profile?._id)

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
                {/*{isPackAuthor &&*/}
                {/*    <SuperButton onClick={onEditClickHandler} className={styles.iconBtn}><img src={editIcon} alt="edit"/></SuperButton>}*/}
                {/*{isPackAuthor &&*/}
                {/*    <SuperButton onClick={onDeleteClickHandler} className={styles.iconBtn}><img src={deleteIcon} alt="delete"/></SuperButton>}*/}
            </TableCell>
        </TableRow>
    );
};

