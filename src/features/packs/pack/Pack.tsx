import React from 'react';
import styles from "./Pack.module.css"
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
                <NavLink
                    to={`/cards/${props.packId}`}
                    className={styles.maneColumn}
                >{props.name}</NavLink>
            </TableCell>
            <TableCell className={styles.cardsColumn}>{props.cardsCount}</TableCell>
            <TableCell
                className={styles.dateColumn}>{props.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell className={styles.userNameColumn}>{props.user_name}</TableCell>
            <TableCell className={styles.iconsColumn}>
                <div className={styles.icons}>
                    <div className={styles.icon} onClick={onLearnClickHandler}>
                        <SvgSelector svgName='cap'/>
                    </div>
                    {isPackAuthor &&
                        <div className={styles.icon} onClick={onEditClickHandler}>
                            <SvgSelector svgName='pencil'/>
                        </div>
                    }
                    {isPackAuthor &&
                        <div className={styles.icon} onClick={onDeleteClickHandler}>
                            <SvgSelector svgName='delete'/>
                        </div>
                    }
                </div>
            </TableCell>
        </TableRow>
    )
}

