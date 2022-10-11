import React, {useState} from 'react';
import {useAppSelector} from '../../../common/hooks/hooks';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import styles from './Card.module.css';
import {StarRating} from "../../../common/components/starRating/StarRating";
import {CardsType} from "../../../api/api";
import {SvgSelector} from "../../../common/components/svgSelector/svgSelector";
import {EditModal} from "../../../common/components/modals/cards/EditModal";
import {DeleteModal} from '../../../common/components/modals/cards/DeleteModal';
import {BasicModal} from "../../../common/components/modals/basicModal/BasicModal";

export type CardPropsType = {
    card: CardsType
}

export const Card = ({card}: CardPropsType) => {

    const userID = useAppSelector((state) => state.auth.profile?._id)

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleDeleteModalClose = () => setOpenDeleteModal(false);
    const handleEditModalClose = () => setOpenEditModal(false);

    const onEditClickHandler = () => {
        setOpenEditModal(true)
    }

    const onDeleteClickHandler = () => {
        setOpenDeleteModal(true)
    }

    const isPackAuthor = card.user_id === userID
    const finalQuestionColumn = isPackAuthor ? styles.questionColumn : styles.questionColumnSecond
    const finalAnswerColumn = isPackAuthor ? styles.answerColumn : styles.answerColumnSecond
    const finalGradeColumn = isPackAuthor ? styles.gradeColumn : styles.gradeColumnSecond

    return (
        <>
            <BasicModal open={openEditModal} handleClose={handleEditModalClose}>
                <EditModal handleClose={handleEditModalClose} cardID={card._id} answer={card.answer}
                           question={card.question}/>
            </BasicModal>

            <BasicModal open={openDeleteModal} handleClose={handleDeleteModalClose}>
                <DeleteModal cardName={card.question} handleClose={handleDeleteModalClose} cardID={card._id}/>
            </BasicModal>

            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell className={finalQuestionColumn} component="th" scope="row">
                    {card.question}
                </TableCell>
                <TableCell className={finalAnswerColumn}>
                    {card.answer}
                </TableCell>
                <TableCell className={styles.dateColumn}>
                    {card.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}
                </TableCell>
                <TableCell className={finalGradeColumn}>
                    <div className={styles.gradeBox}>
                        <StarRating ratingValue={card.grade}/>
                        {isPackAuthor &&
                            <div className={styles.icons}>
                                <div className={styles.icon} onClick={onEditClickHandler}>
                                    <SvgSelector svgName='pencil'/>
                                </div>
                                <div className={styles.icon} onClick={onDeleteClickHandler}>
                                    <SvgSelector svgName='delete'/>
                                </div>
                            </div>
                        }
                    </div>
                </TableCell>
            </TableRow>
        </>
    )
}

