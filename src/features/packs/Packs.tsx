import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './Packs.module.css'
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks";
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperInputText from "../../common/components/superInputText/SuperInputText";
import {setCardsTC} from './packs-reducer';

export const Packs = () => {

    const packsInfo = useAppSelector((state)=>state.packs.packs)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCardsTC())
    }, [])

    return (
        <>
            <div className={styles.button}>
                <SuperButton>Button</SuperButton>
            </div>
            <label>Search</label>
            <div className={styles.input}>
                <SuperInputText placeholder={'Provide your text'}/>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', width: 50}}>Name</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 50}} align="right">Cards</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Last Updated</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Created By</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {packsInfo && packsInfo.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.cardsCount}</TableCell>
                                <TableCell align="right">{row.updated.replace(/^(\d+)\-(\d+)\-(\d+)\D.+$/, '$3.$2.$1')}</TableCell>
                                <TableCell align="right">{row.user_name}</TableCell>
                                <TableCell align="right">svg svg svg</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}