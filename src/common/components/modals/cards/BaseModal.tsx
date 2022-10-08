import React, {ReactElement, ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SuperButton from '../../superButton/SuperButton';
import styles from './Modal.module.css'

type PropsType = {
    children: ReactNode
    svgName?: ReactElement
    title?: string
    open: boolean
    handleClose: () => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export const BasicModal = ({children, svgName, title, open, handleClose}: PropsType) => {
    return (
        <>
            <div>
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

