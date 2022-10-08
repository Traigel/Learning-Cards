import React, {useState} from 'react';
import styles from "./Pack.module.css"
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {NavLink} from "react-router-dom";

import {useAppSelector} from "../../../common/hooks/hooks";

import {BasicModal} from "../../../common/components/modals/basicModal/BasicModal";
import {DeletePackModal} from "../../../common/components/modals/packs/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/packs/EditPackModal";
import {PackType} from "../../../api/api";

type PacksTablePropsType = {
    cardPack: PackType
}

export const Pack = ({cardPack}: PacksTablePropsType) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleDeleteModalClose = () => setOpenDeleteModal(false);
    const handleEditModalClose = () => setOpenEditModal(false);

    const userId = useAppSelector((state) => state.auth.profile?._id)

    const onLearnClickHandler = () => {
        alert('Заглушка')
    }

    const onEditClickHandler = () => {
        setOpenEditModal(true)
    }

    const onDeleteClickHandler = () => {
        setOpenDeleteModal(true)
    }

    const isPackAuthor = cardPack.user_id === userId

    return (

        <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>

            <BasicModal open={openDeleteModal} handleClose={handleDeleteModalClose}>
                <DeletePackModal packName={cardPack.name} packId={cardPack._id} handleClose={handleDeleteModalClose}/>
            </BasicModal>

            <BasicModal open={openEditModal} handleClose={handleEditModalClose}>
                <EditPackModal packName={cardPack.name} packId={cardPack._id} handleClose={handleEditModalClose}/>
            </BasicModal>

            <TableCell component="th" scope="row">
                <NavLink
                    to={`/packs/cards?cardsPack_id=${cardPack._id}&page=1&pageCount=5`}
                    className={styles.maneColumn}
                >{cardPack.name}</NavLink>
            </TableCell>
            <TableCell className={styles.cardsColumn}>{cardPack.cardsCount}</TableCell>
            <TableCell
                className={styles.dateColumn}>{cardPack.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
            <TableCell className={styles.userNameColumn}>{cardPack.user_name}</TableCell>
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

