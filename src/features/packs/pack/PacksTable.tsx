import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import SuperButton from "../../../common/components/superButton/SuperButton";
import learnIcon from "../../../assets/images/teacher.png"
import editIcon from "../../../assets/images/Edit.png"
import deleteIcon from "../../../assets/images/Delete.png"
import styles from "./PacksTable.module.css"
import {changePackTC, deletePackTC} from "../packs-reducer";
import {useAppDispatch} from "../../../common/hooks/hooks";

type PacksTablePropsType = {
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

export const PacksTable = (props: PacksTablePropsType) => {

    const dispatch = useAppDispatch()

    const onLearnClickHandler = () => {
        alert('i wanna learn it !!!')
    }

    const onEditClickHandler = () => {
        const updatePackData = {_id: props.packId, name: 'changed Pack-Name'}
        dispatch(changePackTC(updatePackData))
    }

    const onDeleteClickHandler = () => {
        dispatch(deletePackTC(props.packId))
    }

    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">{props.name}</TableCell>
            <TableCell align="right">{props.cardsCount}</TableCell>
            <TableCell align="right">{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="right">{props.user_name}</TableCell>
            <TableCell align="right">
                <SuperButton onClick={onLearnClickHandler} className={styles.iconBtn}><img src={learnIcon} alt="learn"/></SuperButton>
                <SuperButton onClick={onEditClickHandler} className={styles.iconBtn}><img src={editIcon} alt="edit"/></SuperButton>
                <SuperButton onClick={onDeleteClickHandler} className={styles.iconBtn}><img src={deleteIcon} alt="delete"/></SuperButton>
            </TableCell>
        </TableRow>
    );
};

