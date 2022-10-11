import React, {ReactElement, ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SuperButton from '../../superButton/SuperButton';
import styles from '../Modal.module.css'

type PropsType = {
    children: ReactNode
    svgName?: ReactElement
    title?: string
    open: boolean
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    bgcolor: 'background.paper',
    border: 'cancel',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}

export const BasicModal = ({children, svgName, title, open, handleClose}: PropsType) => {
    return (
        <>
            <div className={styles.btt}>
                <SuperButton onClick={handleClose}>{title ? title : svgName}</SuperButton>
            </div>

            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </>
    )
}

