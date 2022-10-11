import React from 'react';
import {ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
};

type BasicModalType = {
    children: ReactNode
    open: boolean
    handleClose: () => void
}

export const BasicModal = ({children, open, handleClose}: BasicModalType) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
    )
}

