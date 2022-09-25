import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SuperButton from '../../../common/components/superButton/SuperButton';
import styles from './TableCards.module.css'
import SuperInputText from '../../../common/components/superInputText/SuperInputText';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {useEffect} from 'react';
import {setCardsTC} from './cards-reducer';

function createData(
    question: string,
    answer: string,
    lastUpdated: number,
    grade: number,
) {
    return {question, answer, lastUpdated, grade};
}

const dispatch = useAppDispatch()
const packID = useAppSelector(state => state.cards.cardsPack.pa)


useEffect(()=> {
    dispatch(setCardsTC(packID))
}, [])
const rows = [
    createData('Frozen yoghurt', '159', 6.0, 5),
];

export const TableCards = () => {
    return (
        <>
            < div className={styles.button}>
                <SuperButton>Learn to pack</SuperButton>
            </div>

            <label>Search</label>
            <div className={styles.input}>
                <SuperInputText placeholder={'Provide your text'}/>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold', width: 50}}>Question</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 50}} align="right">Answer</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Last Updated</TableCell>
                            <TableCell style={{fontWeight: 'bold', width: 100}} align="right">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.lastUpdated}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="right">{row.answer}</TableCell>
                                <TableCell align="right">{row.lastUpdated}</TableCell>
                                <TableCell align="right">{row.grade}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
