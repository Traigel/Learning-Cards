import React from 'react';
import styles from "./Pack.module.css"

import SuperButton from "../../../common/components/superButton/SuperButton";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import {NavLink} from "react-router-dom";

import {useAppSelector} from "../../../common/hooks/hooks";

import {BasicModal} from "../../../common/components/basicModal/BasicModal";
import {DeletePackModal} from "../packsModals/DeletePackModal";
import {EditPackModal} from "../packsModals/EditPackModal";

type PacksTablePropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    user_name: string
}

export const Pack = (props: PacksTablePropsType) => {

    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);

    const handleDeleteModalClose = () => setOpenDeleteModal(false);
    const handleEditModalClose = () => setOpenEditModal(false);

    const userId = useAppSelector((state) => state.auth.profile?._id)

    const isPackAuthor = props.userId === userId

    const onLearnClickHandler = () => {
        // open LEARN component
    }

    const onEditClickHandler = () => {
        setOpenEditModal(true)
    }

    const onDeleteClickHandler = () => {
        setOpenDeleteModal(true)
    }

    return (
        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>

            <BasicModal open={openDeleteModal} handleClose={handleDeleteModalClose}>
                <DeletePackModal packName={props.name} packId={props.packId} handleClose={handleDeleteModalClose}/>
            </BasicModal>

            <BasicModal open={openEditModal} handleClose={handleEditModalClose}>
                <EditPackModal packName={props.name} packId={props.packId} handleClose={handleEditModalClose}/>
            </BasicModal>

            <TableCell component="th" scope="row">
                <NavLink to={`/cards/${props.packId}`}>{props.name}</NavLink>
            </TableCell>

            <TableCell align="right">{props.cardsCount}</TableCell>
            <TableCell align="right">{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell align="right">{props.user_name}</TableCell>

            <TableCell align="right">
                <SuperButton onClick={onLearnClickHandler} className={styles.iconBtn}>
                    <SvgSelector svgName='cap'/>
                </SuperButton>
                {isPackAuthor &&
                    <SuperButton onClick={onEditClickHandler} className={styles.iconBtn}>
                        <SvgSelector svgName='pencil'/>
                    </SuperButton>}
                {isPackAuthor &&
                    <SuperButton onClick={onDeleteClickHandler} className={styles.iconBtn}>
                        <SvgSelector svgName='delete'/>
                    </SuperButton>}
            </TableCell>
        </TableRow>
    )
}

