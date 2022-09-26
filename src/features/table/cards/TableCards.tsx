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
import {createCardsTC, setCardsTC} from './cards-reducer';
import {useParams} from 'react-router-dom';
import {createCardsType} from '../../../api/api';
import { Card } from './Card';

export const TableCards = () => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.cards)
    console.log(cards)

    const params = useParams()
    const packID = params.packID

    useEffect(() => {
        if (packID) {
            dispatch(setCardsTC(packID))
        }
    }, [])

    const addNewCardHandler = () => {
        const newCard = {
            cardsPack_id: packID,
            answer: 'asd'
        }
        dispatch(createCardsTC(newCard))
        // dispatch(setCardsTC('6331704b3c22f21db471fa5a'))

    }

    return (
        <>
            < div className={styles.button}>
                <SuperButton onClick={addNewCardHandler}>Add new card</SuperButton>
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

                        {cards && cards.map((row) => (
                            <Card
                                key={row._id}
                                question={row.question}
                                answer={row.answer}
                                grade={row.grade}
                                updated={row.updated}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
